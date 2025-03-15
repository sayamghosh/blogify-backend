const express = require('express');
const app = express();
const multer = require('multer');
const userRoute = require('./routes/user.route');
const connectDB = require('./config/db.config');

connectDB();

const PORT = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user',userRoute);

app.post('/upload',upload.single('profileImage'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.json('message: File uploaded successfully');
})

app.get('/',(req,res)=>{
    return res.send('Home Page');
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});