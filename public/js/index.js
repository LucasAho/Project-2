$(document).ready(function() {
    $(".loginForm").show();
    $(".signupForm").hide();

    $("#newSignUp").on("click", function() {
        $(".loginForm").hide();
        $(".signupForm").show();
    });
});
$("#sign-up").on("click", function(event) {
    event.preventDefault();
    var passCheck = (p1,p2) => {
        if (p1 === p2 && p1.length !== 0) {
            return p1;
        } else {
            alert("Please enter matching passwords")
        }
    }

    if ($("#suUser").val().trim() == "" || $("#suEmail").val().trim() == "") {
        alert("Please complete the signup form")
    } else {
        var newUser = {
            username: $("#suUser").val().trim(),
            pass: passCheck($("#suPass").val().trim(), $("#suPass2").val().trim()),
            email: $("#suEmail").val().trim(), 
            actType: 1,
        }

        $.ajax("/api/users", {
            type: "POST",
            data: newUser
        }).then(function() {
            $(".loginForm").show();
            $(".signupForm").hide();
            console.log("New User added");
        });
    }
});

$("#log-in").on("click", function(event) {
    event.preventDefault();
    var thisUser = {
        email: $("#emailLog").val().trim(),
        pass: $("#passLog").val().trim(),
    }

    $.ajax("/api/users/" + thisUser.email, {
        type: "GET"
    }).then(res => {
        console.log(res);
        if (res == null) {
            alert("That user and password do not match");
        } else {
            window.location.href = window.location.href + "player";
        }
    });
});