require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_LINK}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(PORT);
    console.log(`Listening on port ${PORT}...`);
    console.log(`Connected to MongoDB`);

  })
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));


app.use(authRoutes);
app.use('/notes',requireAuth,checkUser,noteRoutes);