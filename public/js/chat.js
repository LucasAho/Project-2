var util = require("util");
var readline = require("readline");
var {JSDOM} = require("jsdom");
var { ChatManager, TokenProvider } = require("@pusher/chatkit-client");
var axios = require("axios");
var prompt = require("prompt");
var ora = require("ora");

//makes the chatkit compatable with Node (place in public/js/chats???)
var makeChatkitNodeCompatible = () => {
    var { window } = new JSDOM();
    global.window = window;
    global.navigator = {};
};

makeChatkitNodeCompatible();

// authentication section (keep or move)
var authenticate = async username => {
    try {
        await axios.post("http://localhost:3000/users", { username });
    } catch ({ message }) {
        throw new Error(`Failed to authenticate, ${message}`);
    }
};

var main = async () => {
    var spinner = ora();
    try {
        prompt.start();
        prompt.message = "";

        var get = util.promisify(prompt.get);

        var usernameSchema = [
            {
                description: "Enter your username",
                name: "username",
                type: "string",
                pattern: /^[a-zA-Z0-9\-]+$/,
                message: "Username must be only letters, numbers, or dashes",
                required: true
            }
        ];

        var { username } = await get(usernameSchema);

        try {
            spinner.start("Authenticating..");
            await authenticate(username);
            spinner.succeed(`Authenticated as ${username}`);
        } catch (err) {
            spinner.fail();
            throw err;
        }

        //connects to our chatkit and creates a tokenprovider (keep or move)
        var chatManager = new ChatManager({
            instanceLocator: "v1:us1:c70a1536-cdbd-4df5-8b0c-11a8df75c578",
            userId: username,
            tokenProvider: new TokenProvider({
                url: "http://localhost:3000/authenticate"
            })
        })

        spinner.start("Connecting to Pusher..");
        var currentUser = await chatManager.connect();
        spinner.succeed("Connected");

        spinner.start("Fetching rooms..");
        var joinableRooms = await currentUser.getJoinableRooms();
        spinner.succeed("Fetched rooms");

        var availableRooms = [...currentUser.rooms, ...joinableRooms];

        if (!availableRooms)
            throw new Error(
                "Couldn't find any available rooms. If you're the developer, go to dash.pusher.com, open your Chatkit instance, and create a room (or two!) using the Inspector tab!"
            );

        console.log("Available rooms:");
        availableRooms.forEach((room, index) => {
            console.log(`${index} - ${room.name}`);
        });

        var roomSchema = [
            {
                description: "Select a room",
                name: "room",
                type: "number",
                cast: "integer",
                pattern: /^[0-9]+$/,
                conform: v => {
                    if (v >= availableRooms.length) {
                        return false;
                    }
                    return true;
                },
                message: "Room must only be numbers",
                required: true
            }
        ];

        var { room: chosenRoom } = await get(roomSchema);
        var room = availableRooms[chosenRoom];

        spinner.start(`Joining room ${chosenRoom}..`);

        await currentUser.subscribeToRoomMultipart({
            roomId: room.id,
            hooks: {
                onMessage: message => {
                    var { sender, parts } = message
                    if (sender.id === username) {
                        return
                    }
                    console.log(`${sender.id}: ${parts[0].payload.content}`)
                }
            },
            messageLimit: 0

        })
        spinner.succeed(`Joined ${room.name}`);
        console.log(
            "You may now send and receive messages. Type your message and hit <Enter> to send."
        );

        var input = readline.createInterface({ input: process.stdin });

        input.on("line", async text => {
            await currentUser.sendSimpleMessage({ roomId: room.id, text });
        });
    } catch (err) {
        spinner.fail();
        console.log(err);
        process.exit(1);
    }
};

main();

// $("#message-submit").on("click", function (event) {
//     event.preventDefault();
    

//     var newMessage = {
//         userName: $("#userName").val().trim(),
//         body: $("#message-box").val().trim(),
//         created_at: moment().format("YYYY-MM-DD HH:mm:ss")
//     };

//     console.log(newMessage);

//     $.post("/api/new", newMessage)
//         // On success, run the following code
//         .then(function () {

//             var row = $("<div>");
//             row.addClass("Message");

//             row.append("<p>" + newMessage.userName + " Messaged: </p>");
//             row.append("<p>" + newMessage.body + "</p>");
//       row.append(
//         "<p>At " +
//           moment(newMessage.created_at).format("h:mma on dddd") +
//           "</p>"
//             $("#message-board").prepend(row);

//         });

//     // Empty each input box by replacing the value with an empty string
//     $("#author").val("");
//     $("#message-box").val("");
// });

// $.get("/api/all", function(data) {

//     if (data.length !== 0) {
  
//       for (var i = 0; i < data.length; i++) {
  
//         var row = $("<div>");
//         row.addClass("message");
  
//         row.append("<p>" + data[i].userName + " message.. </p>");
//         row.append("<p>" + data[i].body + "</p>");
//         row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");
  
//         $("#message-board").prepend(row);
  
//       }
  
//     }
  
//   });