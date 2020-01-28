$("#create-account").on("click", event => {
    event.preventDefault();
    var acctCheck = (bool) => {
        if (bool === false) {
            //do nothing
        } else {
            //check if user is supposed to be admin
        }
    }

    var newUser = {
        username: $("#newName").val().trim(),
        pass: $("#newPass").val().trim(),
        email: $("#newMail").val().trim(), 
        actType: acctCheck($("#userType").val())
    }


    $.ajax("/api/users", {
        type: "POST",
        data: newUser
    }).then(function() {
        console.log("New User added");
        //Code that loads account page
    })
});

$("#log-in").on("click", event => {
    event.preventDefault();

    var thisUser = {
        username: $("#thisName").val().trim(),
        pass: $("#thisPass").val().trim(),
        actType
    }

    $.ajax("/api/users", {
        type: "GET",
        function(data) {
            //if data === thisUser
            //else display wrong user/pass
        }

    })
});