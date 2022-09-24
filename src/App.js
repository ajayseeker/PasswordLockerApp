import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import userEvent from '@testing-library/user-event';

function App({library}) {
  const [data, setdata] = useState(null);
  useEffect(() =>
  {
    fetch("https://api.github.com/users/moonhighway").then(response => response.json()).then(data => setdata(data));
  }, []);
  if(data){
    return <pre>
          {JSON.stringify(data, null, 2)}
    </pre>
  }
   return (
    <pre> Nothing Found</pre>
   )
}

export default App;
