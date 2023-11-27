import React, { useEffect, useState } from 'react'
import MyContext from './MyContext.jsx'
import {fireDB} from "../../firebase/firebaseConfig.jsx"
import {toast} from "react-toastify"
import { QuerySnapshot, getDocs ,Timestamp, addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore"
import { data } from 'autoprefixer'


const MyState = (props) => {
  const [mode, setMode] = useState("light")

  const toggleMode = () => {
    if(mode === "light"){
    setMode("dark")
    document.body.style.backgroundColor = "black"
    document.body.style.color = "#ffffff"
    }else{
    setMode("light")
    document.body.style.backgroundColor = "#ffffff"
    document.body.style.color = "black"
    }
  }

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }
    )
  })

  const addProducts = async() => {
    
    if(products.title===null || products.price===null || products.imageUrl===null || products.category===null || products.description===null) {
      return toast.error("All fields are required!", {autoClose: 2000})
    }
    setLoading(true)
    try{
      
      const productRef = collection(fireDB, "products")
      

      await addDoc(productRef, products)
      toast.success("Product added successfully! redirecting you",{autoClose: 1000})
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 2000);
      getProductData()
      setLoading(false)
      

    }catch(err){
      console.log(err)
      setLoading(false)
    }

  }

  //products 
  const [productList, setProductList] = useState([])

  const getProductData = async() => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time")
        )

        const data = onSnapshot(q, (QuerySnapshot) => {
          let productArray = []
          QuerySnapshot.forEach((doc) => {
            productArray.push({...doc.data(), id: doc.id})
          })
          setProductList(productArray)
          setLoading(false)
        })

        return () => data
        
    }catch(err){
      console.log(err);
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData()
    getOrderData()
    getUserData()
  })

  
  const editHandle = (item) => {
    setProducts(item)
  }

  const updateProduct = async() => {
    setLoading(true)
    try{
      const docRef = doc(fireDB, "products", products.id)
      await setDoc(docRef, products)
      toast.success("Item updated successfully", {autoClose: 1000})
      getProductData()
      setLoading(false)
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 2000)
      
    }catch(err) {
      console.log(err)
      setLoading(false)
    }
  }

  const deleteProduct = async(item) =>{
    setLoading(true)
    try {
        const docRef = doc(fireDB, "products", item.id)
        await deleteDoc(docRef)
        toast.success("Item removed successfully", {autoClose: 1000})
        getProductData()
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 2000)
        
    }catch(err) {
      toast.error("Process terminated", {autoClose: 2000})
      console.log(err)
    }
  }

  const [order, setOrder] = useState([])
  const getOrderData = async() => {
    
    try{
      const res = await getDocs(collection(fireDB, "orders"))
      let arr = []
      res.forEach((doc) => {
        arr.push(doc.data())
      })
      setOrder(arr)
    }catch(err) {
      console.log(err)
      
    }
  }

  const [user, setUser] = useState([])
  const getUserData = async() => {
    try {
      const res = await getDocs(collection(fireDB, "users"))
      let arr = []
      res.forEach((doc) => {
        
        arr.push(doc.data())
        
      })
      setUser(arr)
      console.log(user)
    }catch(err){
      console.log(err)
    }
  }

  const [searchKey, setSearchKey] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterPrice, setFilterPrice] = useState("")

  return (
    <MyContext.Provider value={
      {mode, toggleMode, loading,
         setLoading, products, setProducts, addProducts, productList, editHandle, updateProduct, deleteProduct,
         order, user, searchKey, setSearchKey, filterCategory, setFilterCategory, filterPrice, setFilterPrice
        }
      }>
        {props.children}
    </MyContext.Provider>
  )
}

export default MyState