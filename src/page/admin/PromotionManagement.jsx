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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';

const PromotionManagement = () => {
  const [open, setOpen] = useState(false);
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      name: 'Khuyến mãi mùa hè',
      code: 'SUMMER2025',
      discount: '25%',
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      status: 'Đang áp dụng',
    },
    {
      id: 2,
      name: 'Ưu đãi cuối tuần',
      code: 'WEEKEND',
      discount: '15%',
      startDate: '2025-02-01',
      endDate: '2025-12-31',
      status: 'Đang áp dụng',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    discount: '',
    startDate: null,
    endDate: null,
  });

  const [confirmDelete, setConfirmDelete] = useState({ open: false, promotionId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: '',
      code: '',
      discount: '',
      startDate: null,
      endDate: null,
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

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
    
      const newPromotion = {
        id: promotions.length + 1,
        ...data,
        status: 'active',
      };
      setPromotions([...promotions, newPromotion]);
      setSnackbar({ open: true, message: 'Thêm ưu đãi thành công!', severity: 'success' });
      handleClose();
    } catch (error) {
      setError('Có lỗi xảy ra khi thêm ưu đãi');
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi thêm ưu đãi', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (promotion) => {
    setFormData({
      ...promotion,
      startDate: dayjs(promotion.startDate),
      endDate: dayjs(promotion.endDate),
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
 
    setPromotions(promotions.filter(promotion => promotion.id !== id));
    setConfirmDelete({ open: false, promotionId: null });
    setSnackbar({ open: true, message: 'Xóa ưu đãi thành công!', severity: 'success' });
  };

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch =
      promo.name.toLowerCase().includes(search.toLowerCase()) ||
      promo.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? promo.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });
  const paginatedPromotions = filteredPromotions.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageCount = Math.ceil(filteredPromotions.length / rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, gap: 2, flexWrap: 'wrap' }}>
        <Typography variant='h4'>Quản lý ưu đãi</Typography>
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
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={statusFilter}
              label='Trạng thái'
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            >
              <MenuItem value=''>Tất cả</MenuItem>
              <MenuItem value='Đang áp dụng'>Đang áp dụng</MenuItem>
              <MenuItem value='Hết hạn'>Hết hạn</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Thêm ưu đãi
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên ưu đãi</TableCell>
              <TableCell>Mã</TableCell>
              <TableCell>Giảm giá</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ngày kết thúc</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPromotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell>{promotion.name}</TableCell>
                <TableCell>{promotion.code}</TableCell>
                <TableCell>{promotion.discount}</TableCell>
                <TableCell>{promotion.startDate}</TableCell>
                <TableCell>{promotion.endDate}</TableCell>
                <TableCell>{promotion.status}</TableCell>
                <TableCell>
                  <IconButton
                    color='primary'
                    onClick={() => handleEdit(promotion)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => handleDelete(promotion.id)}
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

      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>
          {formData.id ? 'Chỉnh sửa ưu đãi' : 'Thêm ưu đãi mới'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Tên ưu đãi'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Mã ưu đãi'
                name='code'
                value={formData.code}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Giảm giá'
                name='discount'
                value={formData.discount}
                onChange={handleChange}
                placeholder='VD: 20%'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Ngày bắt đầu'
                  value={formData.startDate}
                  onChange={handleDateChange('startDate')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Ngày kết thúc'
                  value={formData.endDate}
                  onChange={handleDateChange('endDate')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} variant='contained'>
            {formData.id ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, promotionId: null })}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn có chắc muốn xóa ưu đãi này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, promotionId: null })}>Hủy</Button>
          <Button color="error" onClick={() => handleDelete(confirmDelete.promotionId)}>Xóa</Button>
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

export default PromotionManagement;
