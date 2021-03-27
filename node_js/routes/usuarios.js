var express = require("express");
const router = express.Router();
var mongojs = require('mongojs')
var ObjectId = mongojs.ObjectId;

var db = mongojs('clientesapp', ['users'])

router.get("/", function(req,res){

    db.users.find(function(err, docs){

        if(err){
            res.send(err);
            return;
        }

        res.render('/home/dawe/node_js/public/usuarios_mongo/index',{
            title: 'Customers',
            users: docs,
        });
    })
});


router.post("/add", function(req, res) {

    req.checkBody("first_name", "El nombre es obligatorio").notEmpty();
    req.checkBody("last_name", "El apellido es obligatorio").notEmpty();

    req.checkBody("email", "El email es obligatorio").notEmpty();


    var errors = req.validationErrors();

    if (errors) {

        res.render('index', {
                    title:'Customers',
                    errors: errors
        });

    }else{

        var newUser = {
            "first_name" : req.body.first_name,
            "last_name" : req.body.last_name,
            "email" : req.body.email
        };

        db.users.insert( newUser, function( err, resp ) {
            if (err) {
                console.log(err);
            } else {
                db.users.insert( newUser );
            }

        });

    }

    res.redirect('/');
});

router.delete('delete/:id', function(req, res){
	// console.log(req.params.id);
	db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
		if (err){
				console.log(err);
		}

		res.redirect(303, '/');
	});
});

module.exports = router;