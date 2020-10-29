const express = require('express');
const mongoose = require('mongoose');
 
const {MONGO_URI} = require('./config');
const router = require('./Routes/api/post');
const app = express();
const postsRoutes = require('./Routes/api/post'); 

//middleware
app.use(express.static("project/html"))
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('project'))
app.use(express.static("project/html"))
app.use('html/',express.static(__dirname + 'project/'))
app.use('img/', express.static(__dirname + 'project/'))


//connecting the mongoose
mongoose.connect(MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(()=> console.log('MongoDB conneted!'))
.catch(err => console.log(err));

router.use('/api/post', postsRoutes);

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/html/home.html');
  
  })

 const PORT = process.env.PORT ||3000;
  
app.listen(PORT, () => console.log(`server has started ${PORT}`));