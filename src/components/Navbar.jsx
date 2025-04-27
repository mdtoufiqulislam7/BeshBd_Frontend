import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getuserinfo, logout } from '../Redux_toolkit/User.Slice';
import { Menu, X } from 'lucide-react';
import { setCartCount } from '../Redux_toolkit/cart';
// import { useSelector } from 'react-redux'; // ✅ Add this

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, cartCount } = useSelector((state) => state.cart);
  // Memoized user from localStorage
  const user = useMemo(() => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error("Failed to parse user:", e);
      localStorage.removeItem('user');
      return null;
    }
  }, []);

    // Get the cart count from localStorage on page load
    useEffect(() => {
      const savedCartCount = localStorage.getItem('cartCount');
      if (savedCartCount) {
        // If cartCount exists in localStorage, update the Redux state
        dispatch(setCartCount(Number(savedCartCount)));
      }
    }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    
    navigate('/login');
    window.location.reload()
  };

  const handleProfileClick = async () => {
    await dispatch(getuserinfo()); // optional, if data needed before navigating
    navigate('/userprofile');
    setMenuOpen(false); // close menu on mobile
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => setMenuOpen(false);



  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <Link to="/" onClick={closeMenu} className="text-2xl font-extrabold tracking-wide text-white">
      DeshBd 🛒
    </Link>

    {/* Mobile menu toggle */}
    <div className="md:hidden">
      <button onClick={toggleMenu}>
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>
    </div>

    {/* Navigation links */}
    <div className={`md:flex items-center gap-6 ${menuOpen ? 'block mt-4' : 'hidden md:block'}`}>
      {user?.role === 'USER' && (
        <>
          <Link to="/" onClick={closeMenu} className="hover:text-gray-300 transition">Home</Link>
          <Link to="/showproduct" onClick={closeMenu} className="hover:text-gray-300 transition">Products</Link>
          <Link to="/showcategory" onClick={closeMenu} className="hover:text-gray-300 transition">Category</Link>
          <Link to="/showcart" onClick={closeMenu} className="relative hover:text-gray-300 transition"> 
            Cart 
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Link>
        </>
      )}

      {user?.role === 'ADMIN' && (
        <>
          <Link to="/addproduct" onClick={closeMenu} className="hover:text-gray-300 transition">Add Product</Link>
          <Link to="/addcetegory" onClick={closeMenu} className="hover:text-gray-300 transition">Add Category</Link>
          <Link to="/addsubcategory" onClick={closeMenu} className="hover:text-gray-300 transition">Add SubCategory</Link>
        </>
      )}

      {!user ? (
        <>
          <Link to="/login" onClick={closeMenu} className="hover:text-gray-300 transition">Login</Link>
          <Link to="/register" onClick={closeMenu} className="hover:text-gray-300 transition">Register</Link>
        </>
      ) : (
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 bg-white text-blue-600 px-4 py-1 rounded-full hover:bg-yellow-300 hover:text-black transition"
          >
            <span>{user.name}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                 className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M13 8a5 5 0 1 0-10 0 5 5 0 0 0 10 0z" />
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z" />
            </svg>
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded-full hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
</nav>
  );
};

export default Navbar;
