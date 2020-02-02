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

$(document).ready(function() {



$(document).on("click", "#charMaker", function() {
    if ($("#newCharForm").css('display') == 'none') {
      $("#newCharForm").show('fast');
    } else {
      $("#newCharForm").hide('fast');
    }
  });
$("#createCharBtn").on("click", function(event) {
    event.preventDefault();     
    dndSearch = (q1, q2) => {
        $.get('/search/' + q1 + '/' + q2)
            .catch(function (error) {
                console.log(error);
            }).then (res => {
            console.log(res);
        });
    }
    var thisUser = "this is not a real variable";
    var newName = $("#charName").val().trim();
    var newClass = $("#classSelect").val().trim().toLowerCase();
    var newLvl = $("#startLvl").val().trim();
    var newExp = $("#startExp").val().trim();
    var newRace = $("#raceSelect").val().trim().toLowerCase();
    var newAlign = $("#alignment").val().trim();
    var newHd = watIsScope(newClass);
    var newScores = [$("#str").val(),$("#dex").val(),$("#con").val(),$("#int").val(),$("#wis").val(),$("#cha").val()];
    var newProf = getProfBonus(newLvl);
    var newSpeed = speedFinder(newRace);
    var newAC = $("#acIn").val();
    var newInv = "This is placeholder data";
    var newNote = "This is placeholder data";
    dndSearch('classes', newClass);

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
    $.ajax("api/chars", {
        type: "POST",
        data: newCharacter
      }).then(function() {
        console.log("new character added");
      });
    // $(".form-control").val("");
});
});
