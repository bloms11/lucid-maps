import { Room, Cancel } from '@material-ui/icons';
import axios from 'axios';
import React, {useRef, useState} from 'react'
import './login.css';

export default function Login({setShowLogin, myStorage, setCurrentUser}) {
    const [error, setError] = useState(false)
     const nameRef = useRef()
     const passwordRef = useRef()

     const handleSubmit = async (e) => {
         e.preventDefault();
         const user = {
             username: nameRef.current.value,
             password: passwordRef.current.value
         }
         try{
            const res = await axios.post("/users/login", user)
            setCurrentUser(res.data.username)
            myStorage.setItem('user', res.data.username)
            setShowLogin(false)
         }catch(err){
             setError(true)
         }
     }
  return (
    <div className='loginContainer'>
        <div className='logo'>
            <Room/>
            LucidPin
        </div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='username' ref={nameRef}/>
            <input type='password' min='5' placeholder='password' ref={passwordRef}/>
            <button className='loginBtn'>Login</button>
            {error && 
                <span className='failure'>Oops..something went wrong!</span>
            }
        </form>
        <Cancel className="loginCancel" onClick={()=>setShowLogin(false)} />
    </div>
  )
}
