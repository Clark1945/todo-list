var express= require('express')
var router=express.Router()

router.get('/hello',function(req,res){ //路由路徑
    return res.send("Good")
});

// router.post('/sum',function(req,res){
//     var n1=parseInt(req.body.num1);
//     var n2=parseInt(req.body.num2);
//     var sum = n1+n2;
//     res.json({'mySum':sum});
// });
router.get('/sum',function(req,res){
    var n1=parseInt(req.query.num1);
    var n2=parseInt(req.query.num2);
    var sum = n1+n2;
    res.json({'mySum':sum});
});
// router.get('/myrouter',function (req,res){

// });
// router.post('/myrouter',function(req,res){

// });
module.exports=router