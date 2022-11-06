var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/todolist',{useNewUrlParser: true}); //連線到DB，取消顯示某提示。使用IP位址而不是localhost
var db = mongoose.connection; //以變數儲存資料庫，以便使用方法
db.on('error',console.error.bind(console, 'connection error:')); //on 可檢測目前資料庫的狀況，若發生error則印出錯誤內容
db.once('open',function(){
  console.log("Connected!");//如果狀態為OPEN 則印出字串
});
var listSchema = new mongoose.Schema({ //定義Schema
  title:String,
  content:String,
  status:Boolean
});
listSchema.set('collection','todolist');//設定collection 表名稱為test
var model = mongoose.model('todolist',listSchema); //model名稱, 要載入的Schema
module.exports=model
