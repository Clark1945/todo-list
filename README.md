# todo-list

### 使用工具 
前端部分使用 HTML, CSS, Javascript , 框架部分使用 Express
加入JQuery 來實作 AJAX。  

後端的部分 使用了Node.js 與前端溝通  

前端View部分使用了jade，目前已經沒有更新，似乎無法直接換成pug，之後會再改。  

套件部分利用npm 去控制&管理專案，也使用Postman去測試各個路由是否運作正常  

##### 20221106更新
建立資料庫，資料庫選用MongoDB，並利用Robo3T管理資料庫介面。 以下有一些坑：   
※ YAML 並不支援Tab功能  
※ 使用mongoose使Node.js與MongoDB連線，需先使用npm 安裝  
※ 設定連線時，不使用localhost，用IP位址來提升精確性。  
※ 於Robo3T建立database時， 若是沒有新增任何資料進去，會在軟體關閉後被刪除。  
※ 資料庫另外存在一個模組中。  
