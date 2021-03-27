var express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage});

var pedido = upload.any();

router.post('/add', pedido, (req,res) => {

    if(req.fileValidationError){
        return res.send(req.fileValidationError);
    }else if(!req.files){
        return res.send('Por favor, sube una imagen');
    }

    let result = [{
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email,
        numBook: req.body.numBook
    }];

    const files = req.files;
    let index, len;
    for(index=0, len= files.length; index<len; ++index){
        result.push({
            file: req.files[index].path.replace("public","")
        });
    }

    res.send(result);
}); 

module.exports = router;
