const express=require("express");
const cors=require("cors");
const fs=require("fs");
const dotenv=require("dotenv")
dotenv.config("./env");
const mongoose=require("mongoose");
const app=express();
app.use(cors());
app.use(express.json())
app.listen(3000,()=>{
    console.log("Server Started");
})

mongoose.connect(String(process.env.CONN_STR))
.then(()=>{
    console.log("MongoDB COnnected Successfully");
})
.catch((err)=>{
    console.log("Errror Occured",err);
})


let jobsSchema=mongoose.Schema({
    id:{
        type:Number,
        required:[true,"id is required"],
    },
    company:{
        type:String,
        required:[true,"company is required"],
    },
    role:{
        type:String,
        required:[true,"role is required"],
    },
    status:{
        type:String,
        required:[true,"status is required"],
    },
    link:{
        type:String,
    },
    date:{
        type:Date,
        default:new Date(),
    }
})

let jobCollections=mongoose.model("jobCollections",jobsSchema);
async function getNextID(){
    let lastDoc=await jobCollections.findOne().sort({id:-1})
    if(lastDoc){
        return lastDoc.id+1;
    }
    return 1;
}
app.get('/jobs',async(req,res)=>{
    let apps=await jobCollections.find();
    res.status(200).json(apps)
})
app.post('/jobs',async (req,res)=>{
    // let app=apps[apps.length-1]
    // let id1={"id":app.id+1}
    let newID=await getNextID();
    // let id1={id:newID}
    let newJob={...req.body,id:newID}
    // apps.push({...req.body,...id1})
    // fs.writeFileSync("./data.json",JSON.stringify(apps));
    try{
    await jobCollections.insertOne(newJob);
    console.log("Applied");
    res.status(201).send("Job Application Saved");
    }
    catch(err){
        res.status(400).send("Bad Request");
    }
})
app.delete('/jobs/:id',async (req,res)=>{
    let jobID=req.params.id;
    console.log(req.params);
    // let ind=apps.findIndex((app,index)=>{
    //     return app.id==jobID;
    // })
    // apps.splice(ind,1);
    // fs.writeFileSync("./data.json",JSON.stringify(apps));
    await jobCollections.deleteOne({id:jobID});
    console.log("Deleted");
    res.status(201).send(`Job Application ${jobID} is Deleted`);
})
app.put('/jobs/:id',async (req,res)=>{
    let jobID=req.params.id;
    let editApp=await jobCollections.findOne({id:jobID});
    let updatedApp={...editApp.toObject(),...req.body}
    // apps[ind]=updatedApp;
    // fs.writeFileSync("./data.json",JSON.stringify(apps));
    await jobCollections.replaceOne({id:jobID},updatedApp)
    console.log("Updated");
    res.status(201).send(`Job Application ${jobID} is Updated`);
})
app.patch('/jobs/:id',async (req,res)=>{
    let jobID=req.params.id;
    // let ind=apps.findIndex((app)=>{
    //     return app.id==jobID;
    // })
    // let editApp=apps[ind];
    // let updatedApp={...editApp,...req.body}
    // console.log(updatedApp)
    // apps[ind]=updatedApp;
    // fs.writeFileSync("./data.json",JSON.stringify(apps));
    await jobCollections.updateOne({id:jobID},{$set:req.body});
    console.log("Patched");
    res.status(201).send(`Job Application ${jobID} is Patched`);
})