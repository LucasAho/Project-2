$(document).ready(function() {

    //Animations hide irrellevant info
    $(".loginForm").show();
    $(".signupForm").hide();
    $("#returnLogin").hide();

    //Function brings up sign up form and hides log in
    $("#newSignUp").on("click", function() {
        $(".loginForm").hide();
        $(".signupForm").show();
        $("#newSignUp").hide();
        $("#returnLogin").show();
    });
        
    //Function brings up log in form and hides sign up
    $("#returnLogin").on("click", function() {
        $(".loginForm").show();
        $(".signupForm").hide();
        $("#newSignUp").show();
        $("#returnLogin").hide();
    });

    //Function takes in string and returns boolean 
    acctCheck = (userIn) => {
        //Dm account is true in database
        if (userIn === "Dungeon Master") {
            return 0;
        //Player account is false in database
        } else if (userIn === "Player") {
            return 1;
        } else {
            console.log("this isn't in my programming");
        }
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    //Code runs when user presses sign up form
    $("#sign-up").on("click", function(event) {
        event.preventDefault();

        //Function checks that user's passwords match
        var passCheck = (p1,p2) => {
            if (p1 === p2 && p1.length !== 0) {
                return p1;
            } else {
                alert("Please enter matching passwords")
            }
        }

        //Condition ensures that form is filled
        if ($("#suUser").val().trim() == "" || $("#suEmail").val().trim() == "") {
            alert("Please complete the signup form")
        //Else statement runs when form is finished
        } else if (validateEmail($("#suEmail").val().trim()) == false) {
            alert("Please enter a valid email");
        } else {

            //Info needed for signing up is stored in newUser object
            var newUser = {
                username: $("#suUser").val().trim(),
                pass: passCheck($("#suPass").val().trim(), $("#suPass2").val().trim()),
                email: $("#suEmail").val().trim(), 
                actType: acctCheck($("#acctType").val())
            }
            
            //AJAX post adds a new user to the database
            $.ajax("/api/users", {
                type: "POST",
                data: newUser
            }).then(function() {
                //After player account is added, they will be brought back to the login
                $(".loginForm").show();
                $(".signupForm").hide();
                $("#newSignUp").hide();
                $("#returnLogin").show();
                console.log("New User added");
            });

            //Clears sign up form
            $("#suUser").val("");
            $("#suPass").val("");
            $("#suPass2").val("");
            $("#suEmail").val(""); 
        }
    });
    
    //This listens for a login and validates it against the database
    $("#log-in").on("click", function(event) {
        event.preventDefault();

        //Storing variables used to log in
        var thisEmail = $("#emailLog").val().trim();
        var thisPass = $("#passLog").val().trim();
        
        //Checking if the inputs are filled in
        if (thisEmail == 0 || thisPass == 0) {
            alert("Please fill out the form");
        } else {
            //Stores user's login info in an object
            var thisUser = {
                email: thisEmail,
                pass: thisPass,
            }

            //Ajax post runs user login into user database
            $.ajax("/api/logins", {
                type: "POST",
                data: thisUser
            }).then(res => {
                //First condition returns if user login isnt found
                if (res == null) {
                    alert("Sorry, that email and password don't match");
                //Condition runs if user has a DM account
                } else if (res.actType == 0) {
                    location.href = "/dm/" + res.id;
                //Condition runs if user has player account
                } else {
                    location.href = "/player/" + res.id;
                }
            });
        }    
    });

});
