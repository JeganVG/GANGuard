const express = require('express');
const multer  = require('multer');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const port = 5000;
const fs = require('fs')
const cors = require('cors')
const cookieParser=require("cookie-parser")
const mongoose=require("mongoose");
app.use(cors({
  origin:['http://localhost:3000'],
  methods:["GET","POST"],
  credentials:true
}))
 const url='mongodb://127.0.0.1:27017/FinalYearProject';
 const connect = mongoose.connect(url);
 connect.then((db)=>{
    console.log("Connected to Mongo DB server\n");

 });

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/FinalContents/paper-kit-react-main/src/assets/uploadedimg');
  },
  filename: function (req, file, cb) {
    cb(null, "realimage" + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


app.post('/api/upload', upload.single('image'), (req, res) => {
  console.log("in api backend");
  // The uploaded image is stored in req.file
  res.send('Image uploaded successfully');
  // Example command to execute
const command = 'python D:\\FinalContents\\FinalYearProject.py';

;

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing the command: ${error}`);
    return;
  }

  // Log the command output
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
});
app.use(express.json());

app.use(cookieParser());

const  imageuploadapi  =require("./routes/imageuploadapi");
app.use('/image', imageuploadapi);
const  loginapi  =require("./routes/login");
app.use('/authenticationapi', loginapi)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

