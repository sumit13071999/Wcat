#!/usr/bin/env node


const fs = require("fs");
let arguments=process.argv.slice(2);
let filename=[];
let flag=[];
let secondaryArguments=[];
for(let args of arguments){
    if(args[0]=='-'){
        flag.push(args);
    }else if(args[0]=='%'){
     secondaryArguments.push(args.slice(1));
    }else{
        filename.push(args);
    }
}
// console.log(secondaryArguments);
// console.log(flag);
// console.log(filename);
// if(flg.length==0){
//  for(let file of filename){
//      console.log(fs.readFileSync(file,"utf-8"));
//  }   
// }else{
    
// }
for(let file of filename){
let fileData=fs.readFileSync(file,"utf-8");
    for(let flg of flag){
    if(flg=="-rs"){
      fileData=removeAll(fileData," ");
    }
     if(flg=="-rn"){
        fileData=removeAll(fileData,"\r\n");
    }
    // remove special character
    if(flg=="-rsc"){
         for(let secArgs of secondaryArguments){
             fileData=removeAll(fileData,secArgs);
             
         }
    }
    // add sequence number in every line 
    if(flg=="-s"){
        let a=fileData.split("\r\n");
        let counter=0;
        let file="";
        for(let i=0;i<a.length;i++){
         file+=counter+" "+a[i]+"\r\n";
         counter++;
        }
        fileData=file;
    }
    // add sequence number in non empty line 
    if(flg=="-sn"){
        let a=fileData.split("\r\n");
        let counter=0;
        let file="";
        for(let i=0;i<a.length;i++){
          //  console.log(ar.length);
            if(a[i].length>0 && a[i]!=" "){
         file+=counter+" "+a[i]+"\r\n";
         counter++;
            }else{
                file+=a[i]+"\r\n";
            }
        }
        fileData=file;
    }
    // remove exta lines
    // minimum one empty line have after non empty line
    if(flg=="-rel"){
      let a=fileData.split("\r\n");
      let count = 0;
      let file="";
      let i=1;
      let str=a[0];
     // console.log(a.length);
      if(i<a.length && str.replace(" ","").length==0){
        while(i<a.length && str.replace(" ","").length==0){
      str=a[i];
        i++;
      }
    }else{
        file+=count+" "+a[0]+"\r\n";
        count++;
    }
     // console.log(i);
      for( ;i<a.length;i++){
          str=a[i];
        //  console.log(str.replace(" ","").length);
          if(str.replace(" ","").length>=1){
              file+=count+" "+a[i]+"\r\n";
              count++;
          }else{
            if(a[i-1].replace(" ","").length!=0){
              file+="\r\n";
            }
              
          }

        }
      
      fileData=file;

    }
    // append many files in  c.txt file
    if(flg=="-af"){
        fs.appendFileSync("c.txt",fileData);
        fileData=fs.readFileSync("c.txt","utf-8");
    }
    
    if(flg=="-w"){
        fs.writeFileSync("s.txt","");
    }
       
}
console.log(fileData);
}
function removeAll(str,removalData){
    return str.split(removalData).join("");
}