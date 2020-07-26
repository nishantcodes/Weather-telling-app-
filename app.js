const express= require("express");
const app= express();
const https =require("https");
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function (req,res){
  res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,res){
  const query=req.body.cityname;
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid=0655d16dc13d864b810950b20495193b&units=metric";
  https .get(url,function(response){
    response.on("data",function(data){
      const wdata=JSON.parse(data);
      const temp= wdata.main.temp
      const feels=wdata.main.feels_like
      const des= wdata.weather[0].description
      const icon=wdata.weather[0].icon
      const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
      console.log(temp+" "+des);
      res.write("<h1>The weather is currently "+ des+"</h1>")
      res.write("<h1>the temp in "+ query +" is "+ temp+" and feels like "+feels+"</h1>")
      res.write("<img src="+imgurl+">")
      res.send();
    } )
  } )
})

app.listen(3000, function(){
  console.log("Server chalu h 3000 pe")
})
