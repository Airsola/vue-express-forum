var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');


router.get('/',function(req,res,next){
    res.render("reg",{"title":"注册",user:req.session.user});
});
router.post('/',function(req,res,next){
    console.log('提交注册了')
    var name = req.body.name;
    var password = req.body.password;
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    var newUser = new User({
        name:name,
        password:password
    });
    newUser.get(newUser.name,function(err,user){
        if(err){
            console.log('err');
        }
        if(user){
            //req.flash("error",'用户已存在');
            console.log('用户已经存在')
            //return res.redirect('/reg');
        }
        console.log('注册信息正确')
        newUser.save(function(err,user){
            if(err){
                console.log('注册失败')
                //return res.redirect("/")
                //req.flash("error",'err');
            }
            req.session.user = newUser;
            console.log('注册完成')
            //req.flash("succuss","注册成功");
            res.redirect('/');

        })
    })
})
module.exports = router;