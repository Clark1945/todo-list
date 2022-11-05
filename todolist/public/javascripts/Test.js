// alert("Yes")
// $("#sum").click(function () {
//     var n1 = $("#num1").val();
//     var n2 = $("#num2").val();

//     var API = "http://localhost:3031/my/sum";

//     $.post(API,{num1:n1,num2:n2},function(res){
//         alert("Total = "+res.mySum);
//     });
// });

$("#sum").click(function () {
    var n1 = $("#num1").val();
    var n2 = $("#num2").val();

    var API = "http://localhost:3031/my/sum?num1="+n1+"&num2="+n2;

    $.get(API,function(res){
        alert("Total = "+res.mySum);
    });
});

