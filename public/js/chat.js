$(document).ready(function () {
    //create message
    $("#message-submit").on("click", function (event) {
        event.preventDefault();


        var newMessage = {
            content: $("#message-box").val().trim(),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        };

        console.log(newMessage);

        $.ajax("api/chats", {
            type: "POST",
            data: newMessage
        }).then(function () {

            // $.post("/api/chats", newMessage)
            //     // On success, run the following code
            //     .then(function () {

                    var row = $("<div>");
                    row.addClass("Message");

                    // row.append("<p>" + newMessage.userName + " Messaged: </p>");
                    row.append("<p>" + newMessage.content + "</p>");
                    row.append(
                        "<p>At " +
                        moment(newMessage.created_at).format("h:mma on dddd") +
                        "</p>"
                $("#message-board").prepend(row));

                // });
        })
        // Empty each input box by replacing the value with an empty string
        $("#message-box").val("");
    });

    $.get("/api/chats", function (data) {

        if (data.length !== 0) {

            for (var i = 0; i < data.length; i++) {

                var row = $("<div>");
                row.addClass("message");

                row.append("<p>" + data[i].userName + " message.. </p>");
                row.append("<p>" + data[i].content + "</p>");
                row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

                $("#message-board").prepend(row);

            }

        }

    });
})
