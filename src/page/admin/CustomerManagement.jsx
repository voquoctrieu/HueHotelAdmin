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
  Pagination,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

const CustomerManagement = () => {
  const [open, setOpen] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789',
      address: '25 Trung Đông, phường Phú Thượng, thành phố Huế',
      idCard: '123456789012',
      status: 'active',
      totalBookings: 5,
      totalSpent: 3500000,
      lastVisit: '2025-03-07',
      createdAt: '2025-01-15',
    },
    {
      id: 2,
      fullName: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      address: '15 Lê Lợi, phường Phú Nhuận, thành phố Huế',
      idCard: '987654321098',
      status: 'active',
      totalBookings: 3,
      totalSpent: 1800000,
      lastVisit: '2025-03-05',
      createdAt: '2025-03-20',
    },
    {
      id: 3,
      fullName: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0702679156',
      address: '8 Nguyễn Huệ, phường Vĩnh Ninh, thành phố Huế',
      idCard: '456789123456',
      status: 'inactive',
      totalBookings: 1,
      totalSpent: 800000,
      lastVisit: '2025-02-15',
      createdAt: '2025-06-10',
    },
    {
      id: 4,
      fullName: 'Phạm Thị D',
      email: 'phamthid@email.com',
      phone: '0912345678',
      address: '12 Trần Phú, phường Thuận Thành, thành phố Huế',
      idCard: '789123456789',
      status: 'active',
      totalBookings: 8,
      totalSpent: 5200000,
      lastVisit: '2025-03-06',
      createdAt: '2022-12-05',
    },
    {
      id: 5,
      fullName: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      phone: '0654321098',
      address: '30 Điện Biên Phủ, phường An Cựu, thành phố Huế',
      idCard: '321098765432',
      status: 'active',
      totalBookings: 2,
      totalSpent: 1200000,
      lastVisit: '2025-03-01',
      createdAt: '2025-08-15',
    },
  ]);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      idCard: '',
      status: 'active',
    },
  });

  const [confirmDelete, setConfirmDelete] = useState({ open: false, customerId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search) ||
      customer.idCard.includes(search);
    const matchesStatus = statusFilter ? customer.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const paginatedCustomers = filteredCustomers.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageCount = Math.ceil(filteredCustomers.length / rowsPerPage);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setError('');
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setViewDialog(true);
  };

  const handleCloseView = () => {
    setViewDialog(false);
    setSelectedCustomer(null);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      if (selectedCustomer) {
 
        const updatedCustomers = customers.map(customer =>
          customer.id === selectedCustomer.id ? { ...customer, ...data } : customer
        );
        setCustomers(updatedCustomers);
        setSnackbar({ open: true, message: 'Cập nhật khách hàng thành công!', severity: 'success' });
      } else {
        
        const newCustomer = {
          id: customers.length + 1,
          ...data,
          totalBookings: 0,
          totalSpent: 0,
          lastVisit: null,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setCustomers([...customers, newCustomer]);
        setSnackbar({ open: true, message: 'Thêm khách hàng thành công!', severity: 'success' });
      }

      handleClose();
    } catch (error) {
      setError('Có lỗi xảy ra khi lưu thông tin khách hàng');
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi lưu thông tin khách hàng', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    reset(customer);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    setConfirmDelete({ open: false, customerId: null });
    setSnackbar({ open: true, message: 'Xóa khách hàng thành công!', severity: 'success' });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 3 }}>
        Quản lý khách hàng
      </Typography>
      
      {/*  */}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ 
            flexGrow: 1, 
            minWidth: { xs: '100%', sm: 300 },
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
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={statusFilter}
            label="Trạng thái"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="active">Hoạt động</MenuItem>
            <MenuItem value="inactive">Không hoạt động</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<AddIcon />}
          sx={{ 
            minWidth: { xs: '100%', sm: 'auto' },
            height: { xs: 'auto', sm: 40 }
          }}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Thêm khách hàng'}
        </Button>
      </Box>

      {/*  */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 200 }}>Khách hàng</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Liên hệ</TableCell>
                <TableCell sx={{ minWidth: 120 }}>CMND/CCCD</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Trạng thái</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Lần đặt phòng</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Tổng chi tiêu</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Lần cuối</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#1976d2' }}>
                        {customer.fullName.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {customer.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Tham gia: {formatDate(customer.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <EmailIcon sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">{customer.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">{customer.phone}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{customer.idCard}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      color={customer.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {customer.totalBookings} lần
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium" color="primary">
                      {formatCurrency(customer.totalSpent)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {customer.lastVisit ? formatDate(customer.lastVisit) : 'Chưa có'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Xem chi tiết">
                        <IconButton size="small" onClick={() => handleViewCustomer(customer)}>
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton size="small" onClick={() => handleEdit(customer)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => setConfirmDelete({ open: true, customerId: customer.id })}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              color='primary'
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
        )}
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
        <DialogTitle>
          {selectedCustomer ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng mới'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ 
                    required: 'Email là bắt buộc',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email không hợp lệ'
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Email'
                      type='email'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ 
                    required: 'Số điện thoại là bắt buộc',
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: 'Số điện thoại không hợp lệ'
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Số điện thoại'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='idCard'
                  control={control}
                  rules={{ 
                    required: 'CMND/CCCD là bắt buộc',
                    pattern: {
                      value: /^[0-9]{9,12}$/,
                      message: 'CMND/CCCD không hợp lệ'
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='CMND/CCCD'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='address'
                  control={control}
                  rules={{ required: 'Địa chỉ là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Địa chỉ'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                      multiline
                      rows={2}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='status'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel>Trạng thái</InputLabel>
                      <Select {...field} label='Trạng thái'>
                        <MenuItem value='active'>Hoạt động</MenuItem>
                        <MenuItem value='inactive'>Không hoạt động</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type='submit' variant='contained' disabled={loading}>
              {loading ? 'Đang lưu...' : (selectedCustomer ? 'Cập nhật' : 'Thêm')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View Customer Dialog */}
      <Dialog open={viewDialog} onClose={handleCloseView} maxWidth='md' fullWidth>
        <DialogTitle>Thông tin chi tiết khách hàng</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ width: 80, height: 80, bgcolor: '#1976d2', fontSize: '2rem' }}>
                    {selectedCustomer.fullName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant='h5' fontWeight='bold'>
                      {selectedCustomer.fullName}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Khách hàng từ {formatDate(selectedCustomer.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant='subtitle2' color='text.secondary'>Email</Typography>
                <Typography variant='body1'>{selectedCustomer.email}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant='subtitle2' color='text.secondary'>Số điện thoại</Typography>
                <Typography variant='body1'>{selectedCustomer.phone}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant='subtitle2' color='text.secondary'>CMND/CCCD</Typography>
                <Typography variant='body1'>{selectedCustomer.idCard}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant='subtitle2' color='text.secondary'>Trạng thái</Typography>
                <Chip
                  label={selectedCustomer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                  color={selectedCustomer.status === 'active' ? 'success' : 'default'}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant='subtitle2' color='text.secondary'>Địa chỉ</Typography>
                <Typography variant='body1'>{selectedCustomer.address}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Typography variant='subtitle2' color='text.secondary'>Tổng lần đặt phòng</Typography>
                <Typography variant='h6' color='primary'>{selectedCustomer.totalBookings} lần</Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Typography variant='subtitle2' color='text.secondary'>Tổng chi tiêu</Typography>
                <Typography variant='h6' color='primary'>{formatCurrency(selectedCustomer.totalSpent)}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Typography variant='subtitle2' color='text.secondary'>Lần cuối ghé thăm</Typography>
                <Typography variant='body1'>
                  {selectedCustomer.lastVisit ? formatDate(selectedCustomer.lastVisit) : 'Chưa có'}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, customerId: null })}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc muốn xóa khách hàng này? Hành động này không thể hoàn tác.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, customerId: null })}>
            Hủy
          </Button>
          <Button 
            color="error" 
            onClick={() => handleDelete(confirmDelete.customerId)}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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

export default CustomerManagement; 