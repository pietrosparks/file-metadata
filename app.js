// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var multer  = require('multer')
var port = process.env.PORT || 4000
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.set('view-engine', 'ejs');
app.engine('html', require('ejs').renderFile);

let baseUrl;
if(process.env.NODE_ENV=="production"){
    baseUrl = 'https://file-meta-view.glitch.me'
}
else baseUrl = 'http://localhost:4000'

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.htm

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {

   res.render('index.html',{baseUrl:baseUrl});
});

app.post('/file', upload.single('myFile'), (req, res)=>{
    const file = {};
    file.size = req.file.size;

    res.render('result.html',{file:file});
})

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
