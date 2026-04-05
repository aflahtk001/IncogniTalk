import express from "express"
import bodyParser from "body-parser"
import { dbConnect } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

let app = express()
let port = process.env.PORT

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

async function getCollection(name) {
  const db = await dbConnect();
  return db.collection(name)
}

app.get("/",async (req,res)=>{
  
  let collection = await getCollection("posts")
  const posts = await collection.find({}).toArray();
  console.log(posts)

  res.render("index.ejs",{posts})
})

app.post("/submit",async (req,res)=>{

  const date = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
});
    let data = {
        category : req.body.category, 
        tittle : req.body.tittle,
        name : req.body.name || "Anonymous", 
        message :  req.body.message, 
        date : date,
    }
    let collection = await getCollection("posts")
    const result = await collection.insertOne(data);
    console.log("Inserted ID:", result.insertedId);
    res.redirect("/")
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})