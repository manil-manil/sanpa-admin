import * as React from "react";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import { GridItem, GridContainer } from "components/Grid";
import DataGridTable from "components/Table/DataGridTable.js";
import { Card, CardBody } from "components/Card";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material/";
import DialogModal from "components/Dialog/DialogModal.js";
import CategoryEdit from "components/Category/CategoryEdit";
import { useFetchWrapper } from "../../helpers";
import { BASIC_CONSTANT } from "../../variables/basic.constants";

function Category() {
    const fetchWrapper = useFetchWrapper();
    const [rows, setRows] = React.useState([]);
    const [isCreate, setIsCreate] = React.useState([]);

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetchWrapper
            .get(`${BASIC_CONSTANT.BACKEND_URL}/api/categories`)
            .then((response) => {
                setRows(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const deleteCategory = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                if (confirm("삭제하시겠습니까?")) {
                    fetchWrapper
                        .delete(
                            `${BASIC_CONSTANT.BACKEND_URL}/api/categories/admin/${id}`
                        )
                        .then((response) => {
                            fetchCategories();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                //setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        []
    );

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                fetchWrapper
                    .get(`${BASIC_CONSTANT.BACKEND_URL}/api/categories/${id}`)
                    .then((response) => {
                        setInputs(response);
                        setIsCreate(false);
                        setOpen(true);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        },
        []
    );

    const handleCreateOpen = () => {
        setDefaultInputs();
        setIsCreate(true);
        setOpen(true);
    };
    const handleClose = () => {
        //회원수정 모달 닫기
        setOpen(false);
    };
    const handleSave = () => {
        fetchWrapper
            .put(
                `${BASIC_CONSTANT.BACKEND_URL}/api/categories/admin/${inputs.id}`,
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

    const handleCreate = () => {
        fetchWrapper
            .post(`${BASIC_CONSTANT.BACKEND_URL}/api/categories/admin`, {
                name: inputs.name,
                isActive: inputs.isActive == "1",
                image: inputs.image,
                nodes: inputs.nodes,
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

    const [inputs, setInputs] = React.useState({
        name: "",
        isActive: "",
        image: null,
        nodes: [],
    });

    const setDefaultInputs = () => {
        setInputs({
            name: "",
            isActive: "",
            image: null,
            nodes: [],
        });
    };
    const handleEditChange = (e) => {
        //수정모달에서 변경

        if (e.hasOwnProperty("json")) {
            try {
                const json = JSON.parse(e.json);
                setInputs((prevState) => {
                    return { ...prevState, ["nodes"]: json };
                });
            } catch (e) {}
        } else {
            const { name, value } = e.target;
            setInputs((prevState) => {
                return { ...prevState, [name]: value };
            });
        }
    };
    const columns = React.useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
            },
            {
                field: "image",
                headerName: "이미지",
                width: 120,
                editable: false,
                sortable: false,
                renderCell: (params) => <img src={params.value} />,
            },
            {
                field: "name",
                headerName: "이름",
            },
            {
                field: "isActive",
                headerName: "활성화 여부",
            },
            {
                field: "isDelete",
                headerName: "삭제 여부",
            },
            {
                field: "actions",
                type: "actions",
                headerName: "관리",
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        onClick={handleClickOpen(params.id)}
                        label="Edit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        onClick={deleteCategory(params.id)}
                        label="Delete"
                    />,
                ],
                width: 100,
            },
        ],
        [deleteCategory]
    );

    console.log(rows);

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
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
                title={"카테고리 수정"}
            >
                <CategoryEdit inputs={inputs} onChange={handleEditChange} />
            </DialogModal>
        </GridContainer>
    );
}

Category.layout = Admin;

export default Category;
