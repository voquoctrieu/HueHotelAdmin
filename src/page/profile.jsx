import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Alert,
  Snackbar,
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon, Lock as LockIcon } from '@mui/icons-material';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [profileData, setProfileData] = useState({
    fullName: 'Võ Quốc Triệu',
    email: '22T1020774@husc.edu.vn',
    phone: '0702679156',
    address: '25 Trung Đông, phường Phú Thượng, thành phố Huế',
    position: 'Nhân viên lễ tân',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    setPasswordError('');
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      // Xử lý logic cập nhật thông tin
      console.log('Cập nhật thông tin:', data);
      setSnackbar({ open: true, message: 'Cập nhật thông tin thành công!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi cập nhật thông tin', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (data) => {
    try {
      setLoading(true);
      // Gọi API đổi mật khẩu
      console.log('Đổi mật khẩu:', data);
      setSnackbar({ open: true, message: 'Đổi mật khẩu thành công!', severity: 'success' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordError('');
    } catch (error) {
      setPasswordError('Có lỗi xảy ra khi đổi mật khẩu');
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi đổi mật khẩu', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant='h4' gutterBottom>
          Thông tin cá nhân
        </Typography>
        
        <Paper sx={{ p: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Thông tin cá nhân" />
            <Tab label="Đổi mật khẩu" icon={<LockIcon />} iconPosition="start" />
          </Tabs>

          {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  margin: '0 auto',
                  mb: 2,
                }}
              />
              <Button
                variant='outlined'
                startIcon={<PhotoCameraIcon />}
                sx={{ mt: 2 }}
              >
                Thay đổi ảnh
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box component='form' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Họ và tên'
                      name='fullName'
                      value={profileData.fullName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Email'
                      name='email'
                      type='email'
                      value={profileData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Số điện thoại'
                      name='phone'
                      value={profileData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Địa chỉ'
                      name='address'
                      value={profileData.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Chức vụ'
                      name='position'
                      value={profileData.position}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      sx={{ mt: 2 }}
                    >
                      Cập nhật thông tin
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          )}

          {activeTab === 1 && (
            <Box component='form' onSubmit={handlePasswordSubmit} sx={{ maxWidth: 500 }}>
              <Typography variant='h6' gutterBottom>
                Đổi mật khẩu
              </Typography>
              
              {passwordError && (
                <Alert severity='error' sx={{ mb: 2 }}>
                  {passwordError}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Mật khẩu hiện tại'
                    name='currentPassword'
                    type='password'
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Mật khẩu mới'
                    name='newPassword'
                    type='password'
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    helperText='Mật khẩu phải có ít nhất 6 ký tự'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Xác nhận mật khẩu mới'
                    name='confirmPassword'
                    type='password'
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    sx={{ mt: 2 }}
                  >
                    Đổi mật khẩu
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>

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
    </Container>
  );
};

export default Profile;
