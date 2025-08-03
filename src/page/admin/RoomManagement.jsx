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
  const [rooms, setRooms] = useState([
    {
      id: 1,
      number: '101',
      type: 'Gia đình',
      price: '700,000',
      status: 'Trống',
      capacity: 4,
    },
    {
      id: 2,
      number: '102',
      type: 'Đơn',
      price: '290,000',
      status: 'Đã đặt',
      capacity: 1,
    },
    {
      id: 3,
      number: '103',
      type: 'Đôi',
      price: '400,000',
      status: 'Trống',
      capacity: 2,
    },
    {
      id: 4,
      number: '104',
      type: 'Đôi 2 giường',
      price: '420,000',
      status: 'Trống',
      capacity: 2,
    },
    {
      id: 5,
      number: '201',
      type: '3 người',
      price: '500,000',
      status: 'Đã đặt',
      capacity: 3,
    },
    {
      id: 6,
      number: '202',
      type: 'Gia đình',
      price: '700,000',
      status: 'Trống',
      capacity: 4,
    },
    {
      id: 7,
      number: '203',
      type: 'Đơn',
      price: '290,000',
      status: 'Trống',
      capacity: 1,
    },
    {
      id: 8,
      number: '204',
      type: 'Đôi',
      price: '400,000',
      status: 'Đã đặt',
      capacity: 2,
    },
    {
      id: 9,
      number: '301',
      type: 'Đôi 2 giường',
      price: '420,000',
      status: 'Trống',
      capacity: 2,
    },
    {
      id: 10,
      number: '302',
      type: '3 người',
      price: '500,000',
      status: 'Trống',
      capacity: 3,
    },
    {
      id: 11,
      number: '303',
      type: 'Gia đình',
      price: '700,000',
      status: 'Đã đặt',
      capacity: 4,
    },
    {
      id: 12,
      number: '304',
      type: 'Đơn',
      price: '290,000',
      status: 'Trống',
      capacity: 1,
    },
    {
      id: 13,
      number: '401',
      type: 'Đôi',
      price: '400,000',
      status: 'Trống',
      capacity: 2,
    },
    {
      id: 14,
      number: '402',
      type: 'Đôi 2 giường',
      price: '420,000',
      status: 'Đã đặt',
      capacity: 2,
    },
    {
      id: 15,
      number: '403',
      type: '3 người',
      price: '500,000',
      status: 'Trống',
      capacity: 3,
    },
    {
      id: 16,
      number: '404',
      type: 'Gia đình',
      price: '700,000',
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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
   
      const newRoom = {
        id: rooms.length + 1,
        ...data,
        status: 'available',
      };
      setRooms([...rooms, newRoom]);
      setSnackbar({ open: true, message: 'Thêm phòng thành công!', severity: 'success' });
      handleClose();
    } catch (error) {
      setError('Có lỗi xảy ra khi thêm phòng');
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
            sx={{ minWidth: 200 }}
          />
          <FormControl size='small' sx={{ minWidth: 150 }}>
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
                <TableCell>{room.price}</TableCell>
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
          />
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {formData.id ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Số phòng'
                name='number'
                value={formData.number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
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
