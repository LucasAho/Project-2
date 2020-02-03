$(document).ready(function() {
    $(".loginForm").show();
    $(".signupForm").hide();
    $("#returnLogin").hide();
    $("#newSignUp").on("click", function() {
        $(".loginForm").hide();
        $(".signupForm").show();
        $("#newSignUp").hide();
        $("#returnLogin").show();
    });
    $("#returnLogin").on("click", function() {
        $(".loginForm").show();
        $(".signupForm").hide();
        $("#newSignUp").show();
        $("#returnLogin").hide();
    });

acctCheck = (userIn) => {
    if (userIn === "Dungeon Master") {
        return 0;
    } else if (userIn === "Player") {
        return 1;
    } else {
        console.log("this isn't in my programming");
    }
}

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
            actType: acctCheck($("#acctType").val())
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
    var thisEmail = $("#emailLog").val().trim();
    var thisPass = $("#passLog").val().trim();
    
    if (thisEmail == 0 || thisPass == 0) {
        alert("Please fill out the form");
    } else {
        var thisUser = {
            email: thisEmail,
            pass: thisPass,
        }

        $.ajax("/api/logins", {
            type: "POST",
            data: thisUser
        }).then(res => {
            console.log(res);
            if (res == null) {
                alert("Sorry, that email and password don't match");
            } else if (res.actType == 0) {
                location.href = "/dm/" + res.id;
            } else {
                location.href = "/player/" + res.id;
            }
        });
    }    
});

});
