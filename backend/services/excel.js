var Excel = require('exceljs');
var path=require('path');
var fs=require("fs");
var gresults = require("./generateResults");
var ResultModel = require("../models/results");
var AnswersheetModel = require("../models/answersheet");
var TestpaperModel = require("../models/testpaper");


let result = (testid,MaxMarks)=>{
  return new Promise((resolve,reject)=>{
    var workbook = new Excel.Workbook();
    TestpaperModel.findOne({_id : testid,testconducted : true},{testconducted : 1,type:1,title:1}).then((test)=>{
      if(!test){
        reject(test)
      }else{
        ResultModel.find({testid : testid},{score : 1,userid : 1,testid: 1})
        .populate('userid')
        .populate('testid')
        .exec().then((results)=>{
            //console.log(results)
            //resolve(results)
            //excel sheet
            MaxMarks(testid).then((Mmarks)=>{
              var worksheet = workbook.addWorksheet('Results',{pageSetup:{paperSize: 9, orientation:'landscape'}});
              
              
              worksheet.columns = [
                { header: 'Type', key: 'Type', width: 20 },
                { header: 'Test-Title', key: 'Title', width: 20 },
                { header: 'Name', key: 'Name', width: 30 },
                { header: 'Email', key: 'Email', width: 70 },
                { header: 'Contact', key: 'Contact', width: 35, outlineLevel: 1 },
                { header: 'Organisation', key: 'Organisation', width: 70 },
                { header: 'Score', key: 'Score', width: 20 },
                { header: 'Max Marks', key: 'Outof', width : 20}

              ];
              let M =Mmarks;
              
              results.map((d,i)=>{
                worksheet.addRow({Name: d.userid.name, Email: d.userid.emailid, Contact : d.userid.contact,Organisation : d.userid.organisation,Type : d.testid.type,Title : d.testid.title,Score : d.score,Outof:M});
              })
              
              // New S3 logic
              workbook.xlsx.writeBuffer().then((buffer) => {
                  const fileName = `results/result-${testid}-${Date.now()}.xlsx`;
                  const { uploadToS3 } = require("./s3");
                  
                  uploadToS3(buffer, fileName, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                  .then((url) => {
                      resolve(url); // Now resolving with the public S3 URL
                  }).catch((err) => {
                      reject(err);
                  });
              }).catch((err) => {
                  reject(err);
              });

            })
            .catch((err)=>{
               reject(err)
            })
          
        }).catch((err) => {
            reject(err)
        });
      }
    }).catch((err)=>{
          reject(err)
      })
    
  })
 
}
module.exports ={result};
    
