const express = require("express");
const https = require("https");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


app.get("/" , function(req , res){

   res.sendFile(__dirname + "/index.html");

})



app.post("/" , function(req,res){




   const  units = "metric";
   const id = "03770d56f789b5f97d9fc7ef0a70070e";
   const query = req.body.city;
   const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + id + "&units="+ units +"&q=" +query ;

    https.get(url , function(response){
    //  console.log(response.statusCode);

      response.on("data" , function(data){
      const weatherdata = JSON.parse(data)
    //  console.log(weatherdata);
    const temp = weatherdata.main.temp
    const dis = weatherdata.weather[0].description
    const icon = weatherdata.weather[0].icon
    const image_url = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
     res.write("<p>the current weather is " + dis + "<p>");
    res.write("<h1>the temperature  in London is " + temp + " celcius</h1>");
    res.write("<img src=" + image_url + " >");
      res.send();
      })
    })




//  console.log("post req is sucess");
})










app.listen(3000,function(){
  console.log("My server is running on port 3000");
} )
