import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddUserDialog from '../../components/admin/AddUserDialog';
import { Add as AddIcon } from '@mui/icons-material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Tên đăng nhập', width: 130 },
    { field: 'fullName', headerName: 'Họ tên', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Số điện thoại', width: 130 },
    {
      field: 'role',
      headerName: 'Vai trò',
      width: 130,
      valueGetter: (params) => {
        const roles = {
          admin: 'Quản trị viên',
          accountant: 'Kế toán',
          receptionist: 'Lễ tân',
          customer: 'Khách hàng',
        };
        return roles[params.value] || params.value;
      },
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            color='primary'
            size='small'
            onClick={() => handleEditUser(params.row)}
          >
            Sửa
          </Button>
          <Button
            color='error'
            size='small'
            onClick={() => handleDeleteUser(params.row.id)}
          >
            Xóa
          </Button>
        </Box>
      ),
    },
  ];

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5'>Quản lý người dùng</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Thêm người dùng
        </Button>
      </Box>

      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />

      <AddUserDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onUserAdded={handleAddUser}
      />
    </Paper>
  );
};

export default UserManagement;
