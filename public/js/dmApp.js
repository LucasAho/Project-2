let newName = "";
let newRace = "";
let newDescript = [];
let newPerson = "";
let newProfess = "";

const namesList = [
  "Alden", "Alec", "Anton", "Arden", "Arlen", "Armand", "Arron", "Augustus", "Avery", "Benedict", "Bennett", "Branden", "Brendon", "Britt", 
"Broderick", "Carter", "Chadwick", "Chas", "Chet", "Colby", "Cole", "Cordell", "Dalton", "Damien", "Dante", "Darell", "Darius", "Darron", "Darwin", 
"Dewitt", "Diego", "Dillon", "Dirk", "Domenic", "Donovan", "Dorian", "Dorsey", "Edison", "Elden", "Elvin", "Erich", "Galen", "Garret", "Gaston", "Gavin",
"German", "Graham", "Hal", "Hank", "Harlan", "Hayden", "Herschel", "Hoyt", "Hunter", "Isaias", "Issac", "Jacinto", "Jarred", "Jonas", "Kendrick", "Keneth",
"Kennith", "Keven", "Leif", "Lenard", "Lincoln", "Linwood", "Lucius", "Lynwood", "Malcolm", "Malik", "Maxwell", "McKinley", "Merlin", "Merrill", "Michal", 
"Monty", "Newton", "Nolan", "Porter", "Quinton", "Raphael", "Reid", "Rory", "Scotty", "Shad", "Stanton", "Stefan", "Thaddeus", "Tobias", "Trenton", "Vance", 
"Walker", "Walton", "Weldon", "Wes", "Weston", "Willian", "Winford", "Wyatt"
];
<<<<<<< HEAD
//Last names for later
//"Tate", "Sandoval", "Ellis", "Soto", "Choi", "Cuevas", "Juarez", "Castillo", "Stanley", "Mcmillan", "Odom", "Gilmore", "Archer", "Myers", "Padilla", 
//"Kline", "Dunlap", "Duffy", "Black", "Hampton", "Foley", "Osborne", "Huang", "Arnold", "Frederick", "Ellison", "Brooks", "Ballard", "Forbes", "Roman", 
//"Evans", "Gates", "Yu", "Barrera", "Blevins", "Ross", "Munoz", "Ortiz", "Garner", "Velasquez", "Beasley", "Potts", "Park", "Robbins", "Harmon", "Watson", 
//"Parks", "Atkinson", "Rowe", "Olsen", "Orozco", "Snyder", "Castro", "Meadows", "Hobbs", "Harrison", "Obrien", "Huynh", "Henry", "Morales", "Dougherty", 
//"Pope", "Nelson", "Ferguson", "Schaefer", "James", "Stewart", "Whitehead", "Glass", "Ball", "Ayala", "Faulkner", "Lambert", "Duncan", "Andrews", "Garrett", 
//"Logan", "Summers", "Randolph", "Carrillo", "Petty", "Carpenter", "Miller", "Carney", "Hardy", "Bender", "Collins", "Paul", "Jenkins", "Harper", "Mullen", 
//"Lucero", "Hale", "Jarvis", "Madden", "Cochran", "Molina", "Ochoa", "Hoover", "Edwards"
=======

>>>>>>> master
const raceList = [
  "Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling"
];

const personList = [
  "Arrogant", "Patient", "Well-Spoken", "Untrustworthy", "Rude", "Loud/Outgoing", "Helpful", "Cynical", "Shy", "Loyal"
];

const professList = [
  "Farmer", "Blacksmith", "Ranger", "Guard", "Politician", "Merchant", "Servant", "Smuggler", "Fletcher", "Chef", "Royal", "Cleric", "Carpenter", 
  "Rogue", "Herbalist", "Historian", "Alchemist", "Shop Owner", "Sheppard", "Miner", "Banker", "Bandit", "Sailor", "Veteran", "Beggar", "Fisherman",
  "Peddler", "Bard", "Wizard", "Pickpocket"
];

const descriptList = {
  face: ["ragged looking ", "large nose ", "attractive ", "missing teeth ", "ugly ", "sharp face ", "square face ", "exhausted looking ", "plain face "],
  build: ["athletic ", "muscular ", "skinny ", "lean ", "round ", "average ", "stocky "],
  misc: ["small limp ", "good stature ", "tattoos ", "shady ", "hunched ", "piercings "],
  golgiApp: function() {
    var randomFace = this.face[Math.floor(Math.random() * this.face.length)];
    var randomBuild = this.build[Math.floor(Math.random() * this.build.length)];
    var randomMisc = this.misc[Math.floor(Math.random() * this.misc.length)];
    return randomFace + ", " + randomBuild + "build, " + randomMisc;
  }
}


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
    newName = namesList[Math.floor(Math.random() * namesList.length)];
    $("#npcCardTitle").text(newName);
  });

  $("#raceIn").on("click", event => {
    event.preventDefault();
    newRace = $("#raceForm").val().trim();
    $("#npcRace").text(newRace);
  });
  $("#randomRace").on("click", event => {
    event.preventDefault();
    newRace = raceList[Math.floor(Math.random() * raceList.length)];
    $("#npcRace").text(newRace);
  });

  $("#descriptIn").on("click", event => {
    event.preventDefault();
    newDescript = $("#descriptForm").val().trim();
    $("#npcDescript").text(newDescript);
  });
  $("#randomDescript").on("click", event => {
    event.preventDefault();
    newDescript = descriptList.golgiApp();
    console.log(newDescript)
    $("#npcDescript").text(newDescript);
  });

  $("#personIn").on("click", event => {
    event.preventDefault();
    newPerson = $("#personForm").val().trim();
    $("#npcPerson").text(newPerson);
  });
  $("#randomPerson").on("click", event => {
    event.preventDefault();
    newPerson = personList[Math.floor(Math.random() * personList.length)];
    $("#npcPerson").text(newPerson);
  });

  $("#professIn").on("click", event => {
    event.preventDefault();
    newProfess = $("#professForm").val().trim();
    $("#npcProfess").text(newProfess);
  });
  $("#randomProfess").on("click", event => {
    event.preventDefault();
    newProfess = professList[Math.floor(Math.random() * professList.length)];
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
  $(".displayNpc").on("click", function(event) {
    event.preventDefault();
    btnVal = $(this).val();
    $.ajax("api/npcs/" + btnVal, {
<<<<<<< HEAD
        type: "GET"
    }).then(res => {

=======
        type: "GET",
        data: 
>>>>>>> master
    });
  });
  


});

