import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../Services/AuthenticationService";
import "./Registration.css";

export function Register(){
    const [userName, setUserName] = new useState("");
    const [password, setPassword] = new useState("");
    const [repassword, setRePassword] = new useState("");
    const [serverReturn, setServerReturn] = new useState(null);
    const navigate =new useNavigate();
    const [isShown, setIsShown] = new useState();
    const togglePassword = () => {setIsShown((isShown) => (!isShown))};
    return (
        <React.Fragment>
            <h1>Welcome to PasswordLocker</h1>
            <section className="flex-container">
                <h2 className="flex-item">Register</h2>
                <div className="flex-item">
                    {/* <label>UserName</label>&nbsp;&nbsp; */}
                    <input type="text" placeholder="User Name" value={userName} onChange={(event) =>{setUserName(event.target.value)}}/>
                </div>
                {/* <br /> */}
                <div className="flex-item">
                    {/* <label>Password   </label>&nbsp;&nbsp; */}
                    <input type={(isShown) ? 'text' : 'password'} placeholder="Password" value={password} onChange={(event) =>{setPassword(event.target.value)}}/>
                </div> 
                {/* <br/> */}
                <div className="flex-item">
                    {/* <Placeholder>Enter Again</Placeholder>&nbsp;&nbsp; */}
                    <input type={(isShown) ? 'text' : 'password'} placeholder="Confirm Password" value={repassword} onChange={(event) =>{setRePassword(event.target.value)}}/>
                </div> 
                {/* <br /> */}
                <div className='flex-item'>
                    <label htmlFor="checkbox">Show password?</label>
                    <input type="checkbox" checked={isShown} onChange={togglePassword}></input>
                </div>
                {/* <br/> */}
                <div className='flex-item'>
                    <button onClick={async ()=>{
                            if(password == ""){
                                alert("Please enter valid password!");
                                return;
                            }
                            if(repassword != password){
                                return;
                            } 
                            var data = await RegisterUser(userName, password); setServerReturn(data);}}>
                        Register
                    </button>
                </div>
                <br/>
                <label className="flex-item">{ (password != repassword) ? "Passwords don't match!" : (serverReturn === null) ? "" : (serverReturn == true) ? "Resistration Successful" : "UserName is already taken"}
                </label>
            </section>
            <section className="Login">
                <br/>
                <button onClick={() => {navigate("/")}}>Login</button>
            </section>
        </React.Fragment>
    )
}