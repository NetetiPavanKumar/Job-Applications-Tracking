import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Update({apps,getAllJobs}){
    let style={
        width:"170px",
    }
        async function UpdateApplication(userData,id){
       let response=await axios.put(`http://localhost:3000/jobs/${id}`,{...userData});
       console.log(response.data);
       getAllJobs();
       nav("/view")
       
    }
    const {id}=useParams();
    const nav=useNavigate();
    let editApp=apps.find((app)=>{
        return app.id==id;
    })
    if (!editApp) {
    return <h2>Loading...</h2>;
    }
    let userData={}
    return(
        <>
            <form className="js-form">
                <div className="js-form-el">
                    <label htmlFor="compname" className="label-css">Company Name :</label>
                    <input id="compname" type="text" placeholder={editApp.company} onChange={(event)=>{
                        let inp=event.target.value;
                        userData.company=inp;
                    }}></input>
                </div>
                <div className="js-form-el">
                    <label htmlFor="role" className="label-css">Role :</label>
                    <input id="role" type="text" placeholder={editApp.role} onChange={(event)=>{
                        let rol=event.target.value;
                        userData.role=rol;
                    }}></input>
                </div>
                <div className="js-form-el">
                    <label htmlFor="link" className="label-css">Tracking Link :</label>
                    <input id="link" type="text" placeholder={editApp.link} onChange={(event)=>{
                        userData.link=event.target.value;
                    }}></input>
                </div>
                <div className="js-form-el">
                    <label htmlFor="status" className="label-css">Status :</label>
                    <select onChange={(event)=>{
                        userData.status=event.target.value;
                    }}>
                        <option value="To be Applied">To be Applied</option>
                        <option value="Applied">Applied</option>
                        <option value="No Update for Application">No Update for Application</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div className="js-form-el">
                    <label htmlFor="day" className="label-css">Applied Date :</label>
                    <input id="day" type="date" style={style} onChange={(event)=>{
                        userData.date=event.target.value;
                    }}></input>
                </div>
                <button className="submit-btn" onClick={(event)=>{
                    event.preventDefault();
                    UpdateApplication(userData,id);
                }}>Update</button>
            </form>
        </>
    )
}