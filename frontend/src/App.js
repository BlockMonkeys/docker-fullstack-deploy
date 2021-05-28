import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get(`/api/values`)
      .then(response => {
        console.log(response);
        setLists(response.data);
      })
  }, []);

  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    axios.post(`/api/value`, {value: value})
      .then(response => {
        if(response.data.success){
          console.log('response :', response);
          setLists([...lists, response.data]);
          setValue("");
        } else {
          alert("DB저장에 실패!");
        }
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />


      <div className="container">

        {lists && lists.map((list, idx)=> {
          <li key={idx}>{list.value}</li>
        })}


        <form className="example" onSubmit={submitHandler}>
          <input 
            type="text"
            placeholder="입력해주세요.."
            value={value}
            onChange={changeHandler}
            />
            <button type="submit">확인</button>
        </form>
      </div>



      </header>
    </div>
  );
}

export default App;
