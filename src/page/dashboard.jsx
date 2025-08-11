import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Skeleton,
} from '@mui/material';
import {
  Hotel as HotelIcon,
  CheckCircle as CheckCircleIcon,
  Event as EventIcon,
  AttachMoney as AttachMoneyIcon,
  Person as PersonIcon,
  Room as RoomIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useState, useEffect } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    totalRooms: 50,
    occupiedRooms: 35,
    todayBookings: 12,
    monthlyRevenue: 14900000, // Đồng bộ với Statistics (7 ngày qua)
  };

  const revenueData = [
    { month: '01/08', revenue: 1500000 },
    { month: '02/08', revenue: 1800000 },
    { month: '03/08', revenue: 1200000 },
    { month: '04/08', revenue: 2100000 },
    { month: '05/08', revenue: 2500000 },
    { month: '06/08', revenue: 2800000 },
    { month: '07/08', revenue: 3000000 },
  ];

  const roomUsageData = [
    { name: 'Đang sử dụng', value: 35 },
    { name: 'Trống', value: 15 },
  ];

  const recentActivities = [
    {
      title: 'Đặt phòng mới',
      description: 'Khách hàng Nguyễn Văn A đặt phòng 201',
      time: '2 phút trước',
      icon: <PersonIcon />,
      color: '#1976d2',
    },
    {
      title: 'Check-in',
      description: 'Khách hàng Trần Thị B đã check-in phòng 305',
      time: '15 phút trước',
      icon: <RoomIcon />,
      color: '#2e7d32',
    },
    {
      title: 'Thanh toán',
      description: 'Hoàn thành thanh toán cho phòng 102',
      time: '1 giờ trước',
      icon: <PaymentIcon />,
      color: '#ed6c02',
    },
    {
      title: 'Check-out',
      description: 'Khách hàng Lê Văn C đã check-out phòng 208',
      time: '2 giờ trước',
      icon: <RoomIcon />,
      color: '#d32f2f',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width={80} height={40} />
                  </Box>
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Tổng phòng
                    </Typography>
                    <Typography variant="h4">{stats.totalRooms}</Typography>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: 'primary.main', 
                    borderRadius: '50%', 
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <HotelIcon sx={{ color: 'white' }} />
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="text" width={80} height={40} />
                  </Box>
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Phòng đang sử dụng
                    </Typography>
                    <Typography variant="h4">{stats.occupiedRooms}</Typography>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: 'success.main', 
                    borderRadius: '50%', 
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CheckCircleIcon sx={{ color: 'white' }} />
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Skeleton variant="text" width={110} height={20} />
                    <Skeleton variant="text" width={80} height={40} />
                  </Box>
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Đặt phòng hôm nay
                    </Typography>
                    <Typography variant="h4">{stats.todayBookings}</Typography>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: 'warning.main', 
                    borderRadius: '50%', 
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <EventIcon sx={{ color: 'white' }} />
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width={120} height={40} />
                  </Box>
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Doanh thu 7 ngày qua
                    </Typography>
                    <Typography variant="h4">{stats.monthlyRevenue.toLocaleString()}đ</Typography>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: 'error.main', 
                    borderRadius: '50%', 
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <AttachMoneyIcon sx={{ color: 'white' }} />
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Doanh thu 7 ngày qua
              </Typography>
              <Box sx={{ height: 300, width: '100%' }}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={300} />
                ) : (
                  <ResponsiveContainer>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                        domain={[0, 'dataMax + 1000000']}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()}đ`, 'Doanh thu']}
                        labelFormatter={(label) => `Tháng ${label}`}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tỷ lệ sử dụng phòng
              </Typography>
              <Box sx={{ height: 300, width: '100%' }}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={300} />
                ) : (
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={roomUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {roomUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Hoạt động gần đây
          </Typography>
          {loading ? (
            <List>
              {[1, 2, 3, 4].map((item) => (
                <ListItem key={item} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Skeleton variant="circular" width={32} height={32} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Skeleton variant="text" width={200} />}
                    secondary={<Skeleton variant="text" width={150} />}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: activity.color, width: 32, height: 32 }}>
                      {activity.icon}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.title}
                    secondary={
                      <span>
                        <Typography component="span" color="text.secondary">
                          {activity.description}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary" component="span">
                          {activity.time}
                        </Typography>
                      </span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
