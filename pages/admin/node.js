import * as React from "react";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import { GridItem, GridContainer } from "components/Grid";
import DataGridTable from "components/Table/DataGridTable.js";
import { Card, CardBody } from "components/Card";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material/";
import { useFetchWrapper } from "../../helpers";
import { BASIC_CONSTANT } from "../../variables/basic.constants";
import { useRouter } from "next/router";

function Node() {
    const router = useRouter();
    const fetchWrapper = useFetchWrapper();
    const [rows, setRows] = React.useState([]);
    const categoryId = router.query.category;
    React.useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetchWrapper
            .get(`${BASIC_CONSTANT.BACKEND_URL}/api/nodes/admin/${categoryId}`)
            .then((response) => {
                setRows(response);
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
                field: "name",
                headerName: "이름",
            },
            {
                field: "actions",
                type: "actions",
                headerName: "관리",
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        onClick={() =>
                            router.push({
                                pathname: "/admin/question",
                                query: { node: params.id },
                            })
                        }
                        label="Edit"
                    />,
                ],
                width: 100,
            },
        ],
        []
    );

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <DataGridTable
                            tableHead={columns}
                            tableData={rows}
                            getRowId={(row) => row.id}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

Node.layout = Admin;

export default Node;
