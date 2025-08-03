import { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FileDownload as FileDownloadIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';

const Statistics = () => {
  // Dữ liệu mẫu cho danh sách hóa đơn theo từng khoảng thời gian
  const getInvoices = (range) => {
    switch (range) {
      case 'week':
        return [
          {
            id: 'HD001',
            date: '07/08/2024',
            customer: 'Nguyễn Văn A',
            room: 'Gia đình 101',
            amount: 700000,
            status: 'Đã thanh toán',
          },
          {
            id: 'HD002',
            date: '07/08/2024',
            customer: 'Trần Thị B',
            room: 'Đôi 201',
            amount: 400000,
            status: 'Chờ thanh toán',
          },
          {
            id: 'HD003',
            date: '06/08/2024',
            customer: 'Lê Văn C',
            room: '3 người 301',
            amount: 500000,
            status: 'Đã thanh toán',
          },
        ];
      case 'month':
        return [
          {
            id: 'HD001',
            date: '25/08/2024',
            customer: 'Nguyễn Văn A',
            room: 'Gia đình 101',
            amount: 2100000,
            status: 'Đã thanh toán',
          },
          {
            id: 'HD002',
            date: '18/08/2024',
            customer: 'Trần Thị B',
            room: 'Đôi 201',
            amount: 1200000,
            status: 'Đã thanh toán',
          },
          {
            id: 'HD003',
            date: '10/08/2024',
            customer: 'Lê Văn C',
            room: '3 người 301',
            amount: 1500000,
            status: 'Đã thanh toán',
          },
        ];
      case 'quarter':
        return [
          {
            id: 'HD001',
            date: '15/08/2024',
            customer: 'Nguyễn Văn A',
            room: 'Gia đình 101',
            amount: 6300000,
            status: 'Đã thanh toán',
          },
          {
            id: 'HD002',
            date: '15/07/2024',
            customer: 'Trần Thị B',
            room: 'Đôi 201',
            amount: 5600000,
            status: 'Đã thanh toán',
          },
          {
            id: 'HD003',
            date: '15/06/2024',
            customer: 'Lê Văn C',
            room: '3 người 301',
            amount: 7500000,
            status: 'Đã thanh toán',
          },
        ];
      case 'year':
        return [
          {
            id: 'HD001',
            date: 'Q4/2024',
            customer: 'Nguyễn Văn A',
            room: 'Gia đình 101',
            amount: 25200000,
            status: 'Đã thanh toán',
          },
          {
            id: 'HD002',
            date: 'Q3/2024',
            customer: 'Trần Thị B',
            room: 'Đôi 201',
            amount: 22000000,
            status: 'Đã thanh toán',
          },
          {
            id: 'HD003',
            date: 'Q2/2024',
            customer: 'Lê Văn C',
            room: '3 người 301',
            amount: 24000000,
            status: 'Đã thanh toán',
          },
        ];
      default:
        return [];
    }
  };

  const [timeRange, setTimeRange] = useState('week');
  const [confirmDelete, setConfirmDelete] = useState({ open: false, invoiceId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [invoiceList, setInvoiceList] = useState([]);

  // Cập nhật danh sách hóa đơn khi thay đổi khoảng thời gian
  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
  };

  // Cập nhật dữ liệu khi timeRange thay đổi
  useEffect(() => {
    setInvoiceList(getInvoices(timeRange));
  }, [timeRange]);

  // Dữ liệu mẫu cho biểu đồ theo từng khoảng thời gian
  const getRevenueData = (range) => {
    switch (range) {
      case 'week':
        return [
          { name: '01/08', revenue: 1500000 },
          { name: '02/08', revenue: 1800000 },
          { name: '03/08', revenue: 1200000 },
          { name: '04/08', revenue: 2100000 },
          { name: '05/08', revenue: 2500000 },
          { name: '06/08', revenue: 2800000 },
          { name: '07/08', revenue: 3000000 },
        ];
      case 'month':
        return [
          { name: 'Tuần 1', revenue: 8500000 },
          { name: 'Tuần 2', revenue: 9200000 },
          { name: 'Tuần 3', revenue: 7800000 },
          { name: 'Tuần 4', revenue: 9500000 },
        ];
      case 'quarter':
        return [
          { name: 'Tháng 6', revenue: 32000000 },
          { name: 'Tháng 7', revenue: 28000000 },
          { name: 'Tháng 8', revenue: 35000000 },
        ];
      case 'year':
        return [
          { name: 'Q1', revenue: 95000000 },
          { name: 'Q2', revenue: 120000000 },
          { name: 'Q3', revenue: 110000000 },
          { name: 'Q4', revenue: 135000000 },
        ];
      default:
        return [];
    }
  };

  const revenueData = getRevenueData(timeRange);

  // Tính toán thống kê tổng quan
  const getStatistics = (range) => {
    const data = getRevenueData(range);
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const avgRevenue = totalRevenue / data.length;
    const maxRevenue = Math.max(...data.map(item => item.revenue));
    const minRevenue = Math.min(...data.map(item => item.revenue));
    
    return {
      totalRevenue,
      avgRevenue,
      maxRevenue,
      minRevenue,
      dataPoints: data.length
    };
  };

  const currentStats = getStatistics(timeRange);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const handleExportReport = () => {
    // Tạo dữ liệu để xuất
    const reportData = {
      timeRange,
      statistics: {
        totalRevenue: formatCurrency(currentStats.totalRevenue),
        avgRevenue: formatCurrency(currentStats.avgRevenue),
        maxRevenue: formatCurrency(currentStats.maxRevenue),
        minRevenue: formatCurrency(currentStats.minRevenue),
      },
      revenue: {
        data: revenueData,
        total: formatCurrency(currentStats.totalRevenue),
      },
      invoices: invoiceList.map((invoice) => ({
        ...invoice,
        amount: formatCurrency(invoice.amount),
      })),
    };

    // Tạo tên file với timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = `bao-cao-doanh-thu-${timestamp}.json`;

    // Tạo và tải file
    const jsonString = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = (id) => {
    setInvoiceList(invoiceList.filter((invoice) => invoice.id !== id));
    setConfirmDelete({ open: false, invoiceId: null });
    setSnackbar({ open: true, message: 'Xóa hóa đơn thành công!', severity: 'success' });
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 3 }}>
        Thống kê
      </Typography>

      <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
        {/* Thống kê tổng quan */}
        <Grid item xs={12} sx={{ p: 0 }}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#e3f2fd' }}>
                <Typography variant="h6" color="primary">
                  Tổng doanh thu
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {formatCurrency(currentStats.totalRevenue)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#f3e5f5' }}>
                <Typography variant="h6" color="secondary">
                  Trung bình
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {formatCurrency(currentStats.avgRevenue)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#e8f5e8' }}>
                <Typography variant="h6" color="success.main">
                  Cao nhất
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {formatCurrency(currentStats.maxRevenue)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff3e0' }}>
                <Typography variant="h6" color="warning.main">
                  Thấp nhất
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {formatCurrency(currentStats.minRevenue)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ p: 0 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant='h6'>Thống kê doanh thu</Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Thời gian</InputLabel>
                <Select
                  value={timeRange}
                  label='Thời gian'
                  onChange={(e) => handleTimeRangeChange(e.target.value)}
                  size='small'
                >
                  <MenuItem value='week'>7 ngày qua</MenuItem>
                  <MenuItem value='month'>Tháng này</MenuItem>
                  <MenuItem value='quarter'>Quý này</MenuItem>
                  <MenuItem value='year'>Năm nay</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <LineChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis
                    tickFormatter={(value) =>
                      new Intl.NumberFormat('vi-VN', {
                        notation: 'compact',
                        compactDisplay: 'short',
                      }).format(value)
                    }
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(label) => `Ngày: ${label}`}
                  />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='revenue'
                    name='Doanh thu'
                    stroke='#1976d2'
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ p: 0 }}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant='h6'>Danh sách hóa đơn</Typography>
              <Button
                variant='contained'
                onClick={handleExportReport}
                startIcon={<FileDownloadIcon />}
                sx={{
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Xuất báo cáo
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã hóa đơn</TableCell>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell>Phòng</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell align='right'>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceList.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell>{invoice.room}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status}
                          color={invoice.status === 'Đã thanh toán' ? 'success' : 'warning'}
                          size='small'
                          sx={{ minWidth: 100 }}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <Button
                          variant='outlined'
                          size='small'
                          sx={{
                            textTransform: 'none',
                            minWidth: 80,
                            mr: 1,
                          }}
                        >
                          Chi tiết
                        </Button>
                        <IconButton color='error' onClick={() => setConfirmDelete({ open: true, invoiceId: invoice.id })}>
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
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, invoiceId: null })}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn có chắc muốn xóa hóa đơn này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, invoiceId: null })}>Hủy</Button>
          <Button color="error" onClick={() => handleDelete(confirmDelete.invoiceId)}>Xóa</Button>
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

export default Statistics;
