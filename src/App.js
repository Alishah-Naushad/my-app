import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';

function App() {
  const [inputData, setInputData] = useState(null);

  useEffect(() => {
    if(inputData){
      sendData(inputData)
    }
  }, [inputData]);

  const jsonData = {
      "name": "John Doe",
      "age": 30,
      "email": "johndoe@example.com",
      "trainingHash": "http://rose-robust-barracuda-701.mypinata.cloud/ipfs/QmfTP99gfdxkGEbxUEMwNXNqw67GZjacdRjT9ucxWA8Ljw",
      "address": {
          "street": "123 Main Street",
          "city": "New York",
          "state": "NY",
          "zipcode": "10001"
      },
      "interests": ["programming", "reading", "traveling"],
      "is_student": true
  }

  const sendData = (data) => {
    const url = 'http://127.0.0.1:5000/';
    axios.post(url, data, {responseType: "blob"})
    .then( (res) => {
      FileSaver.saveAs(res.data, "output.txt");
      axios.get(`${url}csv`, {responseType: "blob"})
      .then( (res) => {
        FileSaver.saveAs(res.data, "file.csv");
      })
      .catch( err => console.log(err))
    })
    .catch(err => console.log(err));
  }

  const handleInputChange = async() => {
    setInputData(jsonData);
  } 

  return (
    <div>
      <button onClick={handleInputChange}>Request Json</button>
    </div>
  );
}

export default App;
