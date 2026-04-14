import { useEffect } from "react"
import "./View.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import {data} from "./data.js";
export default function View({apps,getAllJobs,setApps}){
    const nav=useNavigate();
    const [sortOrder,setSortOrder]=useState(1);
    const [sortStatus,setSortStatus]=useState(1);
async function deleteJob(id){
    let response=await axios.delete(`http://localhost:3000/jobs/${id}`);
    console.log(response);
    getAllJobs();

}
async function patchApplication(id,status){
    let response=await axios.patch(`http://localhost:3000/jobs/${id}`,{status,})
    console.log(response.data)
    getAllJobs();
}

async function sortByDate(storder){
    let apps1=[...apps]
    let newapps=apps1.sort((doc1,doc2)=>{
        let date1=new Date(doc1.date).toLocaleDateString()
        let date2=new Date(doc2.date).toLocaleDateString()
        console.log(storder);
        if(storder==1){
        return date1.localeCompare(date2);
        }
        return date2.localeCompare(date1);
    })
    console.log(newapps);
    setApps(newapps);
}

let priors={"Interview":1,"Applied":2,"No Update for Application":3,"To be Applied":4,"Rejected":5};
async function sortByStatus(storder){
    let apps1=[...apps]
    let newapps=apps1.sort((doc1,doc2)=>{
        console.log(doc1.status,doc2.status);
        let str1=priors[doc1.status];
        let str2=priors[doc2.status];
        console.log(storder)
        console.log(str1,str2)
        if(storder==-1){
        return str2-str1;
        }
        return str1-str2;
    })
    console.log(newapps);
    setApps(newapps);
}
    return(
        <>
        <div className="btn-div">
            <button onClick={()=>{
                nav("/")
            }} className="js-add-btn">Home</button>
            <button onClick={()=>{
                            nav("/add")
            }} className="js-add-btn">Add Application</button>
        </div>
            <table border={0}>
                <thead>
                    <tr className="table-row">
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Role</th>
                        <th>Tracker Link</th>
                        <th>Status<button title="sort" className="sort-btn" onClick={(event)=>{
                            if(sortStatus==1){
                                setSortStatus(-1);
                            }
                            else{
                                setSortStatus(1);
                            }
                            sortByStatus(sortStatus);
                        }}>^||^</button></th>
                        <th>Date<button title="sort" className="sort-btn" onClick={(event)=>{
                            if(sortOrder==1){
                                setSortOrder(-1);
                            }
                            else{
                                setSortOrder(1);
                            }
                            sortByDate(sortOrder);
                        }}>^||^</button></th>
                    </tr>
                </thead>
                <tbody>
                {apps.map((app)=>{
                    return(
                        <tr key={app.id} className="table-row">
                            <td>{app.id}<br /><button className="js-edit" onClick={(event)=>{
                                nav(`/update/${app.id}`)
                            }}>Edit</button><button className="js-delete" onClick={(event)=>{
                                deleteJob(app.id);
                            }}>Delete</button></td>
                            <td>{app.company}</td>
                            <td>{app.role}</td>
                            <td>{app.link?<a href={app.link} target="_blank">{app.link}</a>:<p>No Link Available    </p>}</td>
                            <td>
                                <select onChange={(event)=>{
                                        patchApplication(app.id,event.target.value);
                                    }} value={app.status}>
                                    <option value="To be Applied">To be Applied</option>
                                    <option value="Applied">Applied</option>
                                    <option value="No Update for Application">No Update for Application</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Rejected">Rejected</option>
                                </select></td>
                            <td>{new Date(app.date).toLocaleDateString()}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}