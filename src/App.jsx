import React from "react"
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Order from "./pages/Order"
import Cart from "./pages/Cart"
import DashBoard from "./pages/admin/DashBoard"
import NoPage from "./pages/NoPage"
import MyState from "./context/data/MyState"
import './App.css'
import AllProducts from "./pages/AllProducts"
import Login from "../src/pages/registration/Login"
import Signup from "../src/pages/registration/Signup"
import ProductInfo from "./pages/productInfo/ProductInfo"
import AddProduct from "./pages/admin/pages/AddProduct"
import UpdateProduct from "./pages/admin/pages/UpdateProduct"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/order" element={
          <ProtectedRouteForUser>
            <Order />
          </ProtectedRouteForUser>
        } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<DashBoard />}/>
        <Route path="/allproducts" element={<AllProducts />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/productinfo/:id" element={<ProductInfo/>} />
        <Route path="/addproduct" element={
          <ProtectedRouteForUser>
            <AddProduct />
          </ProtectedRouteForUser>
        }/>
        <Route path="/updateproduct" element={
          <ProtectedRouteForUser>
            <UpdateProduct />
          </ProtectedRouteForUser>
        }/>
        <Route path="/*" element={<NoPage />} />
      </Routes>
      <ToastContainer/>
    </Router>
    </MyState>
    
  )
}

export const ProtectedRouteForUser = ({children}) => {
  const user = localStorage.getItem("user")
  if(user){
    return children
  }else{
    return <Navigate to={"/login"}/>
  }
}

export const ProtectedRouteForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem("user"))
  const adminMailId = "spidey12@gmail.com"

  if(admin.user.email === adminMailId){
    return children
  }else{
    return <Navigate to={"/login"}/>
  }

  }

export default App