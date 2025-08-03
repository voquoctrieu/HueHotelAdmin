import { Routes, Route, Navigate } from 'react-router-dom';
import RoomManagement from './admin/RoomManagement';
import PromotionManagement from './admin/PromotionManagement';
import UserManagement from './admin/UserManagement';
import CustomerManagement from './admin/CustomerManagement';
import BookingManagement from './admin/BookingManagement';




const Admin = () => {

  return (
    <Routes>
      <Route index element={<Navigate to='users' replace />} />
      <Route path='users' element={<UserManagement />} />
      <Route path='rooms' element={<RoomManagement />} />
      <Route path='promotions' element={<PromotionManagement />} />
      <Route path='customers' element={<CustomerManagement />} />
      <Route path='bookings' element={<BookingManagement />} />
    </Routes>
  );
};

export default Admin;
