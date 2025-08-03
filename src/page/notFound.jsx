import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SentimentDissatisfied as SadIcon } from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <SadIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
        <Typography variant='h1' component='h1' gutterBottom>
          404
        </Typography>
        <Typography variant='h4' component='h2' gutterBottom>
          Trang không tồn tại
        </Typography>
        <Typography variant='body1' color='text.secondary' paragraph>
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Quay về trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
