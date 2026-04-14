import { useNavigate } from "react-router-dom";
import "./Addapp.css";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
export default function Addapp({getAllJobs}){
    const nav=useNavigate();
    const errmsg=useRef();
    let style={
        width:"170px",
    }
    async function addApplication(userData){
        try{
        let response=await axios.post("http://localhost:3000/jobs",{...userData});
        console.log(response);
        getAllJobs();
        nav("/view");
        return true;
        }
        catch(err){
            console.log("Error Occured",err)
            return false;
        }

    }
    let userData={};
    return(
        <>
            <form className="js-form">
                <div className="js-form-el">
                    <label htmlFor="compname" className="label-css">Company Name :</label>
                    <div>
                    <input id="compname" type="text" onChange={(event)=>{
                        let inp=event.target.value;
                        userData.company=inp;
                    }}></input><span className="required-star"> *</span>
                    </div>
                </div>
                <div className="js-form-el">
                    <label htmlFor="role" className="label-css">Role :</label>
                    <div>
                    <input id="role" type="text" onChange={(event)=>{
                        let rol=event.target.value;
                        userData.role=rol;
                    }}></input><span className="required-star"> *</span>
                    </div>
                </div>
                <div className="js-form-el">
                    <label htmlFor="link" className="label-css">Tracking Link :</label>
                    <div>
                    <input id="link" type="text" onChange={(event)=>{
                        userData.link=event.target.value;
                    }}></input>
                    </div>
                </div>
                <div className="js-form-el">
                    <label htmlFor="status" className="label-css">Status :</label>
                    <div>
                    <select onChange={(event)=>{
                        userData.status=event.target.value;
                    }}>
                        <option value="To be Applied">To be Applied</option>
                        <option value="Applied">Applied</option>
                        <option value="No Update for Application">No Update for Application</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                    </select><span className="required-star"> *</span>
                    </div>
                </div>
                <div className="js-form-el">
                    <label htmlFor="day" className="label-css">Applied Date :</label>
                    <div>
                    <input id="day" type="date" style={style} onChange={(event)=>{
                        userData.date=event.target.value;
                    }}></input>
                    </div>
                </div>
                <div ref={errmsg} className="err-msg">Fill all the reuired fields</div>
                <button className="submit-btn" onClick={async(event)=>{
                    event.preventDefault();
                    let result=await addApplication(userData);
                    result?errmsg.current.style.display="none":errmsg.current.style.display="block";
                }}>Submit</button>
            </form>
        </>
    )
}