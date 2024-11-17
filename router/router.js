const express = require('express');
const router=express.Router()
const login = require('../login');
const addEmployee=require('../addEmployee')
const register=require('../register')
const updateEmployee=require('../updateEmployee')
const getEmployee=require('../getEmployee')
const deleteEmpoyee=require('../deleteEmployee')
const logout=require('../logout')
const multer = require('multer');
const path = require('path');


const storage=multer.diskStorage({
    destination:(req,fil,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const fileFilter=(req, file, cb)=>{
    const allowedTypes = ['image/jpeg','image/jpg','image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only jpg and png images are allowed!'), false); 
    }
  };
  const upload=multer({
    storage,
    fileFilter,
    limits: { fileSize:5*1024*1024},
  });

router.get("/",(req,res)=>{
    res.json('Hello')
})
router.post('/login',login)
router.post('/register',register)
router.post('/addEmployee',(req,res,next) => {
    upload.single('img')(req,res,(err)=>{
      if (err) {
        if (err.message === 'Only jpg and png images are allowed!') {
          return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: 'File upload failed', error: err.message });
      }
      next();
    });
  },addEmployee)
router.put('/updateEmployee/:employeeId',(req,res,next) => {
    upload.single('img')(req,res,(err)=>{
      if (err) {
        if (err.message === 'Only jpg and png images are allowed!') {
          return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: 'File upload failed', error: err.message });
      }
      next();
    });
  },updateEmployee)
router.get('/getEmployee',getEmployee)
router.delete('/deleteEmployee/:employeeId',deleteEmpoyee)
router.post('/logout',logout)

module.exports=router