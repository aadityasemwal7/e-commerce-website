import {React, useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyContext from '../../context/data/MyContext'
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../../firebase/firebaseConfig"
import { toast } from 'react-toastify';

const Login = () => {
    const context = useContext(MyContext)
    const {loading, setLoading} = context

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async() => {
        setLoading(true)
        try{
            const res = await signInWithEmailAndPassword(auth, email, password)
            toast.success("Login Successful",{
                autoClose: 2000,
                position: "top-center"
            })
            localStorage.setItem("user", JSON.stringify(res))
            navigate("/")
            setLoading(false)
        }catch(err){
            toast.error("Authentication Error: Wrong Email/Password",{position: "top-center"})
            setLoading(false)
        }
    }

    return (
    <div className="flex justify-center items-center h-screen">
        
        <div className="p-10 rounded-xl border-2 border-gray-600 bg-gray-500">
            <div className="m-2 text-center">
                <h1 className='font-extrabold text-3xl'>Login</h1>
            </div>
            <div className='my-5'>
                <input 
                className='p-2 rounded-lg w-full'
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='my-5'>
                <input
                className='p-2 rounded-lg w-full' 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="my-6 text-center">
                <button onClick={handleLogin} className='rounded-lg w-full font-extrabold bg-yellow-400 p-2'>login</button>
            </div>
            <div className='text-center text-lg'>
                <h2>Don't have an account? <Link className='text-red-700' to={"/signup"}>Signup</Link></h2>
            </div>
        </div>
    </div>
  )
}

export default Login