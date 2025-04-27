import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Deshboard from './components/Deshboard';
import UserLogin from './pages/UserLogin';
import Navbar from './components/Navbar';
import UserRegistration from './pages/UserRegistation';
import AddtoCart from './UserComponent/AddtoCart';
import ShowProduct from './UserComponent/ShowProduct';
import ShowCetegory from './UserComponent/ShowCetegory';
import ShowSubCetegory from './UserComponent/ShowSubCetegory';
import AddProduct from './AdminComponent/AddProduct';
import Category from './AdminComponent/Category';
import SubCategory from './AdminComponent/SubCategory';
import ProtectedRoute from './routes/ProtectedRoute';
import UserProfile from './pages/UserProfile';
import UserUpdate from './pages/UserUpdate';
import EmailVarify from './pages/EmailVarify';
import AddressForm from './pages/AddressForm';
import AdminComponent from './AdminComponent/AdminProfile';
import Footer from './components/Footer';
import CategoryByProduct from './UserComponent/CategoryByProduct';
import ShowCart from './UserComponent/ShowCart';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route exact path="/" element={<Deshboard />} />
        <Route exact path="/login" element={<UserLogin />} />
        <Route  path="/register" element={<UserRegistration />} />
        <Route path="/verifyemail" element={<EmailVarify />} />


        {/* User Routes */}
        <Route
          path="/addtocard"
          element={
            <ProtectedRoute role="USER">
              <AddtoCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/showproduct"
          element={
            <ProtectedRoute role="USER">
              <ShowProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <ProtectedRoute role={["ADMIN", "USER"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
         <Route
          path="/updateprofile"
          element={
            <ProtectedRoute role={["ADMIN", "USER"]}>
              <UserUpdate />
            </ProtectedRoute>
          }
        />
          <Route
          path="/updateaddress"
          element={
            <ProtectedRoute role={["ADMIN", "USER"]}>
              <AddressForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/showcategory"
          element={
            <ProtectedRoute role="USER">
              <ShowCetegory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/showsubcetegory"
          element={
            <ProtectedRoute role="USER">
              <ShowSubCetegory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/showcategory/:id"
          element={
            <ProtectedRoute role="USER">
              <CategoryByProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/showcart"
          element={
            <ProtectedRoute role="USER">
              <ShowCart />
            </ProtectedRoute>
          }
        />


        {/* Admin Routes */}
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute role="ADMIN">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addcetegory"
          element={
            <ProtectedRoute role="ADMIN">
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addsubcategory"
          element={
            <ProtectedRoute role="ADMIN">
              <SubCategory />
            </ProtectedRoute>
          }
        />
        
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
