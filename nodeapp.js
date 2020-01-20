const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const readdir = require("recursive-readdir");
const http = require('http');
var url = require('url');
const replaceall = require("replaceall");
const reader = require('xml-reader');
const xmlQuery = require('xml-query');
 
app.use(bodyParser.urlencoded({ extended: true })); 
const port = 3000;

app.listen(port, () => {
	console.log(`Server running on port${port}`);
  });


//-------------------------------------------------------------

var counter=0;



var c;
var  totalFiles;

readdir('./XMLs').then(function (files){
	totalFiles = files.length; 
	let b=files.toString();
	//console.log(b);
	c=b.split(',');
});


app.post('/app1', (req, res) => {
	var prev=req.body.previous;
	var next=req.body.next;
//-----------Next Button--------------------------	

if(prev==undefined && next=="next")
	{
	

	//parseInt(pageNumber);
		 
		 pageNumber=counter++;
		
		var d=c[0].split('\\');
	    for(i=0;i<totalFiles;i++)
	    {
		//console.log(c[i] +" index of"+ i);
	    }
		
		var f=c[counter];
	    console.log("this "+c[counter])
	
    if (totalFiles > 0)
	{ 
	    let quesXml = fs.readFileSync(f,'utf8');
        function getAllOpenIndexes(arr, val) {
            var indexes = [], i = -1;
            while ((i = arr.indexOf(val, i+1)) != -1){
            indexes.push(i);
	        console.log(indexes);
            }
        return indexes;	 
	    }	  
        indexes = getAllOpenIndexes(quesXml, "<math xmlns='http://www.w3.org/1998/Math/MathML'>");

	
        function getAllCloseIndexes(arr, val) {
            var indexes1 = [], i = -1;
            while ((i = arr.indexOf(val, i+1)) != -1){
            indexes1.push(i);
	        //console.log(indexes1);
            }
        return indexes1;
	    } 
		var mEquation="" ;
        var indexes1 = getAllCloseIndexes(quesXml, "</math>");	
        for(var i=0;i<indexes.length;i++) 
        { 
            var x = indexes[0]; 
           mEquation += quesXml.substring(indexes[i], (indexes1[i]+7));     
           
        } 
		console.log(mEquation); 
		    var ast = reader.parseSync(quesXml);
		    a= xmlQuery(ast).attr('title');
			console.log("title:" +a);
	    fs.readFile("main.html", function (error, pgResp) 
		{
		    if (error) {
				
			    console.log('Contents you are looking are Not Found');
			} else {
		
			     pgResp = pgResp.toString();
			     let htmopendiv = pgResp.indexOf("<div>");
			     let htmclosediv = pgResp.indexOf("</div>",htmopendiv+5);
			     htmEquation = pgResp.substring(htmopendiv+5, htmclosediv);
				 console.log(htmEquation);
			     var fdata = replaceall("<div>"+htmEquation+"</div>", "<div>"+mEquation+"</div>", pgResp);
				// console.log(fdata);
				 let titleopen = pgResp.indexOf("<h2>");
				    let titleclose = pgResp.indexOf("</h2>",titleopen+4);
				   let titleEquation = pgResp.substring(titleopen+4, titleclose);
				   var fdata1 = replaceall("<h2>"+titleEquation+"</h2>","<h2>"+a+"</h2>", fdata); 
				   
				 let pageNumOpen = pgResp.indexOf("<p>");
			     let pageNumCl = pgResp.indexOf("</p>",pageNumOpen+3);
			     pageIndexEq = pgResp.substring(pageNumOpen+3, pageNumCl);
				 console.log(pageNumber++);
			     var fdata2 = replaceall("<p>"+pageIndexEq+"</p>", "<p>"+pageNumber+"</p>", fdata1);
				 
				 let pageTotalOpen = pgResp.indexOf("<a>");
			     let pageTotalCl = pgResp.indexOf("</a>",pageTotalOpen+3);
			     pageTotalEq = pgResp.substring(pageTotalOpen+3, pageTotalCl);
			     var fdata3 = replaceall("<a>"+pageTotalEq+"</a>", "<a>"+totalFiles+"</a>", fdata2);
				 
				 var fdata4 = replaceall("</span><br/><br/>", "",fdata3);
				 var fdata5 = replaceall("</math>", "</math></span><br/><br/>",fdata4);
				 
				 var fdata6 = replaceall("<span>", "",fdata5);
				 var fdata7 = replaceall("<math xmlns='http://www.w3.org/1998/Math/MathML'>", "<span><math xmlns='http://www.w3.org/1998/Math/MathML'>",fdata6);
				 
			     var msg='alert("invalid data")'
			     let x = "<button class='previous' value='previous' name='previous'>Previous</button>";
                 let y= "<button class='previous' value='previous' name='previous' onclick='"+msg+"'>Previous</button>";
                 b1= replaceall(y,x,fdata7);
					
			     fs.writeFileSync("main.html", b1);
				 res.write(b1);
			        
				 console.log("counter++ prev value "+ counter);
				//pageNumber= pageNumber+1
				 return res.end()
				}
	 });
	 
	}
	else {
		console.log("file not found");
	}
    }
//-------------------------Previous Button------------------------------------------
 else if(prev=="previous" && next==undefined){
 if(counter>=1)
    {
     var pageNumber= --counter;
    }
	console.log("perv---- counter"+ counter);

  if (counter<=0){
  console.log("counter 05698745---------" + counter);
  fs.readFile("main.html", function (error, pgResp) {
       var msg='alert("invalid data")'
                  
       if (error) {
       
         console.log('Contents you are looking are Not Found');
         } else {
         let x = "<button class='previous' value='previous' name='previous'>Previous</button>";
         let y= "<button class='previous' value='previous' name='previous' onclick='"+msg+"'>Previous</button>";
         let page1=pgResp.toString();
         b1= replaceall(x,y,page1);
         fs.writeFileSync("main.html", b1);                      
         res.write(b1);
         return res.end();
         }

        });
  
    }
	
     else {
	    
	    var f=c[counter];
	    console.log("this "+c[counter])
			
		if (totalFiles > 0)
		{ 
	      let quesXml = fs.readFileSync(f,'utf8');
	      function getAllOpenIndexes(arr, val) {
            var indexes = [], i = -1;
            while ((i = arr.indexOf(val, i+1)) != -1){
            indexes.push(i);
		    console.log(indexes);
            }
          return indexes;	 
	    }	  
          var indexes = getAllOpenIndexes(quesXml, "<math xmlns='http://www.w3.org/1998/Math/MathML'>");

		
        function getAllCloseIndexes(arr, val) {
          var indexes1 = [], i = -1;
            while ((i = arr.indexOf(val, i+1)) != -1){
            indexes1.push(i);
	        console.log(indexes1);
            }  
          return indexes1;
	    } 
        var indexes1 = getAllCloseIndexes(quesXml, "</math>");	
		var mEquation="" ;
        for(var i=0;i<indexes.length;i++) 
        { 
            mEquation += quesXml.substring(indexes[i], (indexes1[i]+7));     
            //console.log("hello"+mEquation); 
        } 
	    fs.readFile("main.html", function (error, pgResp)
		    {
			    if (error) {
					
				    console.log('Contents you are looking are Not Found');
				} else {
			
					pgResp = pgResp.toString();
					let htmopendiv = pgResp.indexOf("<div>");
					let htmclosediv = pgResp.indexOf("</div>",htmopendiv+5);
					htmEquation = pgResp.substring(htmopendiv+5, htmclosediv);
					var fdata = replaceall("<div>"+htmEquation+"</div>", "<div>"+mEquation+"</div>", pgResp);
					
					 let titleopen = pgResp.indexOf("<h2>");
				     let titleclose = pgResp.indexOf("</h2>",titleopen+4);
				     let titleEquation = pgResp.substring(titleopen+4, titleclose);
				     var fdata1 = replaceall("<h2>"+titleEquation+"</h2>","<h2>"+a+"</h2>", fdata); 
					 
					 let pageNumOpen = pgResp.indexOf("<p>");
			         let pageNumCl = pgResp.indexOf("</p>",pageNumOpen+3);
			         pageIndexEq = pgResp.substring(pageNumOpen+3, pageNumCl);
			         var fdata2 = replaceall("<p>"+pageIndexEq+"</p>", "<p>"+pageNumber+"</p>", fdata1);
				     
				     let pageTotalOpen = pgResp.indexOf("<a>");
			         let pageTotalCl = pgResp.indexOf("</a>",pageTotalOpen+3);
			         pageTotalEq = pgResp.substring(pageTotalOpen+3, pageTotalCl);
			         var fdata3 = replaceall("<a>"+pageTotalEq+"</a>", "<a>"+totalFiles+"</a>", fdata2);
				     
				     var fdata4 = replaceall("</span><br/><br/>", "",fdata3);
				     var fdata5 = replaceall("</math>", "</math></span><br/><br/>",fdata4);
				 
				     var fdata6 = replaceall("<span>", "",fdata5);
				     var fdata7 = replaceall("<math xmlns='http://www.w3.org/1998/Math/MathML'>", "<span><math xmlns='http://www.w3.org/1998/Math/MathML'>",fdata6);
					 

			         var msg='alert("invalid data")'
			         let x = "<button class='previous' value='previous' name='previous'>Previous</button>";
                     let y= "<button class='previous' value='previous' name='previous' onclick='"+msg+"'>Previous</button>";
                     b1= replaceall(y,x,fdata7);

					fs.writeFileSync("main.html", b1);
					res.write(b1);
					
			
					console.log("counter-- prev value "+ counter);
					return res.end();
				}
	        });
		}
		else{	
	    console.log("file nott found");
		}

	}
}
 else{
	 console.log("error file not found");
 }
});