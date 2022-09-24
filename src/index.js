import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Register } from './Views/Register/Register';
import { Credentials } from './Views/Credential/Credentials';
import { GetLoginPage } from './Views/Login/Authenticate';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App library="Graph QL"/>
//   </React.StrictMode>
// );
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetLoginPage/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Credentials" element={<Credentials />} />
      </Routes>
    </BrowserRouter>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
