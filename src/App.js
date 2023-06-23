import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';
import getContractInstance from './contract/contractInstance';
import abi from './contract/user.json';
import { userAddress } from './contract/contractAddress';

function App() {
  // const [inputData, setInputData] = useState(null);

  // useEffect(() => {
  //   if(inputData){
  //     sendData(inputData)
  //   }
  // }, [inputData]);

  // const jsonData = {
  //     "name": "John Doe",
  //     "age": 30,
  //     "email": "johndoe@example.com",
  //     "trainingHash": "http://rose-robust-barracuda-701.mypinata.cloud/ipfs/QmfTP99gfdxkGEbxUEMwNXNqw67GZjacdRjT9ucxWA8Ljw",
  //     "address": {
  //         "street": "123 Main Street",
  //         "city": "New York",
  //         "state": "NY",
  //         "zipcode": "10001"
  //     },
  //     "interests": ["programming", "reading", "traveling"],
  //     "is_student": true
  // }

  const [data,setData] = useState([]);
  
  const address = "0x84d1d7a0bD026F38A34356fd6d086235dA48F248";
  let tx;

  async function loadJobs() {
      const contract = await getContractInstance(abi,userAddress);
      tx = await contract.viewCreatedJobs();
      // console.log(tx);
      const filt = tx.filter((item)=>item.sentBy === address);
      // console.log(filt)
      setData(filt[4]);
  }

  useEffect(() => {
    loadJobs();
  },[]);

  // useEffect(() => {
  //   console.log(data);
  //   // sendData(data);
  // }, [data])

  const sendData = () => {

    // const inputObject = {
    //   key: 'code',
    //   value: 123n
    // }

    const customJson = JSON.stringify(data, (key, value) => {
      return typeof value === 'bigint' ? value.toString() : value;
    });

    const outputObject = JSON.parse(customJson)

    // console.log("Input: ", customJson);
    // console.log("Output: ", outputObject);
    console.log(typeof(outputObject))
    console.log(outputObject)

    const url = 'http://127.0.0.1:5000/';
    axios.post(url, outputObject, {responseType: "blob"})
    .then( (res) => {
      FileSaver.saveAs(res.data, "output.txt");
      axios.post(`${url}csv`, {url: outputObject[8]}, {responseType: "blob"})
      .then( (res) => {
        FileSaver.saveAs(res.data, "file.csv");
      })
      .catch( err => console.log(err))
    })
    .catch(err => console.log(err));
  }

  // const handleInputChange = async() => {
  //   setInputData(data);
  // } 

  return (
    <div>
      <button onClick={sendData}>Request Json</button>
      {/* <p>{typeof(data)}</p> */}
    </div>
  );
}

export default App;
