const express = require('express');
const app = express();
const multer = require('multer');
const userRoute = require('./routes/user.route');
const connectDB = require('./config/db.config');
const cors = require('cors');
require('dotenv').config();

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

const corsOptions = {
  origin: [process.env.FRONTEND_URL,"http://localhost:3000"], // Add more origins if needed
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

app.use(cors(corsOptions));


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