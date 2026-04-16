const { s3Client } = require("../services/s3");
const multerS3 = require('multer-s3');

var upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, 'uploads/' + Date.now().toString() + '-' + file.originalname)
    }
  })
});

router.post('/', upload.single('file'),(req,res,next)=>{
    console.log(req.file);
    res.json({
        success:true,
        message:'File uploaded successfully',
        link: req.file.location // multer-s3 provides the S3 URL in req.file.location
    })
});



module.exports=router;



