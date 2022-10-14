import * as React from "react";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import { GridItem, GridContainer } from "components/Grid";
import DataGridTable from "components/Table/DataGridTable.js";
import { Card, CardBody, CardHeader } from "components/Card";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material/";
import DialogModal from "components/Dialog/DialogModal.js";
import QuestionEdit from "components/Question/QuestionEdit";
import { useFetchWrapper } from "../../helpers";
import { BASIC_CONSTANT } from "../../variables/basic.constants";
import { useRouter } from "next/router";
import Link from "next/link";

function Question() {
    const router = useRouter();
    const fetchWrapper = useFetchWrapper();
    const [rows, setRows] = React.useState([]);
    const [isCreate, setIsCreate] = React.useState([]);
    const [nodeInfo, setNodeInfo] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const nodeId = router.query.node;
    const [inputs, setInputs] = React.useState({
        nodeId: nodeId,
        isActive: true,
        title: "",
        imageUrl: [],
        choices: [{ imageUrl: null, text: "" }],
    });

    const setDefaultInputs = () => {
        setInputs({
            nodeId: nodeId,
            isActive: true,
            title: "",
            imageUrl: [],
            choices: [{ imageUrl: null, text: "" }],
        });
    };

    React.useEffect(() => {
        fetchCategories();
        fetchNodeInfo();
    }, []);

    const handleClose = () => {
        //회원수정 모달 닫기
        setOpen(false);
    };

    const fetchNodeInfo = () => {
        fetchWrapper
            .get(
                `${BASIC_CONSTANT.BACKEND_URL}/api/nodes/admin/detail/${nodeId}`
            )
            .then((response) => {
                setNodeInfo(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchCategories = () => {
        fetchWrapper
            .get(`${BASIC_CONSTANT.BACKEND_URL}/api/questions/node/${nodeId}`)
            .then((response) => {
                setRows(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClickOpen = (id) => {
        fetchWrapper
            .get(`${BASIC_CONSTANT.BACKEND_URL}/api/questions/node/${nodeId}`)
            .then((response) => {
                setInputs(response.find((row) => row.id == id));
                setIsCreate(false);
                setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const columns = React.useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
            },
            {
                field: "title",
                headerName: "이름",
            },
            {
                field: "answer",
                headerName: "정답",
            },
            {
                field: "actions",
                type: "actions",
                headerName: "관리",
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        onClick={() => handleClickOpen(params.id, rows)}
                        label="Edit"
                    />,
                ],
                width: 100,
            },
        ],
        []
    );

    const handleCreateOpen = () => {
        setDefaultInputs();
        setIsCreate(true);
        setOpen(true);
    };

    const handleCreate = () => {
        fetchWrapper
            .post(`${BASIC_CONSTANT.BACKEND_URL}/api/questions/admin`, {
                nodeId: inputs.name,
                imageUrl: inputs.imageUrl,
                isActive: inputs.isActive == "1",
                answerIndex: inputs.answerIndex,
                choices: inputs.choices,
            })
            .then((response) => {
                alert("추가되었습니다.");
                fetchCategories();
                handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSave = () => {
        fetchWrapper
            .put(
                `${BASIC_CONSTANT.BACKEND_URL}/api/questions/admin/${inputs.id}`,
                {
                    name: inputs.name,
                    isActive: inputs.isActive == "1",
                    image: inputs.image,
                    nodes: inputs.nodes,
                }
            )
            .then((response) => {
                alert("수정되었습니다.");
                fetchCategories();
                handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => {
            return { ...prevState, [name]: value };
        });
    };
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader>
                        <h2 className="mt-4">{nodeInfo?.name} 문제 목록</h2>
                    </CardHeader>
                    <CardBody>
                        <button
                            onClick={() => handleCreateOpen()}
                            className="btn btn-success"
                        >
                            추가하기
                        </button>
                        <DataGridTable
                            tableHead={columns}
                            tableData={rows}
                            getRowId={(row) => row.id}
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <DialogModal
                open={open}
                clickClose={handleClose}
                clickSave={isCreate ? handleCreate : handleSave}
                title={`문제 ${isCreate ? "추가" : "수정"}`}
            >
                <QuestionEdit inputs={inputs} onChange={handleEditChange} />
            </DialogModal>
        </GridContainer>
    );
}

Question.layout = Admin;

export default Question;
