import {BrowserRouter, Routes, Route} from "react-router-dom"
import App from "./App"
import Addapp from "./Addapp"
import View from "./View"
import Update from "./Update"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function Start(){

    const [apps,setApps]=useState([]);
    async function getAllJobs(){
        let response=await axios.get("http://localhost:3000/jobs");
        let data=response.data;
        console.log(data);
        setApps(data);
    }
    useEffect(()=>{
        getAllJobs();
    },[])


    return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/add" element={<Addapp getAllJobs={getAllJobs}/>} />
          <Route path="/view" element={<View apps={apps} getAllJobs={getAllJobs} setApps={setApps}/>} />
          <Route path="/update/:id" element={<Update apps={apps} getAllJobs={getAllJobs}/>} />
      </Routes>
    </BrowserRouter>
    )
}