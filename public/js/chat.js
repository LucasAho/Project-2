/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var currentUser = $("#secretBtn").val();
$(function () {
    //create message
    $("#sendPost").on("click", function(event) {
        event.preventDefault();
        var newPost = {
            content: $("#postBox").val().trim(),
        };

        $.ajax("/api/chat/" + currentUser, {
          type: "POST",
          data: newPost
        })
        .then(function (res) {
            console.log(res);
            console.log("new message posted");

            var row = $("<div>");
            row.addClass("postMessage");

            row.append("<p>" + newPost.userName + " Messaged: </p>");
            row.append("<p>" + newPost.content + "</p>");
            // row.append("<p>At " + moment(newPost.createdAt).format("h:mma on dddd") + "</p >"); 
            $(".postBboard").prepend(row);
    
        });
        $("#postBox").val("");
    });
    //Empty each input box by replacing the value with an empty string
   
});


// $.get("/api/post", function (data) {

//     if (data.length !== 0) {

//         for (var i = 0; i < data.length; i++) {

//             var row = $("<div>");
//             row.addClass("postMessage");

//             row.append("<p>" + data[i].userName + " message.. </p>");
//             row.append("<p>" + data[i].content + "</p>");
//             row.append("<p>At " + moment(data[i].createdAt).format("h:mma on dddd") + "</p>");

//             $(".postboard").prepend(row);

//         }

//     }

// });
    

