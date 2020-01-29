let newName = "";
let newRace = "";
let newDescript = "";
let newPerson = "";
let newProfess = "";

let namesList = ["Alden", "Alec", "Anton", "Arden", "Arlen", "Armand", "Arron", "Augustus", "Avery", "Benedict", "Bennett", "Branden", "Brendon", "Britt", 
"Broderick", "Carter", "Chadwick", "Chas", "Chet", "Colby", "Cole", "Cordell", "Dalton", "Damien", "Dante", "Darell", "Darius", "Darron", "Darwin", 
"Dewitt", "Diego", "Dillon", "Dirk", "Domenic", "Donovan", "Dorian", "Dorsey", "Edison", "Elden", "Elvin", "Erich", "Galen", "Garret", "Gaston", "Gavin",
"German", "Graham", "Hal", "Hank", "Harlan", "Hayden", "Herschel", "Hoyt", "Hunter", "Isaias", "Issac", "Jacinto", "Jarred", "Jonas", "Kendrick", "Keneth",
"Kennith", "Keven", "Leif", "Lenard", "Lincoln", "Linwood", "Lucius", "Lynwood", "Malcolm", "Malik", "Maxwell", "McKinley", "Merlin", "Merrill", "Michal", 
"Monty", "Newton", "Nolan", "Porter", "Quinton", "Raphael", "Reid", "Rory", "Scotty", "Shad", "Stanton", "Stefan", "Thaddeus", "Tobias", "Trenton", "Vance", 
"Walker", "Walton", "Weldon", "Wes", "Weston", "Willian", "Winford", "Wyatt"];

$(document).ready(function() {
  $("#npcBtns").hide();
  console.log("jquery ready");
});
$(document).on("click", "#npcNewBtn", function() {
  if ($("#npcBtns").css('display') == 'none') {
    $("#npcBtns").show('fast');
  } else {
    $("#npcBtns").hide('fast');
  }
});

$(function() {
  $("#nameIn").on("click", event => {
    event.preventDefault();
    newName = $("#nameForm").val().trim();
    $("#npcCardTitle").text(newName);
  });
  $("#randomName").on("click", event => {
    event.preventDefault();
    newName = namesList[Math.floor(Math.random() * 101)];
    console.log(newName)
    $("#npcCardTitle").text(newName);
  });
  $("#raceIn").on("click", event => {
    event.preventDefault();
    newRace = $("#raceForm").val().trim();
    $("#npcRace").text(newRace);
  });
  $("#descriptIn").on("click", event => {
    event.preventDefault();
    newDescript = $("#descriptForm").val().trim();
    $("#npcDescript").text(newDescript);
  });
  $("#personIn").on("click", event => {
    event.preventDefault();
    newPerson = $("#personForm").val().trim();
    $("#npcPerson").text(newPerson);
  });
  $("#professIn").on("click", event => {
    event.preventDefault();
    newProfess = $("#professForm").val().trim();
    $("#npcProfess").text(newProfess);
  });

  $("#finalizeNpc").on("click", event => {
    event.preventDefault();
    
    var newNpc = {
      fullname: newName,
      race: newRace,
      descript: newDescript,
      personality: newPerson,
      profession: newProfess
    }
    $(".npcAttr").val("");
    $.ajax("api/npcs", {
      type: "POST",
      data: newNpc
    }).then(function() {
      console.log("new npc added");
    });

  });

});

