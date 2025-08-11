import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(formData.username, formData.password);
      if (result.success) {
        // Đăng nhập thành công, navigate sẽ được xử lý trong AuthContext
      } else {
        setError(result.error || 'Đăng nhập thất bại');
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi đăng nhập');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotPasswordError('');
    
    if (!forgotPasswordEmail) {
      setForgotPasswordError('Vui lòng nhập email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordEmail)) {
      setForgotPasswordError('Email không hợp lệ');
      return;
    }
    
    // Mô phỏng gửi email reset mật khẩu
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForgotPasswordSuccess(true);
      setTimeout(() => {
        setForgotPasswordOpen(false);
        setForgotPasswordEmail('');
        setForgotPasswordSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleCloseForgotPassword = () => {
    setForgotPasswordOpen(false);
    setForgotPasswordEmail('');
    setForgotPasswordError('');
    setForgotPasswordSuccess(false);
  };

  return (
      <Box
        sx={{
        minHeight: '100vh',
        width: '100vw',
          display: 'flex',
          alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('./huecity.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        }}
      >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography component="h1" variant="h4" sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}>
              ĐĂNG NHẬP
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Hệ thống quản lý khách sạn HueHotel
          </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 1, 
                mb: 2,
                py: 1.5,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              {loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="text"
                size="small"
                onClick={() => setForgotPasswordOpen(true)}
                sx={{ 
                  textTransform: 'none',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}
              >
                Quên mật khẩu?
            </Button>
          </Box>
          </form>
        </Paper>
      </Container>
      
      <Dialog 
        open={forgotPasswordOpen} 
        onClose={handleCloseForgotPassword} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            m: { xs: 2, sm: 'auto' },
            width: { xs: 'calc(100% - 32px)', sm: 'auto' }
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          pb: 1
        }}>
          Quên mật khẩu
        </DialogTitle>
        <form onSubmit={handleForgotPassword}>
          <DialogContent sx={{ pt: 1 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Nhập email của bạn để nhận link đặt lại mật khẩu.
            </Typography>
            {forgotPasswordError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {forgotPasswordError}
              </Alert>
            )}
            {forgotPasswordSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Email đã được gửi! Vui lòng kiểm tra hộp thư của bạn.
              </Alert>
            )}
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              disabled={forgotPasswordSuccess || loading}
              sx={{ mb: 1 }}
            />
          </DialogContent>
          <DialogActions sx={{ 
            px: 3, 
            pb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1
          }}>
            <Button 
              onClick={handleCloseForgotPassword}
              fullWidth={isMobile}
              variant="outlined"
              disabled={loading}
            >
              Hủy
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              disabled={forgotPasswordSuccess || loading}
              fullWidth={isMobile}
            >
              {loading ? 'Đang gửi...' : 'Gửi email'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      </Box>
  );
};

export default Login;
