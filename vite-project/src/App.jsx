import { useNavigate } from "react-router-dom";
import "./App.css";
export default function App(){

  const nav=useNavigate();

  return(
    <>
    <div className="js-job-header">
      <div className="js-head">
        <h2>Job Application Tracker</h2>
      </div>
      <div className="js-options">
        <button className="js-option-items" onClick={()=>{
          nav("/add")}}>Add Application</button>
        <button className="js-option-items" onClick={()=>{
          nav("/view");
        }}>View All Applications</button>
      </div>
    </div>
    </>
  );
}