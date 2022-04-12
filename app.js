const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));





app.get("/",function(req,res){

   res.sendFile(__dirname +"/index.html");
});
app.post("/",function(req,res){
      
    const apiKey="4977956c550497a5c149205c25fc56be#";
    const unit="metric";
    const cityName=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?units="+unit+"&q="+cityName+"&appid="+apiKey;

    https.get(url,function(resp){
        // console.log(resp);

        resp.on("data",function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const temp=weatherData.main.temp;
            const weatherDesc=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon;
            const url1="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in "+cityName+" is "+temp+" degrees Celsius.</h1>");
            res.write("<h2>"+weatherDesc+"</h2>");
            res.write("<img src="+url1+">");
            res.send();
        });
    });
    // console.log(req);
});

app.listen(3000,function(){
    console.log("Server is running on port 3000.")
});