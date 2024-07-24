const express = require('express');
const multer = require('multer');
const fs = require('fs')
const router=express.Router();
const path=require("path");
const jwt =require("jsonwebtoken");
const { exec } = require('child_process');

// let express = require('express'),
//     multer = require('multer'),
//     mongoose = require('mongoose'),
//     // uuidv4 = require('uuid/v4'),
//     router = express.Router();

//     // const uuidv4 = uuid.v4()

// const DIR = './images/';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         // const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, Date.now() + 'jpeg');
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

// // User model
// let images = require('../models/images');

// router.post('/upload', upload.single('faceImg'), (req, res, next) => {
//     // const url = req.protocol + '://' + req.get('host')
//     // const image = new images({
//     //     faceImg: url + '/images/' + Date.now().toLocaleString()+'jpeg'
//     // });
//     // image.save().then(result => {
//     //     res.status(201).json({
//     //         message: "Image Uploaded!",
//     //         userCreated: {
//     //             profileImg: result.profileImg
//     //         }
//     //     })
//     // }).catch(err => {
//     //     console.log(err),
//     //         res.status(500).json({
//     //             error: err
//     //         });
//     // })
//     console.log("logginfile:"+req.file)
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//       }
//     const imagePath = req.file.path;
//   res.send(`Image uploaded and saved as: ${imagePath}`);
// })
const sharp = require('sharp');

router.post('/capture', (req, res) => {
    const { faceImg } = req.body;
    const data = faceImg.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(data, 'base64');
    const fileName = `jegan.jpg`;
    const filePath = path.join('D:\\FinalContents\\AttGAN-PyTorch\\data\\custom', fileName);

    sharp(buffer)
        .resize(256, 256) // Resize the image to 400x400
        .toFile(filePath, (err, info) => {
            if (err) {
                console.error('Error saving the image:', err);
                return res.status(500).json({ error: 'Error converting the image.' });
            } else {
                const jpgImageUrl = `D:\\FinalContents\\AttGAN-PyTorch\\data\\custom\\${fileName}`;
                return res.json({ jpgImageUrl });
            }
        });
        const command1 = 'python D:\\FinalContents\\AttGAN-PyTorch\\test.py --experiment_name 256_shortcut1_inject1_none_hq --test_int 1.0 --custom_img';

        
        exec(command1, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing the command: ${error}`);
            return;
          }
        
          // Log the command output
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        });
 
});

router.post('/result', (req, res) => {
    const command2 = 'python D:\\FinalContents\\SplitContents.py'
         setTimeout(() => {
        exec(command2, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing the command: ${error}`);
            return;
          }
        
          // Log the command output
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        });},10000);
});

module.exports = router;


