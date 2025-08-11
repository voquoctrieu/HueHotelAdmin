import { useState } from 'react';
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

const Accounting = () => {
  const [timeRange, setTimeRange] = useState('month');

 
  const revenueData = [
    { name: '01/08', revenue: 1500000, expense: 500000 },
    { name: '02/08', revenue: 1800000, expense: 550000 },
    { name: '03/08', revenue: 1200000, expense: 480000 },
    { name: '04/08', revenue: 2100000, expense: 600000 },
    { name: '05/08', revenue: 2500000, expense: 650000 },
    { name: '06/08', revenue: 2800000, expense: 700000 },
    { name: '07/08', revenue: 3000000, expense: 750000 },
  ];


  const expenses = [
    {
      id: 'CT001',
      date: '07/08/2025',
      category: 'Tiền lương',
      description: 'Lương nhân viên tháng 8',
      amount: 2500000,
      status: 'Đã thanh toán',
    },
    {
      id: 'CT002',
      date: '07/08/2025',
      category: 'Tiện ích',
      description: 'Hóa đơn điện nước tháng 8',
      amount: 350000,
      status: 'Chờ thanh toán',
    },
    {
      id: 'CT003',
      date: '06/08/2025',
      category: 'Bảo trì',
      description: 'Sửa chữa hệ thống điều hòa',
      amount: 180000,
      status: 'Đã thanh toán',
    },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const handleExportReport = () => {
    
    const totalRevenue = revenueData.reduce(
      (sum, item) => sum + item.revenue,
      0
    );
    const totalExpense = revenueData.reduce(
      (sum, item) => sum + item.expense,
      0
    );
    const netIncome = totalRevenue - totalExpense;
    const profitMargin = (netIncome / totalRevenue) * 100;


    const expensesByCategory = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});

   
    const reportData = {
      timeRange,
      summary: {
        totalRevenue: formatCurrency(totalRevenue),
        totalExpense: formatCurrency(totalExpense),
        netIncome: formatCurrency(netIncome),
        profitMargin: profitMargin.toFixed(2) + '%',
      },
      revenue: {
        data: revenueData.map((item) => ({
          ...item,
          revenue: formatCurrency(item.revenue),
          expense: formatCurrency(item.expense),
        })),
        total: formatCurrency(totalRevenue),
      },
      expense: {
        data: revenueData.map((item) => ({
          ...item,
          revenue: formatCurrency(item.revenue),
          expense: formatCurrency(item.expense),
        })),
        total: formatCurrency(totalExpense),
      },
      expenses: expenses.map((expense) => ({
        ...expense,
        amount: formatCurrency(expense.amount),
      })),
      expensesByCategory: Object.entries(expensesByCategory).map(
        ([category, amount]) => ({
          category,
          amount: formatCurrency(amount),
        })
      ),
    };

   
    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = `bao-cao-ke-toan-${timestamp}.json`;

    
    const jsonString = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

   
    document.body.appendChild(link);
    link.click();

   
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 3 }}>
        Kế toán
      </Typography>

      <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
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
              <Typography variant='h6'>
                Thống kê doanh thu và chi tiêu
              </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Thời gian</InputLabel>
                <Select
                  value={timeRange}
                  label='Thời gian'
                  onChange={(e) => setTimeRange(e.target.value)}
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
                  <Line
                    type='monotone'
                    dataKey='expense'
                    name='Chi tiêu'
                    stroke='#dc3545'
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
              <Typography variant='h6'>Danh sách chi tiêu</Typography>
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
                    <TableCell>Mã chi tiêu</TableCell>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Danh mục</TableCell>
                    <TableCell>Mô tả</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell align='right'>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.id}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>
                        <Chip
                          label={expense.status}
                          color={
                            expense.status === 'Đã thanh toán'
                              ? 'success'
                              : 'warning'
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
                            textTransform: 'none',
                            minWidth: 80,
                          }}
                        >
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Accounting;
