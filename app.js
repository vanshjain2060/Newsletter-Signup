//  jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/" , function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName ,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/5736df8487";

    const options = {
        method: "POST",
        auth: "vansh:a7e0dab1c7ec20bc88b003ab20f96c5e-us18"
    }
    
    const request = https.request(url, options, function(response) {
        
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname + "/failure.html")
        }
        
        response.on("data", function(info) {
            // console.log(JSON.parse(info));
        });
    });
    
    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect('/');
});

app.listen(3000 , function(){
   console.log("Server is running on port 3000."); 
});




// API KEY = a7e0dab1c7ec20bc88b003ab20f96c5e-us18
// LIst id = 5736df8487