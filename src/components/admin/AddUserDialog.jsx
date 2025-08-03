import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import api from '../../services/api';

const AddUserDialog = ({ open, onClose, onUserAdded }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      fullName: '',
      email: '',
      phone: '',
      role: 'customer',
    },
  });

  const roles = [
    { value: 'admin', label: 'Quản trị viên' },
    { value: 'accountant', label: 'Kế toán' },
    { value: 'receptionist', label: 'Lễ tân' },
    { value: 'customer', label: 'Khách hàng' },
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      const response = await api.post('/api/users', data);

      onUserAdded(response.data);
      setSnackbar({ open: true, message: 'Thêm người dùng thành công!', severity: 'success' });
      handleClose();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Có lỗi xảy ra khi tạo người dùng'
      );
      setSnackbar({ open: true, message: err.response?.data?.message || 'Có lỗi xảy ra khi tạo người dùng', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setError('');
    onClose();
  };

  return (
    <>
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>Thêm người dùng mới</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'grid', gap: 2 }}>
            <Controller
              name='username'
              control={control}
              rules={{
                required: 'Tên đăng nhập là bắt buộc',
                minLength: {
                  value: 3,
                  message: 'Tên đăng nhập phải có ít nhất 3 ký tự',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Tên đăng nhập'
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              rules={{
                required: 'Mật khẩu là bắt buộc',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='password'
                  label='Mật khẩu'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name='fullName'
              control={control}
              rules={{ required: 'Họ tên là bắt buộc' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Họ tên'
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name='email'
              control={control}
              rules={{
                required: 'Email là bắt buộc',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email không hợp lệ',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='email'
                  label='Email'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name='phone'
              control={control}
              rules={{
                required: 'Số điện thoại là bắt buộc',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Số điện thoại không hợp lệ',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Số điện thoại'
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name='role'
              control={control}
              rules={{ required: 'Vai trò là bắt buộc' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.role}>
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
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Thêm người dùng'}
          </Button>
        </DialogActions>
      </form>
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
    </>
  );
};

export default AddUserDialog;
