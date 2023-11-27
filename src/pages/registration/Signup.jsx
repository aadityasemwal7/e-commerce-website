import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import MyContext from '../../context/data/MyContext'
import { toast } from 'react-toastify'
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth, fireDB} from "../../firebase/firebaseConfig"
import { addDoc, collection } from 'firebase/firestore'
import Loader from '../../components/loader/Loader'

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const context = useContext(MyContext)
    const {loading, setLoading} = context

    const handleSignUp = async() =>{
        setLoading(true)
        if(name === "" || email === "" || password === ""){
            toast.error("All fields are required!", {autoClose: 2000, position: "top-center"});
        }
        try{
            const users = await createUserWithEmailAndPassword(auth, email, password)

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
            }

            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user)
            toast.success("Sign-up Completed 👍", {autoClose: 2000, position: "top-center"})
            setName("")
            setEmail("")
            setPassword("")
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
        }

    }

    return (
    <div className="flex justify-center items-center h-screen">
        {loading && <Loader />}
        <div className="p-10 rounded-xl border-2 border-gray-600 bg-gray-500">
            <div className="m-2 text-center">
                <h1 className='font-extrabold text-3xl'>Signup</h1>
            </div>
            <div className='my-5'>
                <input 
                className='p-2 rounded-lg w-full'
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='my-5'>
                <input 
                className='p-2 rounded-lg w-full'
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='my-5'>
                <input
                className='p-2 rounded-lg w-full' 
                placeholder="Password"
                type="password"
                value={password}   
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="my-6 text-center">
                <button onClick={handleSignUp} className='rounded-lg w-full font-extrabold text-white bg-red-700 p-2'>signup</button>
            </div>
            <div className='text-center text-lg'>
                <h2>Already have an account? <Link className='text-yellow-300' to={"/login"}>Login</Link></h2>
            </div>
        </div>
    </div>
  )
}

export default Signup