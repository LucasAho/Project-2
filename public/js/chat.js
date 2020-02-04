/* eslint-disable indent */
/* eslint-disable prettier/prettier */
$(function() {
    var currentUser = $("#secretBtn").val();
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
                location.reload();
        
            });
            $("#postBox").val("");
        });    

});

    

