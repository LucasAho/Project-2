$("#create-account").on("click", event => {
    event.preventDefault();

    var newUser = {
        username: $("#newName").val().trim(),
        pass: $("#newPass").val().trim(),
        email: $("#newMail").val().trim(), 
        actType: $("#userType").val()
    }


    $.ajax("/api/users", {
        type: "POST",
        data: newUser
    }).then(function() {
        console.log("New User added");
        //Code that loads account page
    })
})
