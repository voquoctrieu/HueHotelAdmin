import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Hotel as HotelIcon,
  AccountBalance as AccountBalanceIcon,
  Receipt as ReceiptIcon,
  BarChart as BarChartIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
  LocalOffer as LocalOfferIcon,
  AccountCircle,
  Logout,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NotificationSystem from '../components/NotificationSystem';

const drawerWidth = 240;

const menuItems = [
  { text: 'Tổng quan', icon: <DashboardIcon />, path: '/dashboard' },
  {
    text: 'Quản trị',
    icon: <PeopleIcon />,
    path: '/admin',
    subItems: [
      { text: 'Quản lý người dùng', path: '/admin/users' },
      { text: 'Quản lý phòng', path: '/admin/rooms' },
      { text: 'Quản lý ưu đãi', path: '/admin/promotions' },
      { text: 'Quản lý khách hàng', path: '/admin/customers' },
      { text: 'Quản lý đặt phòng', path: '/admin/bookings' },
    ],
  },
  { text: 'Check-in/Check-out', icon: <ReceiptIcon />, path: '/check-in-out' },
  { text: 'Kế toán', icon: <AccountBalanceIcon />, path: '/accountant' },
  { text: 'Lễ tân', icon: <PersonIcon />, path: '/receptionist' },
  { text: 'Thống kê', icon: <BarChartIcon />, path: '/statistics' },
];

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const handleSubMenuClick = (text) => {
    setOpenSubMenu({
      ...openSubMenu,
      [text]: !openSubMenu[text],
    });
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          Hue Hotel Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <div key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  if (item.subItems) {
                    handleSubMenuClick(item.text);
                  } else {
                    navigate(item.path);
                    if (isMobile) {
                      setMobileOpen(false);
                    }
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subItems &&
                  (openSubMenu[item.text] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.subItems && (
              <Collapse
                in={openSubMenu[item.text]}
                timeout='auto'
                unmountOnExit
              >
                <List component='div' disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      sx={{ pl: 4 }}
                      selected={location.pathname === subItem.path}
                      onClick={() => navigate(subItem.path)}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationSystem />
            <Typography variant='body2' sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user?.name}
            </Typography>
            <IconButton color='inherit' onClick={() => navigate('/profile')}>
              <AccountCircle />
            </IconButton>
            <IconButton color='inherit' onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
