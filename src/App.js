import React, { useContext, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Notfound from './components/Notfound/Notfound';
import { UserContext } from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Address from './components/Address/Address';
import Orders from './components/Orders/Orders';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import WishList from './components/WishList/WishList';
import WishlistContextProvider from './Context/WishlistContext';

export default function App() {

  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'))
    }

  }, [])


  let routers = createHashRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
        { path: "profile", element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: "address", element: <ProtectedRoute> <Address /> </ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute> <Orders /> </ProtectedRoute> },
        { path: "forgotpassword", element: <ForgotPassword /> },
        { path: "verifycode", element: <VerifyCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "productdetails/:id", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ])

  return (
    <CartContextProvider>
      <WishlistContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster />
      </WishlistContextProvider>
    </CartContextProvider>
  )
}
