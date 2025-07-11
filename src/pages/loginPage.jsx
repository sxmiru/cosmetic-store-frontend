import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    async function Login(){
        console.log(email,password)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",{
            email: email,
            password: password
        }).then(
            (response)=>{
                console.log(response.data)
                localStorage.setItem("token",response.data.token)
                //read token // const token = localStorage.getItem("token")
                toast.success("Login Successful!")
                if(response.data.role == "admin"){

                    navigate("/admin")
                    
                }else if(response.user.role = "user"){
                    
                    navigate("/")

                }
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Login Failed")
            }
        )
    }

    return(
        <div className="w-full h-screen bg-[url(loginBg.jpg)] bg-cover flex justify-center items-center">
            <div className="w-[500px] h-[500px] backdrop-blur-sm shadow-2xl rounded-[30px] flex flex-col items-center justify-center relative gap-[20px]">
                <h1 className="absolute top-[20px] text-3xl font-bold text-center my-5">Login</h1>
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg">Email</span>
                    <input onChange={
                        (e)=>{
                            setEmail(e.target.value)
                            console.log("Email has been updated")
                        }
                    } type="text" className="w-[350px] h-[45px] border border-black rounded-xl"/>
                </div>

                <div className="w-[350px] flex flex-col">
                    <span className="text-lg">Password</span>
                    <input onChange={
                        (e)=>{
                            setPassword(e.target.value)
                            console.log("Password has been updated")
                        }
                    } type="text" className="w-[350px] h-[45px] border border-black rounded-xl"/>
                </div>
                <button onClick={Login} className="w-[350px] h-[45px] bg-blue-500 text-white rounded-xl mt-5 hover:bg-blue-600 transition duration-300">
                    Login
                </button>
                <p>Don't have an account? <Link to="/register" className="text-blue-600 ">Sign Up</Link> from here</p>
            </div>
        </div>
    );
}