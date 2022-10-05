import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

export default function DataGridTable({ tableHead, tableData }) {
  
  const pageChange = (e) => {
    console.log('페이지변경',e)
  }
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={tableHead}
        pageSize={5}
        getRowId={(row) => row.userId}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        onPageChange={pageChange}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableSelectionOnClick={true}
        keepNonExistentRowsSelected={false}
        components={{
          Pagination: CustomPagination,
        }}
      />
    </Box>
  );
}
