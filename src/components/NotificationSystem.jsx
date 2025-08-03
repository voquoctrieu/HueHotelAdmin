import { useState, useEffect } from 'react';
import {
  Box,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Hotel as BookingIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'Đặt phòng mới',
      message: 'Khách hàng Nguyễn Văn D vừa đặt phòng Gia đình 105',
      time: '2 phút trước',
      read: false,
      priority: 'high',
    },
    {
      id: 2,
      type: 'checkin',
      title: 'Yêu cầu check-in sớm',
      message: 'Khách hàng Trần Thị E yêu cầu check-in sớm lúc 10h sáng',
      time: '15 phút trước',
      read: false,
      priority: 'medium',
    },
    {
      id: 3,
      type: 'maintenance',
      title: 'Phòng cần dọn dẹp',
      message: 'Phòng 205 cần dọn dẹp sau check-out',
      time: '1 giờ trước',
      read: true,
      priority: 'low',
    },
    {
      id: 4,
      type: 'payment',
      title: 'Thanh toán thành công',
      message: 'Khách hàng Lê Văn F đã thanh toán hóa đơn HD004',
      time: '2 giờ trước',
      read: true,
      priority: 'medium',
    },
    {
      id: 5,
      type: 'system',
      title: 'Hệ thống bảo trì',
      message: 'Hệ thống sẽ bảo trì từ 2h-4h sáng ngày mai',
      time: '3 giờ trước',
      read: false,
      priority: 'high',
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Cập nhật số thông báo chưa đọc
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Mô phỏng thông báo real-time
  useEffect(() => {
    const interval = setInterval(() => {
      // Tạo thông báo mới ngẫu nhiên (chỉ để demo)
      const randomNotifications = [
        {
          type: 'booking',
          title: 'Đặt phòng mới',
          message: 'Có đặt phòng mới từ khách hàng',
          priority: 'high',
        },
        {
          type: 'checkin',
          title: 'Check-in thành công',
          message: 'Khách hàng đã check-in thành công',
          priority: 'medium',
        },
        {
          type: 'payment',
          title: 'Thanh toán mới',
          message: 'Có thanh toán mới được thực hiện',
          priority: 'medium',
        },
      ];

      // Chỉ tạo thông báo mới 10% thời gian (để không spam)
      if (Math.random() < 0.1) {
        const randomNotif = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        const newNotification = {
          id: Date.now(),
          ...randomNotif,
          time: 'Vừa xong',
          read: false,
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Giữ tối đa 10 thông báo
      }
    }, 30000); // Kiểm tra mỗi 30 giây

    return () => clearInterval(interval);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking':
        return <BookingIcon color="primary" />;
      case 'checkin':
        return <CheckCircleIcon color="success" />;
      case 'maintenance':
        return <WarningIcon color="warning" />;
      case 'payment':
        return <InfoIcon color="info" />;
      case 'system':
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatTime = (timeString) => {
    if (timeString === 'Vừa xong') return timeString;
    
    // Xử lý thời gian tương đối
    const timeMap = {
      '2 phút trước': '2m',
      '15 phút trước': '15m',
      '1 giờ trước': '1h',
      '2 giờ trước': '2h',
      '3 giờ trước': '3h',
    };
    
    return timeMap[timeString] || timeString;
  };

  return (
    <Box>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{ position: 'relative' }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 500,
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Thông báo</Typography>
            <Box>
              {unreadCount > 0 && (
                <Button size="small" onClick={handleMarkAllAsRead}>
                  Đánh dấu đã đọc
                </Button>
              )}
              <Button size="small" onClick={handleClearAll} color="error">
                Xóa tất cả
              </Button>
            </Box>
          </Box>
        </Box>

        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <NotificationsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Không có thông báo nào
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((notification, index) => (
              <Box key={notification.id}>
                <ListItem
                  button
                  onClick={() => handleNotificationClick(notification.id)}
                  sx={{
                    backgroundColor: notification.read ? 'transparent' : 'action.hover',
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    },
                  }}
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body2"
                          fontWeight={notification.read ? 'normal' : 'bold'}
                        >
                          {notification.title}
                        </Typography>
                        <Chip
                          label={formatTime(notification.time)}
                          size="small"
                          color={getPriorityColor(notification.priority)}
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {notification.message}
                      </Typography>
                    }
                  />
                  {!notification.read && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                      }}
                    />
                  )}
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}

        {notifications.length > 0 && (
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={handleClose}
            >
              Xem tất cả thông báo
            </Button>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default NotificationSystem; 