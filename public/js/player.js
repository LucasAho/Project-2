/* eslint-disable indent */
/* eslint-disable prettier/prettier */



getProfBonus = function (lvl) {
    if (lvl < 5) {
        return 2;
    } else if (lvl > 4 && lvl < 9) {
        return 3;
    } else if (lvl > 8 && lvl < 13) {
        return 4;
    } else if (lvl > 12 && lvl < 17) {
        return 5;
    } else {
        return 6;
    }
};
speedFinder = (race) => {
    if (race == "halfling" || race == "gnome"|| race == "dwarf") {
        return 25;
    } else {
        return 30;
    }
}

watIsScope = (classes) => {
    if (classes === "barbarian") {
        return 12;
    } else if (classes === "bard" || classes === "cleric" || classes === "druid" || classes === "monk" || classes === "rogue" || classes === "warlock") {
        return 8;
    } else if (classes === "fighter" || classes === "paladin" || classes === "ranger") {
        return 10;
    } else {
        return 6;
    }
}

var thisSearch1;
var thisSearch2;
$("#submitSearchQuery").on("click", event => {
    event.preventDefault();
    thisSearch1 = $("#searchIn1").val().trim();
    thisSearch2 = $("#searchIn2").val().trim();
    console.log($("#searchIn2").val().trim() );
    $.ajax("/search/5e", {
        type: "POST",
        data: {
            searchType: thisSearch1,
            searchContent: thisSearch2 
        }
    }).then(function(res) {
        console.log(res);
        
    })
})


$(document).on("click", "#charMaker", function() {
    $("#newCharForm").show('fast');
});

$(document).ready(function() {
    $("#newCharForm").hide();

$("#createCharBtn").on("click", function(event) {
    event.preventDefault();     
    var thisUser = parseInt($(this).val());
    var newName = $("#charName").val().trim();
    var newClass = $("#classSelect").val().trim().toLowerCase();
    var newLvl = parseInt($("#startLvl").val().trim());
    var newExp = parseInt($("#startExp").val().trim());
    var newRace = $("#raceSelect").val().trim().toLowerCase();
    var newAlign = $("#alignment").val().trim();
    var newHd = watIsScope(newClass);
    var newScores = [parseInt($("#str").val()),parseInt($("#dex").val()),parseInt($("#con").val()),parseInt($("#int").val()),parseInt($("#wis").val()),parseInt($("#cha").val())];
    var newProf = getProfBonus(newLvl);
    var newSpeed = speedFinder(newRace);
    var newAC = parseInt($("#acIn").val());
    var newInv = $("#invForm").val().trim();
    var newNote = $("#noteForm").val().trim();

    var newCharacter = {
        user_id: thisUser,
        charName: newName, 
        class: newClass, 
        lvl: newLvl, 
        race: newRace, 
        align: newAlign, 
        experience: newExp,    
        profBonus: newProf, 
        AC: newAC, 
        speed: newSpeed, 
        maxHd: newHd, 
        strength: newScores[0], 
        dex: newScores[1], 
        constitution: newScores[2], 
        intelligence: newScores[3], 
        wisdom: newScores[4], 
        charisma: newScores[5],
        inventory: newInv, 
        notes: newNote
    }  
    console.log(newCharacter);
    $.ajax("/api/chars", {
        type: "POST",
        data: newCharacter
      }).then(function() {
        console.log("new character added");
        location.reload();
      });
    // $(".form-control").val("");
});
});
