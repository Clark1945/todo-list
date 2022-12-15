function addList(){
    var _title = $('#title').val();
    var _message = $('#message').val();
    const reg = /<\/*[a-z]+>/;
    _title=_title.replace(reg,'')
    _message=_message.replace(reg,'')

    if (_title == '' || _message == ''){
        alert("欄位未輸入");
    }
    else{
        $.post("http://localhost:3031/api/List",{'title':_title,content:_message},
        function (res){
            // console.log(res.data);
            newList(res.data);
            $('#title').val('');
            $('#message').val('');
        });
    }
}
function newList(data){

    var status = (data.status)?"checked":"";
    var titleClass = (data.status)?"title2":"title";
    var messageClass = (data.status)?"message2":"message";
    var editClass = (data.status)?"none":"inline";

    
    var content = `
    <div class="content" id="${data._id}">
        <div class="${titleClass}">
            <input type="checkbox" onclick="changeStatus('${data._id}',this)"/>
            <text id ="title${data._id}">${data.title}</text>
            <button class ="i_btn" onclick = "removeList('${data._id}')">
                刪除
            </button>
            <button class="i_btn" id="edit${data._id}" style = "display:${editClass}" onclick="editList('${data._id}')">
                修改
            </button>
            <button class="i_btn" id="update${data._id}" style = "display:none" onclick="updateList('${data._id}')"> 
                確認
            </button>
        </div>
        <div class="${messageClass}">
            <text id ="message${data._id}">${data.content}</text>
        </div>
    </div>`
    $("body").append(content);
}

function getList(){
    $.get("http://localhost:3031/api/List",function(data,status){
        for (var i=0;i<data.length;i++){
            newList(data[i])
        }
    });
}

getList();

function editList(id){
    $('#edit'+id).css("display","none");
    $('#update'+id).css("display","inline");  //Button修改

    var input = document.createElement("input");
    input.type = "text";
    input.id = "edit_title"+id;
    input.value = $("#title"+id).text();
    input.size = Math.max(20/4*3,4);  //設定Input

    $("#title"+id).css("display","none");
    $("#title"+id).parent().append(input);  //加入 Input text

    var message_input = document.createElement("input");
    message_input.type = "text";
    message_input.id = "edit_message"+id;
    message_input.value = $('#message'+id).text();
    message_input.size = Math.max(50/4*3,4);  //設定Input

    $('#message'+id).css("display","none"); 
    $('#message'+id).parent().append(message_input);  //加入Input text
}

function updateList(id){
    var title = $('#edit_title'+id).val();
    var message = $('#edit_message'+id).val();

            $.ajax({
            url:"http://localhost:3031/api/List",
            data:{'id':id,'title':title,'content':message},
            type:"PUT",
            success:function (res){
                if (res.status==0){
                    $('#title'+id).text(title); // title中顯示文字
                    $('#message'+id).text(message); //message中顯示文字
                    $('#edit'+id).css("display","inline"); //edit顯示
                    $('#update'+id).css("display","none"); //update隱藏
                    $('#title'+id).css("display","inline"); 
                    $('#message'+id).css("display","inline");
                    $('#edit_title'+id).remove();
                    $('#edit_message'+id).remove();
                }
            }
        });
    // $.post("http://localhost:3031/api/updateList",{'id':id,'title':title,'content':message},function (res){
    //     if (res.status==0){
    //         $('#title'+id).text(title); // title中顯示文字
    //         $('#message'+id).text(message); //message中顯示文字
    //         $('#edit'+id).css("display","inline"); //edit顯示
    //         $('#update'+id).css("display","none"); //update隱藏
    //         $('#title'+id).css("display","inline"); 
    //         $('#message'+id).css("display","inline");
    //         $('#edit_title'+id).remove();
    //         $('#edit_message'+id).remove();
    //     }
    // });
}

function removeList(id){
    $.ajax({
        url:"http://localhost:3031/api/List",
        data:{'id':id},
        type:"DELETE",
        success:function (res){
            if (res.status==0){
                $('#'+id).remove();
            }
        }
    });
    // $.post("http://localhost:3031/api/List",{"id":id},function (res){
    //     if (res.status==0){
    //         $('#'+id).remove();
    //     }
    // });

}

function changeStatus(id,btnStatus){
    var title = btnStatus.parentNode; //存入checkbox的父節點
    var message = title.nextElementSibling; //存入title的下一個節點

    $.post("http://localhost:3031/api/changeStatus",{"id":id,"status":btnStatus.checked},function (res){
        if(res.status==0){
            if(btnStatus.checked){
                title.className="title2"; // 改變樣式
                message.className="message2"; // 改變樣式
                $("#edit"+id).css("display","none");
                $("#update"+id).css("display","none");

                if(document.getElementById("edit_title"+id)){
                    $("#title"+id).css("display","inline");
                    $("#message"+id).css("display","inline");
                    $("edit_title"+id).css("display","none");
                    $("edit_message"+id).css("display","none");
                }
            }
            else{
                title.className="title";
                message.className="message";
                $("#edit"+id).css("display","inline");
            }
        }
    });
}