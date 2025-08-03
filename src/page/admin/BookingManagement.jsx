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
  Tooltip,
  Card,
  CardContent,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const BookingManagement = () => {
  const [open, setOpen] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      customerName: 'Nguyễn Văn A',
      customerPhone: '0123456789',
      customerEmail: 'nguyenvana@email.com',
      roomNumber: '101',
      roomType: 'Gia đình',
      checkIn: '2024-08-10',
      checkOut: '2024-08-12',
      guests: 4,
      totalAmount: 1400000,
      deposit: 500000,
      status: 'confirmed',
      paymentStatus: 'partial',
      specialRequests: 'Cần thêm giường phụ',
      createdAt: '2024-08-05',
      confirmedBy: 'admin',
    },
    {
      id: 'BK002',
      customerName: 'Trần Thị B',
      customerPhone: '0987654321',
      customerEmail: 'tranthib@email.com',
      roomNumber: '201',
      roomType: 'Đôi',
      checkIn: '2024-08-08',
      checkOut: '2024-08-10',
      guests: 2,
      totalAmount: 800000,
      deposit: 800000,
      status: 'checked-in',
      paymentStatus: 'paid',
      specialRequests: '',
      createdAt: '2024-08-03',
      confirmedBy: 'receptionist',
    },
    {
      id: 'BK003',
      customerName: 'Lê Văn C',
      customerPhone: '0702679156',
      customerEmail: 'levanc@email.com',
      roomNumber: '301',
      roomType: '3 người',
      checkIn: '2024-08-15',
      checkOut: '2024-08-17',
      guests: 3,
      totalAmount: 1000000,
      deposit: 0,
      status: 'pending',
      paymentStatus: 'unpaid',
      specialRequests: 'Check-in sớm lúc 10h sáng',
      createdAt: '2024-08-06',
      confirmedBy: null,
    },
    {
      id: 'BK004',
      customerName: 'Phạm Thị D',
      customerPhone: '0912345678',
      customerEmail: 'phamthid@email.com',
      roomNumber: '102',
      roomType: 'Đơn',
      checkIn: '2024-08-07',
      checkOut: '2024-08-09',
      guests: 1,
      totalAmount: 580000,
      deposit: 580000,
      status: 'checked-out',
      paymentStatus: 'paid',
      specialRequests: '',
      createdAt: '2024-08-01',
      confirmedBy: 'receptionist',
    },
    {
      id: 'BK005',
      customerName: 'Hoàng Văn E',
      customerPhone: '0654321098',
      customerEmail: 'hoangvane@email.com',
      roomNumber: '202',
      roomType: 'Đôi 2 giường',
      checkIn: '2024-08-20',
      checkOut: '2024-08-22',
      guests: 2,
      totalAmount: 840000,
      deposit: 300000,
      status: 'confirmed',
      paymentStatus: 'partial',
      specialRequests: 'Cần view hướng sông',
      createdAt: '2024-08-07',
      confirmedBy: 'admin',
    },
  ]);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      roomNumber: '',
      roomType: '',
      checkIn: null,
      checkOut: null,
      guests: 1,
      totalAmount: '',
      deposit: '',
      specialRequests: '',
      status: 'pending',
    },
  });

  const [confirmDelete, setConfirmDelete] = useState({ open: false, bookingId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const roomTypes = [
    { value: 'Gia đình', price: 700000 },
    { value: 'Đơn', price: 290000 },
    { value: 'Đôi', price: 400000 },
    { value: 'Đôi 2 giường', price: 420000 },
    { value: '3 người', price: 500000 },
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(search.toLowerCase()) ||
      booking.customerPhone.includes(search) ||
      booking.roomNumber.includes(search) ||
      booking.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? booking.status === statusFilter : true;
    const matchesPayment = paymentFilter ? booking.paymentStatus === paymentFilter : true;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const paginatedBookings = filteredBookings.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageCount = Math.ceil(filteredBookings.length / rowsPerPage);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'checked-in': return 'success';
      case 'checked-out': return 'default';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'confirmed': return 'Đã xác nhận';
      case 'checked-in': return 'Đã check-in';
      case 'checked-out': return 'Đã check-out';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'partial': return 'warning';
      case 'unpaid': return 'error';
      default: return 'default';
    }
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Đã thanh toán';
      case 'partial': return 'Thanh toán một phần';
      case 'unpaid': return 'Chưa thanh toán';
      default: return status;
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setError('');
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setViewDialog(true);
  };

  const handleCloseView = () => {
    setViewDialog(false);
    setSelectedBooking(null);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      if (selectedBooking) {
        // Cập nhật đặt phòng
        const updatedBookings = bookings.map(booking =>
          booking.id === selectedBooking.id ? { ...booking, ...data } : booking
        );
        setBookings(updatedBookings);
        setSnackbar({ open: true, message: 'Cập nhật đặt phòng thành công!', severity: 'success' });
      } else {
        // Thêm đặt phòng mới
        const newBooking = {
          id: `BK${String(bookings.length + 1).padStart(3, '0')}`,
          ...data,
          createdAt: new Date().toISOString().split('T')[0],
          confirmedBy: null,
        };
        setBookings([...bookings, newBooking]);
        setSnackbar({ open: true, message: 'Thêm đặt phòng thành công!', severity: 'success' });
      }

      handleClose();
    } catch (error) {
      setError('Có lỗi xảy ra khi lưu thông tin đặt phòng');
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi lưu thông tin đặt phòng', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    reset({
      ...booking,
      checkIn: dayjs(booking.checkIn),
      checkOut: dayjs(booking.checkOut),
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    setConfirmDelete({ open: false, bookingId: null });
    setSnackbar({ open: true, message: 'Xóa đặt phòng thành công!', severity: 'success' });
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    setSnackbar({ open: true, message: 'Cập nhật trạng thái thành công!', severity: 'success' });
  };

  const handlePaymentStatusChange = (bookingId, newPaymentStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, paymentStatus: newPaymentStatus } : booking
    ));
    setSnackbar({ open: true, message: 'Cập nhật trạng thái thanh toán thành công!', severity: 'success' });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 3 }}>
        Quản lý đặt phòng
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
            <MenuItem value="pending">Chờ xác nhận</MenuItem>
            <MenuItem value="confirmed">Đã xác nhận</MenuItem>
            <MenuItem value="checked-in">Đã check-in</MenuItem>
            <MenuItem value="checked-out">Đã check-out</MenuItem>
            <MenuItem value="cancelled">Đã hủy</MenuItem>
          </Select>
        </FormControl>
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
          <InputLabel>Thanh toán</InputLabel>
          <Select
            value={paymentFilter}
            label="Thanh toán"
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="paid">Đã thanh toán</MenuItem>
            <MenuItem value="partial">Thanh toán một phần</MenuItem>
            <MenuItem value="unpaid">Chưa thanh toán</MenuItem>
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
          {loading ? 'Đang xử lý...' : 'Thêm đặt phòng'}
        </Button>
      </Box>

      {/* Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>Mã đặt phòng</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Khách hàng</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Phòng</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Ngày check-in</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Ngày check-out</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Số khách</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Tổng tiền</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Trạng thái</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Thanh toán</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium" color="primary">
                      {booking.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {booking.customerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.customerPhone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {booking.roomNumber}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.roomType}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(booking.checkIn)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(booking.checkOut)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {booking.guests} người
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium" color="primary">
                      {formatCurrency(booking.totalAmount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(booking.status)}
                      color={getStatusColor(booking.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getPaymentStatusText(booking.paymentStatus)}
                      color={getPaymentStatusColor(booking.paymentStatus)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Xem chi tiết">
                        <IconButton size="small" onClick={() => handleViewBooking(booking)}>
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton size="small" onClick={() => handleEdit(booking)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => setConfirmDelete({ open: true, bookingId: booking.id })}
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
          {selectedBooking ? 'Chỉnh sửa đặt phòng' : 'Thêm đặt phòng mới'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='customerName'
                    control={control}
                    rules={{ required: 'Tên khách hàng là bắt buộc' }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label='Tên khách hàng'
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
                    name='customerPhone'
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
                    name='customerEmail'
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
                    name='roomNumber'
                    control={control}
                    rules={{ required: 'Số phòng là bắt buộc' }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label='Số phòng'
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
                    name='roomType'
                    control={control}
                    rules={{ required: 'Loại phòng là bắt buộc' }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl fullWidth error={!!error}>
                        <InputLabel>Loại phòng</InputLabel>
                        <Select {...field} label='Loại phòng' required>
                          {roomTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                              {type.value} - {formatCurrency(type.price)}/đêm
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='guests'
                    control={control}
                    rules={{ 
                      required: 'Số khách là bắt buộc',
                      min: { value: 1, message: 'Tối thiểu 1 khách' }
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label='Số khách'
                        type='number'
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
                    name='checkIn'
                    control={control}
                    rules={{ required: 'Ngày check-in là bắt buộc' }}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        {...field}
                        label='Ngày check-in'
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!error,
                            helperText: error?.message,
                            required: true,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='checkOut'
                    control={control}
                    rules={{ required: 'Ngày check-out là bắt buộc' }}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        {...field}
                        label='Ngày check-out'
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!error,
                            helperText: error?.message,
                            required: true,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='totalAmount'
                    control={control}
                    rules={{ required: 'Tổng tiền là bắt buộc' }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label='Tổng tiền (VND)'
                        type='number'
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
                    name='deposit'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label='Tiền cọc (VND)'
                        type='number'
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='specialRequests'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label='Yêu cầu đặc biệt'
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                        multiline
                        rows={3}
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
                          <MenuItem value='pending'>Chờ xác nhận</MenuItem>
                          <MenuItem value='confirmed'>Đã xác nhận</MenuItem>
                          <MenuItem value='checked-in'>Đã check-in</MenuItem>
                          <MenuItem value='checked-out'>Đã check-out</MenuItem>
                          <MenuItem value='cancelled'>Đã hủy</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type='submit' variant='contained' disabled={loading}>
              {loading ? 'Đang lưu...' : (selectedBooking ? 'Cập nhật' : 'Thêm')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View Booking Dialog */}
      <Dialog open={viewDialog} onClose={handleCloseView} maxWidth='md' fullWidth>
        <DialogTitle>Chi tiết đặt phòng</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Thông tin đặt phòng: {selectedBooking.id}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle2' color='text.secondary'>Khách hàng</Typography>
                        <Typography variant='body1'>{selectedBooking.customerName}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle2' color='text.secondary'>Số điện thoại</Typography>
                        <Typography variant='body1'>{selectedBooking.customerPhone}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle2' color='text.secondary'>Email</Typography>
                        <Typography variant='body1'>{selectedBooking.customerEmail}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle2' color='text.secondary'>Phòng</Typography>
                        <Typography variant='body1'>{selectedBooking.roomNumber} - {selectedBooking.roomType}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle2' color='text.secondary'>Check-in</Typography>
                        <Typography variant='body1'>{formatDate(selectedBooking.checkIn)}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle2' color='text.secondary'>Check-out</Typography>
                        <Typography variant='body1'>{formatDate(selectedBooking.checkOut)}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle2' color='text.secondary'>Số khách</Typography>
                        <Typography variant='body1'>{selectedBooking.guests} người</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle2' color='text.secondary'>Tổng tiền</Typography>
                        <Typography variant='body1' color='primary' fontWeight='bold'>
                          {formatCurrency(selectedBooking.totalAmount)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle2' color='text.secondary'>Tiền cọc</Typography>
                        <Typography variant='body1'>{formatCurrency(selectedBooking.deposit)}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle2' color='text.secondary'>Ngày tạo</Typography>
                        <Typography variant='body1'>{formatDate(selectedBooking.createdAt)}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant='subtitle2' color='text.secondary'>Yêu cầu đặc biệt</Typography>
                        <Typography variant='body1'>
                          {selectedBooking.specialRequests || 'Không có'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant='outlined'
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                    disabled={selectedBooking.status === 'confirmed'}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    variant='outlined'
                    startIcon={<PaymentIcon />}
                    onClick={() => handlePaymentStatusChange(selectedBooking.id, 'paid')}
                    disabled={selectedBooking.paymentStatus === 'paid'}
                  >
                    Đánh dấu đã thanh toán
                  </Button>
                  <Button
                    variant='outlined'
                    color='error'
                    startIcon={<CancelIcon />}
                    onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                    disabled={selectedBooking.status === 'cancelled'}
                  >
                    Hủy đặt phòng
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, bookingId: null })}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc muốn xóa đặt phòng này? Hành động này không thể hoàn tác.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, bookingId: null })}>
            Hủy
          </Button>
          <Button 
            color="error" 
            onClick={() => handleDelete(confirmDelete.bookingId)}
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

export default BookingManagement; 