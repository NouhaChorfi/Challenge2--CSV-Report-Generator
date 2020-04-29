const express=require('express')
const path= require('path')
const fs=require('fs')
var bodyParser = require('body-parser')


var app=express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/',(req, res, next)=>{
        var pathHtml='./client/index.html'
        res.sendFile(path.join(__dirname,pathHtml))
        
 })
 app.use(express.static(__dirname+'./public'));

 app.post('/',(req,res,next)=>{
    var inputText=req.body.jsonText
    var uploadedText=req.body.uploadJson
    var jsonObject= JSON.parse(inputText)
    var keysJson = Object.keys(jsonObject).filter(item => item !== 'children')
    keysJson=keysJson.join(',')+'<br>'
    //////////////////
//     function loadFileAsText(){
//         var fileToLoad = document.getElementById("uploadJson")
      
//         var fileReader = new FileReader();
//         fileReader.onload = function(fileLoadedEvent){
//             var textFromFileLoaded = fileLoadedEvent.target.result;
//             document.getElementById("jsonText").value = textFromFileLoaded;
//             console.log('fileload  '+textFromFileLoaded)
//         };
      
//         fileReader.readAsText(fileToLoad, "UTF-8");
//       }
    //////////////

    function generateCSV(textJson) {
        for(item in textJson){
            if(item !=='children'){
               keysJson=keysJson+textJson[item]
            }
            console.log('item11 '+ item)                
         }
         keysJson=keysJson+'<br>'
         if(textJson['children'].length>0){
         for(var i=0; i< textJson['children'].length; i++){
             
                 textJson=textJson['children'][i];
                generateCSV(textJson)
             }
         }         
         return keysJson                         
    }
    keysJson=generateCSV(jsonObject) 
    res.send(keysJson)                 
 })
 app.use((req,res,next)=>{res.send('404 not found')})

app.listen(8080,()=>{console.log('Hello Express')})
