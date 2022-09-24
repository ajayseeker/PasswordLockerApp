import React, {useEffect, useState} from 'react';
import { useNavigate} from "react-router-dom";
import {IsUserNamePasswordValid} from "../../Services/AuthenticationService"
import "./Authentication.css"

function Welcome(){
    
    return (
        <div>
            <h1 className='WelcomeHeader'> Welcome to Password Locker</h1>
            <section className='Image'>
                <img width={1000} height={200} src='https://th.bing.com/th/id/OIP.7lQrXdHexUA-1mXdktJGQAHaE8?pid=ImgDet&rs=1'></img>
            </section>
        </div>
    )
}

function UserInputs(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [data, setdata] = useState(null);
    const [isShown, setIsSHown] = useState(false);
    const togglePassword = () => {setIsSHown((isShown) => (!isShown))};
    // Implement input field
    const history = useNavigate();
    useEffect(() => {console.log("hit"); console.log(data); if(data == true) history("/Credentials", {state : [`${userName}%23${password}`, "legit"]})},[data])
    return(
        <div className='UserInputs'>
            <label>UserName</label>&nbsp;&nbsp;
            <input  type="text" name="username" value={userName} onChange={(event) => {setUserName(event.target.value)}}/>
            <label>Password</label>&nbsp;&nbsp;&nbsp;
            <input id="password" type={isShown ? "text" : "password"} value={password} onChange={(event) => {setPassword( event.target.value)}}/>
            <button onClick={async () => {var ret = await IsUserNamePasswordValid(userName, password); console.log(ret); setdata(ret);}}>Login</button>
            <br/>
            <div className='ShowPasswordCheckbox'>
                <label htmlFor="checkbox">Show password?</label>
                <input type="checkbox" checked={isShown} onChange={togglePassword}></input>
            </div>
            <br/>
            <label>{(data === null) ? "" : (data === true) ? "Login Successful" : "Invalid Username or Password"}</label>
            <br/><br/>
        </div>
    )
}
function CreateAccount(){
    const history = useNavigate();
    return(      
    <div className='Registration'>
        <label >Don't have an account?</label>
        <button  onClick={()=>{history("/Register")}}>Register</button>
    </div> 
    )
}

function GetLoginPage(){
    return(
        <React.Fragment>
            <Welcome/>
            <UserInputs/>
            <CreateAccount/>
        </React.Fragment>
    )
}

export {GetLoginPage};