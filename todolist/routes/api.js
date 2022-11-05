var express = require("express");
var router = express.Router();

var listModel=[];
var id=1;

router.post('/addList',function (req,res){
    var newList= {
        _id:id,
        title:req.body.title,
        content:req.body.content,
        status:false
    };
    listModel.push(newList);
    id++;
    
    res.json({"status":0,"msg":"success","data":newList});
});

router.get('/getList',function (req,res){
    res.json(listModel);
});

router.post('/updateList',function(req,res){
    var id = req.body.id;
    var index = listModel.findIndex(item =>item._id == id); //取得代辦清單陣列中，相符id的index索引
    listModel[index].title=req.body.title;
    listModel[index].content=req.body.content;
    res.json({'status':0,"msg":"success"});
});

router.post('/removeList',function (req,res){
    var id = req.body.id;
    var index = listModel.findIndex(item => item._id==id);
    listModel.splice(index,1); //帶入索引值 並進行刪除
    res.json({'status':0,'msg':'success'});
});

router.post('/changeStatus',function(req,res){
    var id = req.body.id;
    var index = listModel.findIndex(item => item._id ==id);
    if (listModel[index].status){
        listModel[index].status=false;
    }
    else{
        listModel[index].status=true;
    }
    res.json({"status":0,"msg":"success"});
});
module.exports=router;