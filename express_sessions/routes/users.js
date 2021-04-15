var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var ObjectId = mongojs.ObjectId;

var db = mongojs('clientesapp', ['users'])

// enrutamiento
router.get("/", function(req, res) {
  // res.send("Hello World!");
  if(req.session.email) {
    db.users.find( function(err, docs) {

      if (err) {
          console.log(err);
      } else {
          res.render('index', {
              title:'Customers',
              users: docs,
          }); 
      }
      
    });
  }else{
    res.end('<h1>Debes iniciar sesión.</h1>');
  }

});

router.post("/users/add", function(req, res) {

  if(req.session.email){

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
  }else{
    res.end('<h1>Debes iniciar sesión.</h1>');
  }

});

router.post('/users/edit/:id', function(req,res){

  if(req.session.email){
    req.checkBody("first_name", "El nombre es obligatorio").notEmpty();
    req.checkBody("last_name", "El apellido es obligatorio").notEmpty();

    req.checkBody("email", "El email es obligatorio").notEmpty();

    var errors = req.validationErrors();

    if (errors) {

        res.render('index', {
                    title:'Customers',
                    errors: errors
        }); 
        console.log(errors)
    }else{
        var newUser = {
            "first_name" : req.body.first_name,
            "last_name" : req.body.last_name,
            "email" : req.body.email
        };

        console.log(newUser);
        console.log( ObjectId(req.params.id));

        db.users.update({"_id": ObjectId(req.params.id)},newUser, function( err, resp ) {
            if (err) {
                console.log(err);
            } else {
                console.log(resp);
                
            }

        });
    }
    res.redirect('/');
  }else{
    res.end('<h1>Debes iniciar sesión.</h1>');
  }
});

router.delete('/users/delete/:id', function(req, res){
	if(req.session.email){
    db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
      if (err){
          console.log(err);
      }

      res.redirect(303, '/');
    });
  }else{
    res.end('<h1>Debes iniciar sesión.</h1>');
  }
});

router.get('/users/find/:id', function(req,res){
  if(req.session.email){
    db.users.find({_id:ObjectId(req.params.id)}, function(err, result){
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    });
  }else{
    res.end('<h1>Debes iniciar sesión.</h1>');
  }
});

module.exports = router;