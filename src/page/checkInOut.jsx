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
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const CheckInOut = () => {
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      roomNumber: '101',
      guestName: 'Nguyễn Văn A',
      checkIn: '2025-08-20',
      checkOut: '2025-08-22',
      status: 'Đã check-in',
      payment: 'Đã thanh toán',
    },
    {
      id: 2,
      roomNumber: '102',
      guestName: 'Trần Thị B',
      checkIn: '2025-08-21',
      checkOut: '2025-08-23',
      status: 'Chờ check-in',
      payment: 'Chưa thanh toán',
    },
  ]);

  const [formData, setFormData] = useState({
    roomNumber: '',
    guestName: '',
    checkIn: null,
    checkOut: null,
    payment: '',
  });

  const [confirmDelete, setConfirmDelete] = useState({ open: false, bookingId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      roomNumber: '',
      guestName: '',
      checkIn: null,
      checkOut: null,
      payment: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (field) => (date) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Validate required fields
      if (!formData.roomNumber || !formData.guestName || !formData.checkIn || !formData.checkOut || !formData.payment) {
        setSnackbar({ open: true, message: 'Vui lòng điền đầy đủ thông tin!', severity: 'error' });
        return;
      }

      const newBooking = {
        id: bookings.length + 1,
        ...formData,
        checkIn: formData.checkIn.format('YYYY-MM-DD'),
        checkOut: formData.checkOut.format('YYYY-MM-DD'),
        status: 'Chờ check-in',
      };
      setBookings([...bookings, newBooking]);
      setSnackbar({ open: true, message: 'Thêm đặt phòng thành công!', severity: 'success' });
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi thêm đặt phòng', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = (id) => {
   
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'checked-in' } : booking
      )
    );
    setSnackbar({ open: true, message: 'Check-in thành công!', severity: 'success' });
  };

  const handleCheckOut = (id) => {

    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'checked-out' } : booking
      )
    );
    setSnackbar({ open: true, message: 'Check-out thành công!', severity: 'success' });
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
    setConfirmDelete({ open: false, bookingId: null });
    setSnackbar({ open: true, message: 'Xóa đặt phòng thành công!', severity: 'success' });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4'>Check-in/Check-out</Typography>
        <Button
          variant='contained'
          startIcon={<CheckCircleIcon />}
          onClick={handleOpen}
        >
          Thêm đặt phòng
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Số phòng</TableCell>
              <TableCell>Khách</TableCell>
              <TableCell>Check-in</TableCell>
              <TableCell>Check-out</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thanh toán</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.roomNumber}</TableCell>
                <TableCell>{booking.guestName}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    color={
                      booking.status === 'Đã check-in'
                        ? 'success'
                        : booking.status === 'Chờ check-in'
                        ? 'warning'
                        : 'default'
                    }
                    size='small'
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={booking.payment}
                    color={
                      booking.payment === 'Đã thanh toán' ? 'success' : 'error'
                    }
                    size='small'
                  />
                </TableCell>
                <TableCell>
                  {booking.status === 'Chờ check-in' && (
                    <IconButton
                      color='success'
                      onClick={() => handleCheckIn(booking.id)}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  )}
                  {booking.status === 'Đã check-in' && (
                    <IconButton
                      color='error'
                      onClick={() => handleCheckOut(booking.id)}
                    >
                      <CancelIcon />
                    </IconButton>
                  )}
                  <IconButton color='primary'>
                    <EditIcon />
                  </IconButton>
                  <IconButton color='error' onClick={() => setConfirmDelete({ open: true, bookingId: booking.id })}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>Thêm đặt phòng mới</DialogTitle>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Số phòng'
                  name='roomNumber'
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Tên khách'
                  name='guestName'
                  value={formData.guestName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Ngày check-in'
                    value={formData.checkIn}
                    onChange={handleDateChange('checkIn')}
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Ngày check-out'
                    value={formData.checkOut}
                    onChange={handleDateChange('checkOut')}
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Thanh toán</InputLabel>
                  <Select
                    name='payment'
                    value={formData.payment}
                    onChange={handleChange}
                    label='Thanh toán'
                  >
                    <MenuItem value='Đã thanh toán'>Đã thanh toán</MenuItem>
                    <MenuItem value='Chưa thanh toán'>Chưa thanh toán</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>Hủy</Button>
            <Button type="submit" variant='contained' disabled={loading}>
              {loading ? 'Đang thêm...' : 'Thêm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, bookingId: null })}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn có chắc muốn xóa đặt phòng này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, bookingId: null })}>Hủy</Button>
          <Button color="error" onClick={() => handleDelete(confirmDelete.bookingId)}>Xóa</Button>
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

export default CheckInOut;
