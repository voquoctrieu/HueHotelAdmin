import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  InputAdornment,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';

const UserManagement = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      fullName: 'Admin',
      email: 'admin@example.com',
      phone: '0123456789',
      role: 'admin',
    },
    {
      id: 2,
      username: 'receptionist',
      fullName: 'Lễ tân',
      email: 'receptionist@example.com',
      phone: '0702679156',
      role: 'receptionist',
    },
  ]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: '',
      password: '',
      fullName: '',
      email: '',
      phone: '',
      role: 'receptionist',
    },
  });

  const roles = [
    { value: 'admin', label: 'Quản trị viên' },
    { value: 'accountant', label: 'Kế toán' },
    { value: 'receptionist', label: 'Lễ tân' },
  ];

  const [confirmDelete, setConfirmDelete] = useState({ open: false, userId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredUsers.length / rowsPerPage);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setError('');
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
   
      const newUser = {
        id: users.length + 1,
        ...data,
      };
      setUsers([...users, newUser]);
      setSnackbar({ open: true, message: 'Thêm người dùng thành công!', severity: 'success' });
      handleClose();
    } catch (error) {
      setError('Có lỗi xảy ra khi thêm người dùng');
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi thêm người dùng', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    reset(user);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
     
      setUsers(users.filter(user => user.id !== id));
      setConfirmDelete({ open: false, userId: null });
      setSnackbar({ open: true, message: 'Xóa người dùng thành công!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi xóa người dùng', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý người dùng
      </Typography>
      
      {/* Search and Filter Controls */}
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        gap: 2,
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ 
            flexGrow: 1, 
            minWidth: { xs: '100%', sm: 200 },
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#666',
            },
            '& .MuiInputBase-input': {
              color: '#333',
            },
          }}
        />
        <FormControl size="small" sx={{ 
          minWidth: { xs: '100%', sm: 150 },
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#666',
          },
          '& .MuiSelect-select': {
            color: '#333',
          },
        }}>
          <InputLabel>Vai trò</InputLabel>
          <Select
            value={roleFilter}
            label="Vai trò"
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="receptionist">Receptionist</MenuItem>
            <MenuItem value="accountant">Accountant</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ 
            minWidth: { xs: '100%', sm: 'auto' },
            height: { xs: 'auto', sm: 40 }
          }}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Thêm người dùng'}
        </Button>
      </Box>

      {/* Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: { xs: 80, sm: 120 } }}>Tên</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Email</TableCell>
                <TableCell sx={{ minWidth: { xs: 80, sm: 100 } }}>Vai trò</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Trạng thái</TableCell>
                <TableCell sx={{ minWidth: { xs: 60, sm: 80 } }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {user.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' } }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={
                        user.role === 'admin' ? 'error' :
                        user.role === 'receptionist' ? 'primary' : 'success'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Chip
                      label={user.status}
                      color={user.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => handleEdit(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => setConfirmDelete({ open: true, user })}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          p: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 1
        }}>
          <Typography variant="body2" color="text.secondary">
            Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} trong {filteredUsers.length} người dùng
          </Typography>
          <Pagination
            count={Math.ceil(filteredUsers.length / rowsPerPage)}
            page={page + 1}
            onChange={(e, newPage) => setPage(newPage - 1)}
            size="small"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#333',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  borderColor: '#1976d2',
                },
                '&.Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: 'white',
                  borderColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                },
              },
              '& .MuiPaginationItem-icon': {
                color: '#333',
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>Thêm người dùng mới</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name='username'
                  control={control}
                  rules={{ required: 'Tên đăng nhập là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Tên đăng nhập'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: 'Mật khẩu là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      type='password'
                      label='Mật khẩu'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='fullName'
                  control={control}
                  rules={{ required: 'Họ tên là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Họ tên'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: 'Email là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      type='email'
                      label='Email'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: 'Số điện thoại là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Số điện thoại'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='role'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Vai trò</InputLabel>
                      <Select {...field} label='Vai trò'>
                        {roles.map((role) => (
                          <MenuItem key={role.value} value={role.value}>
                            {role.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
              Hủy
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Đang thêm...' : 'Thêm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, userId: null })}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn có chắc muốn xóa người dùng này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, userId: null })} disabled={loading}>
            Hủy
          </Button>
          <Button 
            onClick={() => handleDelete(confirmDelete.userId)}
            color="error" 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
