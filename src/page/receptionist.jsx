import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Badge,
} from '@mui/material';
import {
  Hotel as HotelIcon,
  Event as EventIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const ReceptionistDashboard = () => {
  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      customer: 'Nguyễn Văn A',
      room: 'Gia đình 101',
      checkIn: '07/08/2024',
      checkOut: '10/08/2024',
      status: 'Đã xác nhận',
    },
    {
      id: 'BK002',
      customer: 'Trần Thị B',
      room: 'Đôi 201',
      checkIn: '07/08/2024',
      checkOut: '09/08/2024',
      status: 'Chờ xác nhận',
    },
    {
      id: 'BK003',
      customer: 'Lê Văn C',
      room: '3 người 301',
      checkIn: '06/08/2024',
      checkOut: '08/08/2024',
      status: 'Đã xác nhận',
    },
  ]);

  const [confirmDelete, setConfirmDelete] = useState({ open: false, bookingId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      message: 'Đặt phòng mới từ khách hàng Nguyễn Văn D',
      time: '2 phút trước',
      read: false,
    },
    {
      id: 2,
      type: 'checkin',
      message: 'Khách hàng Trần Thị E yêu cầu check-in sớm',
      time: '15 phút trước',
      read: false,
    },
    {
      id: 3,
      type: 'maintenance',
      message: 'Phòng 205 cần dọn dẹp sau check-out',
      time: '1 giờ trước',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const stats = [
    {
      title: 'Phòng trống',
      value: '25',
      icon: <HotelIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Check-in hôm nay',
      value: '8',
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Check-out hôm nay',
      value: '5',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
    {
      title: 'Đặt phòng mới',
      value: '12',
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
  ];

  const handleCheckIn = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'Đã check-in' } : booking
      )
    );
    setSnackbar({ open: true, message: 'Check-in thành công!', severity: 'success' });
    
    // Add notification
    const newNotification = {
      id: Date.now(),
      type: 'checkin',
      message: `Khách hàng đã check-in phòng ${bookings.find(b => b.id === id)?.room}`,
      time: 'Vừa xong',
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  const handleCheckOut = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'Đã check-out' } : booking
      )
    );
    setSnackbar({ open: true, message: 'Check-out thành công!', severity: 'success' });
    
    // Add notification
    const newNotification = {
      id: Date.now(),
      type: 'checkout',
      message: `Khách hàng đã check-out phòng ${bookings.find(b => b.id === id)?.room}`,
      time: 'Vừa xong',
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    setConfirmDelete({ open: false, bookingId: null });
    setSnackbar({ open: true, message: 'Xóa đặt phòng thành công!', severity: 'success' });
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking':
        return <EventIcon />;
      case 'checkin':
        return <CheckCircleIcon />;
      case 'checkout':
        return <PersonIcon />;
      case 'maintenance':
        return <HotelIcon />;
      default:
        return <EventIcon />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'booking':
        return '#1976d2';
      case 'checkin':
        return '#2e7d32';
      case 'checkout':
        return '#ed6c02';
      case 'maintenance':
        return '#d32f2f';
      default:
        return '#1976d2';
    }
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Dashboard Lễ tân</Typography>
        <Badge badgeContent={unreadCount} color="error">
          <Button
            variant="outlined"
            onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          >
            Thông báo ({unreadCount})
          </Button>
        </Badge>
      </Box>

      {/* Notifications */}
      {unreadCount > 0 && (
        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom>
            Thông báo mới
          </Typography>
          <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
            {notifications.filter(n => !n.read).map((notification) => (
              <Box
                key={notification.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  mb: 1,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <Box sx={{ 
                  color: getNotificationColor(notification.type),
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {getNotificationIcon(notification.type)}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">{notification.message}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
      </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      <Grid
        container
        spacing={3}
        sx={{
          width: '100%',
          margin: 0,
        }}
      >
        {stats.map((stat, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{
              display: 'flex',
              p: 0,
            }}
          >
            <Card
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ flex: 1, p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <Box>
                    <Typography
                      color='textSecondary'
                      gutterBottom
                      sx={{ fontSize: '1rem', fontWeight: 500 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant='h5'
                      component='div'
                      sx={{ fontWeight: 600 }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      color: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${stat.color}15`,
                      borderRadius: '50%',
                      p: 1,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={3}
        sx={{
          mt: 3,
          width: '100%',
          margin: 0,
        }}
      >
        <Grid item xs={12} sx={{ p: 0 }}>
          <Paper
            sx={{
              width: '100%',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant='h6'>Đặt phòng hôm nay</Typography>
              <Button
                variant='contained'
                color='primary'
                sx={{
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Thêm đặt phòng
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Phòng</TableCell>
                    <TableCell>Khách</TableCell>
                    <TableCell>Check-in</TableCell>
                    <TableCell>Check-out</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell align='right'>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.room}</TableCell>
                      <TableCell>{booking.customer}</TableCell>
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
                          sx={{ minWidth: 100 }}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <Button
                          variant='outlined'
                          size='small'
                          sx={{
                            mr: 1,
                            textTransform: 'none',
                            minWidth: 80,
                          }}
                        >
                          Chi tiết
                        </Button>
                        {booking.status === 'Đã check-in' ? (
                          <Button
                            variant='contained'
                            size='small'
                            color='secondary'
                            onClick={() => handleCheckOut(booking.id)}
                            sx={{
                              textTransform: 'none',
                              minWidth: 80,
                            }}
                          >
                            Check-out
                          </Button>
                        ) : booking.status === 'Chờ check-in' ? (
                          <Button
                            variant='contained'
                            size='small'
                            color='primary'
                            onClick={() => handleCheckIn(booking.id)}
                            sx={{
                              textTransform: 'none',
                              minWidth: 80,
                            }}
                          >
                            Check-in
                          </Button>
                        ) : null}
                        <IconButton color='error' onClick={() => setConfirmDelete({ open: true, bookingId: booking.id })}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
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

export default ReceptionistDashboard;
