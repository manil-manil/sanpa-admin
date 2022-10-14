import * as React from "react";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import { GridItem, GridContainer } from "components/Grid";
import DataGridTable from "components/Table/DataGridTable.js";
import { Card, CardBody } from "components/Card";
import { GridActionsCellItem } from "@mui/x-data-grid";
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    RawOff,
} from "@mui/icons-material/";
import DialogModal from "components/Dialog/DialogModal.js";
import UserEdit from "components/UserList/UserEdit.js";
import { useFetchWrapper } from "../../helpers";
import { BASIC_CONSTANT } from "../../variables/basic.constants";

function UserList() {
    const fetchWrapper = useFetchWrapper();
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = () => {
        fetchWrapper
            .get(`${BASIC_CONSTANT.BACKEND_URL}/api/user/admin`)
            .then((response) => {
                setRows(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const deleteUser = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                if (confirm("삭제하시겠습니까?")) {
                    fetchWrapper
                        .delete(
                            `${BASIC_CONSTANT.BACKEND_URL}/api/user/admin${id}`
                        )
                        .then((response) => {
                            fetchUserList();
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
                    .get(`${BASIC_CONSTANT.BACKEND_URL}/api/user/admin/${id}`)
                    .then((response) => {
                        setInputs(response);
                        setOpen(true);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        },
        []
    );
    const handleClose = () => {
        //회원수정 모달 닫기
        setOpen(false);
    };
    const handleSave = () => {
        //회원수정api호출
        fetchWrapper
            .put(
                `${BASIC_CONSTANT.BACKEND_URL}/api/user/admin/${inputs.userId}`,
                {
                    username: inputs.username,
                    profileImage: inputs.profileImageUrl,
                }
            )
            .then((response) => {
                alert("수정되었습니다.");
                fetchUserList();
                handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const [inputs, setInputs] = React.useState({
        username: "",
        profileImageUrl: "",
    });
    const handleEditChange = (e) => {
        //수정모달에서 변경
        const { name, value } = e.target;
        setInputs((prevState) => {
            return { ...prevState, [name]: value };
        });
    };
    const columns = React.useMemo(
        () => [
            {
                field: "profileImageUrl",
                headerName: "프로필 이미지",
                width: 120,
                editable: false,
                sortable: false,
                renderCell: (params) => <img src={params.value} />,
            },
            {
                field: "userId",
                headerName: "아이디",
                width: 120,
                editable: false,
            },
            {
                field: "username",
                headerName: "이름",
                width: 150,
                editable: false,
            },
            {
                field: "email",
                headerName: "이메일",
                width: 150,
                editable: false,
                sortable: false,
            },
            {
                field: "emailVerifiedYn",
                headerName: "검증된 이메일",
                width: 100,
                editable: false,
                sortable: false,
            },
            {
                field: "providerType",
                headerName: "제공 유형",
                width: 160,
                editable: false,
                sortable: false,
            },
            {
                field: "roleType",
                headerName: "역할 유형",
                width: 90,
                editable: false,
                sortable: false,
            },
            {
                field: "createdAt",
                headerName: "등록일시",
                editable: false,
                sortable: false,
                width: 200,
            },
            {
                field: "updatedAt",
                headerName: "수정일시",
                editable: false,
                sortable: false,
                width: 200,
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
                        onClick={deleteUser(params.id)}
                        label="Delete"
                    />,
                ],
                width: 100,
            },
        ],
        [deleteUser]
    );

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <DataGridTable
                            tableHead={columns}
                            tableData={rows}
                            getRowId={(row) => row.userId}
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <DialogModal
                open={open}
                clickClose={handleClose}
                clickSave={handleSave}
                title={"회원 수정"}
            >
                <UserEdit inputs={inputs} onChange={handleEditChange} />
            </DialogModal>
        </GridContainer>
    );
}

UserList.layout = Admin;

export default UserList;
