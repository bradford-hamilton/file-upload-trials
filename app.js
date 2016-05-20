var express = require("express");
var multer = require('multer');
var app = express();
var storage = multer.diskStorage({destination: function (req, file, callback) {
                                      callback(null, './images');
                                    },
                                    filename: function (req, file, callback) {
                                      callback(null, file.fieldname + '-' + Date.now());
                                    }
                                  });

var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/photos',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(1337);
