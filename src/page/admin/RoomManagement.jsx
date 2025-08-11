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
  Snackbar,
  Alert,
  InputAdornment,
  Pagination,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

const RoomManagement = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [rooms, setRooms] = useState([
    {
      id: 1,
      number: '101',
      type: 'Gia đình',
      price: '700,000',
      originalPrice: '1,000,000',
      discount: '30%',
      status: 'Trống',
      capacity: 4,
    },
    {
      id: 2,
      number: '102',
      type: 'Đơn',
      price: '290,000',
      originalPrice: '414,000',
      discount: '30%',
      status: 'Đã đặt',
      capacity: 1,
    },
    {
      id: 3,
      number: '103',
      type: 'Đôi',
      price: '400,000',
      originalPrice: '571,000',
      discount: '30%',
      status: 'Trống',
      capacity: 2,
    },
    {
      id: 4,
      number: '104',
      type: 'Đôi 2 giường',
      price: '420,000',
      originalPrice: '600,000',
      discount: '30%',
      status: 'Trống',
      capacity: 2,
    },
    {
      id: 5,
      number: '201',
      type: '3 người',
      price: '500,000',
      originalPrice: '714,000',
      discount: '30%',
      status: 'Đã đặt',
      capacity: 3,
    },
    {
      id: 6,
      number: '202',
      type: 'Gia đình',
      price: '700,000',
      originalPrice: '1,000,000',
      discount: '30%',
      status: 'Trống',
      capacity: 4,
    },
    {
      id: 7,
      number: '203',
      type: 'Đơn',
      price: '290,000',
      originalPrice: '414,000',
      discount: '30%',
      status: 'Trống',
      capacity: 1,
    },
    {
      id: 8,
      number: '204',
      type: 'Đôi',
      price: '400,000',
      originalPrice: '571,000',
      discount: '30%',
      status: 'Đã đặt',
      capacity: 2,
    },
    {
      id: 9,
      number: '301',
      type: 'Đôi 2 giường',
      price: '420,000',
      originalPrice: '600,000',
      discount: '30%',
      status: 'Trống',
      capacity: 2,
    },
    {
      id: 10,
      number: '302',
      type: '3 người',
      price: '500,000',
      originalPrice: '714,000',
      discount: '30%',
      status: 'Trống',
      capacity: 3,
    },
    {
      id: 11,
      number: '303',
      type: 'Gia đình',
      price: '700,000',
      originalPrice: '1,000,000',
      discount: '30%',
      status: 'Đã đặt',
      capacity: 4,
    },
    {
      id: 12,
      number: '304',
      type: 'Đơn',
      price: '290,000',
      originalPrice: '414,000',
      discount: '30%',
      status: 'Trống',
      capacity: 1,
    },
    {
      id: 13,
      number: '401',
      type: 'Đôi',
      price: '400,000',
      originalPrice: '571,000',
      discount: '30%',
      status: 'Trống',
      capacity: 2,
    },
    {
      id: 14,
      number: '402',
      type: 'Đôi 2 giường',
      price: '420,000',
      originalPrice: '600,000',
      discount: '30%',
      status: 'Đã đặt',
      capacity: 2,
    },
    {
      id: 15,
      number: '403',
      type: '3 người',
      price: '500,000',
      originalPrice: '714,000',
      discount: '30%',
      status: 'Trống',
      capacity: 3,
    },
    {
      id: 16,
      number: '404',
      type: 'Gia đình',
      price: '700,000',
      originalPrice: '1,000,000',
      discount: '30%',
      status: 'Trống',
      capacity: 4,
    },
    {
      id: 17,
      number: '501',
      type: 'Đơn',
      price: '290,000',
      status: 'Đã đặt',
      capacity: 1,
    },
    {
      id: 18,
      number: '502',
      type: 'Đôi',
      price: '400,000',
      status: 'Trống',
      capacity: 2,
    },
  ]);

  const [formData, setFormData] = useState({
    number: '',
    type: '',
    price: '',
    capacity: '',
  });

  const [confirmDelete, setConfirmDelete] = useState({ open: false, roomId: null });

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const roomTypes = [
    { room: 'Gia đình', price: 700 },
    { room: 'Đơn', price: 290 },
    { room: 'Đôi', price: 400 },
    { room: 'Đôi 2 giường', price: 420 },
    { room: '3 người', price: 500 },
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesSearch =
      room.number.toLowerCase().includes(search.toLowerCase()) ||
      room.type.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? room.type === typeFilter : true;
    return matchesSearch && matchesType;
  });
  const paginatedRooms = filteredRooms.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageCount = Math.ceil(filteredRooms.length / rowsPerPage);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      number: '',
      type: '',
      price: '',
      capacity: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
     
      if (!formData.number || !formData.type || !formData.price || !formData.capacity) {
        setSnackbar({ open: true, message: 'Vui lòng điền đầy đủ thông tin!', severity: 'error' });
        return;
      }

      if (formData.id) {
   
        const updatedRooms = rooms.map(room =>
          room.id === formData.id ? { ...room, ...formData } : room
        );
        setRooms(updatedRooms);
        setSnackbar({ open: true, message: 'Cập nhật phòng thành công!', severity: 'success' });
      } else {
      
        const newRoom = {
          id: rooms.length + 1,
          ...formData,
          status: 'Trống',
          originalPrice: formData.price,
          discount: '30%',
        };
        setRooms([...rooms, newRoom]);
        setSnackbar({ open: true, message: 'Thêm phòng thành công!', severity: 'success' });
      }
      
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi thêm phòng', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (room) => {
    setFormData(room);
    setOpen(true);
  };

  const handleDelete = (id) => {
 
    setRooms(rooms.filter(room => room.id !== id));
    setConfirmDelete({ open: false, roomId: null });
    setSnackbar({ open: true, message: 'Xóa phòng thành công!', severity: 'success' });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Banner Khuyến mãi Mùa hè */}
      <Alert 
        severity="info" 
        sx={{ 
          mb: 3, 
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          color: 'white',
          '& .MuiAlert-icon': { color: 'white' },
          '& .MuiAlert-message': { color: 'white' }
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          🌞 CHƯƠNG TRÌNH KHUYẾN MÃI MÙA HÈ 2025 🌞
        </Typography>
        <Typography variant="body1">
          Giảm giá <strong>30%</strong> cho tất cả các loại phòng từ tháng 6 đến tháng 8/2025!
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
          Áp dụng cho khách hàng đặt phòng trực tiếp và online. Khuyến mãi có thể kết thúc sớm!
        </Typography>
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, gap: 2, flexWrap: 'wrap' }}>
        <Typography variant='h4'>Quản lý phòng</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size='small'
            placeholder='Tìm kiếm...'
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ 
              minWidth: 200,
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
                color: '#333',
              },
              '& .MuiInputBase-input': {
                color: '#333',
                '&::placeholder': {
                  color: '#666',
                  opacity: 1,
                },
              },
            }}
          />
          <FormControl size='small' sx={{ 
            minWidth: 150,
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
              color: '#333',
            },
            '& .MuiSelect-select': {
              color: '#333',
            },
          }}>
            <InputLabel>Loại phòng</InputLabel>
            <Select
              value={typeFilter}
              label='Loại phòng'
              onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
            >
              <MenuItem value=''>Tất cả</MenuItem>
              <MenuItem value='Gia đình'>Gia đình</MenuItem>
              <MenuItem value='Đơn'>Đơn</MenuItem>
              <MenuItem value='Đôi'>Đôi</MenuItem>
              <MenuItem value='Đôi 2 giường'>Đôi 2 giường</MenuItem>
              <MenuItem value='3 người'>3 người</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ 
            minWidth: { xs: '100%', sm: 'auto' },
            height: { xs: 'auto', sm: 40 }
          }}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Thêm phòng'}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Số phòng</TableCell>
              <TableCell>Loại phòng</TableCell>
              <TableCell>Giá (VND/đêm)</TableCell>
              <TableCell>Sức chứa</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.number}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                      {room.originalPrice}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                      {room.price} (-{room.discount})
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{room.capacity} người</TableCell>
                <TableCell>{room.status}</TableCell>
                <TableCell>
                  <IconButton color='primary' onClick={() => handleEdit(room)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => setConfirmDelete({ open: true, roomId: room.id })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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
                fontWeight: 'medium',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  borderColor: '#1976d2',
                },
                '&.Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: 'white',
                  borderColor: '#1976d2',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                },
              },
              '& .MuiPaginationItem-icon': {
                color: '#333',
                fontWeight: 'medium',
              },
            }}
          />
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {formData.id ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}
        </DialogTitle>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Số phòng'
                  name='number'
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Loại phòng</InputLabel>
                  <Select
                    name='type'
                    value={formData.type}
                    onChange={handleChange}
                    label='Loại phòng'
                  >
                    <MenuItem value='Gia đình'>Gia đình</MenuItem>
                    <MenuItem value='Đơn'>Đơn</MenuItem>
                    <MenuItem value='Đôi'>Đôi</MenuItem>
                    <MenuItem value='Đôi 2 giường'>Đôi 2 giường</MenuItem>
                    <MenuItem value='3 người'>3 người</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Giá (VND/đêm)'
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Sức chứa'
                  name='capacity'
                  type='number'
                  value={formData.capacity}
                  onChange={handleChange}
                  required
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
              {loading ? 'Đang thêm...' : (formData.id ? 'Cập nhật' : 'Thêm')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, roomId: null })}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn có chắc muốn xóa phòng này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, roomId: null })} disabled={loading}>
            Hủy
          </Button>
          <Button 
            onClick={() => handleDelete(confirmDelete.roomId)}
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

export default RoomManagement;
