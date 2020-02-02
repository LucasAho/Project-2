import { urlencoded } from "body-parser";

/* eslint-disable indent */
/* eslint-disable prettier/prettier */

(function () {
    //create message
    $(".create-form").on("send", function (event) {
        event.preventDefault();
        

        var newPost = {
            user_id: $()
            username:
            content: $("#postBox").val().trim(),
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        
        $.ajax("api/chats", {
          type: "POST",
          data: newPost
        })
        .then(function () {
            console.log("new message posted");

            var row = $("<div>");
            row.addClass("postMessage");

            row.append("<p>" + newPost.userName + " Messaged: </p>");
            row.append("<p>" + newPost.content + "</p>");
            row.append("<p>At " + moment(newPost.created_at).format("h:mma on dddd") + "</p >"); 
            $(".postBboard").prepend(row);
    
        });
    });
    //Empty each input box by replacing the value with an empty string
    $("#message-box").val("");
});


$.get("/api/post", function (data) {

    if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {

            var row = $("<div>");
            row.addClass("postMessage");

            row.append("<p>" + data[i].userName + " message.. </p>");
            row.append("<p>" + data[i].content + "</p>");
            row.append("<p>At " + moment(data[i].createdAt).format("h:mma on dddd") + "</p>");

            $(".postboard").prepend(row);

        }

    }

});
    

