/* eslint-disable indent */
/* eslint-disable prettier/prettier */

(function () {
    //create message
    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newMessage = {
            content: $("#messageBox").val().trim(),
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        
        $.ajax("api/chats", {
          type: "POST",
          data: newMessage
        }).then(function () {
            console.log("new message posted");
            // var row = $("<div>");
            // row.addClass("Message");

            // row.append("<p>" + newMessage.userName + " Messaged: </p>");
            // row.append("<p>" + newMessage.content + "</p>");
            // row.append(
            //     "<p>At " +
            //     moment(newMessage.created_at).format("h:mma on dddd") + "</p >"); 
            //      $(".messageBboard").prepend(row);
    
                  });
    });
    //Empty each input box by replacing the value with an empty string
    $("#message-box").val("");
});

// $.get("/api/chats", function (data) {

//     if (data.length !== 0) {

//         for (var i = 0; i < data.length; i++) {

//             var row = $("<div>");
//             row.addClass("message");

//             row.append("<p>" + data[i].userName + " message.. </p>");
//             row.append("<p>" + data[i].content + "</p>");
//             row.append("<p>At " + moment(data[i].createdAt).format("h:mma on dddd") + "</p>");

//             $("#message-board").prepend(row);

//         }

//     }

// });
    

