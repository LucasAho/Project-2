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
$("#submitSearch1").on("click", event => {
    event.preventDefault();
    
    thisSearch1 = $("#searchIn1").val().trim();
    
   
    $.ajax("/search/5e", {
        type: "POST",
        data: {
            searchType: thisSearch1,
            searchContent: ""
        }
    }).then(function(res) {
        for (var i = 0; i < res.results.length; i++) {
            $("#searchIn2").append("<option>" + res.results[i].index + "</option>")
            $("#search2Form").show();
        }

    });
    $("#searchIn2").empty(); 
});
$("#submitSearchQuery").on("click", event => {
    event.preventDefault();
    thisSearch2 = $("#searchIn2").val().trim();
    $.ajax("/search/5e", {
        type: "POST",
        data: {
            searchType: thisSearch1,
            searchContent: thisSearch2
        }
    }).then(function(res) {
        console.log(res)
        $("#searchResults").empty();
        let head = "<h5 class='ApiResult'>" + res.name;
        entryGetter = (q => {
            Object.entries(res).forEach(([key, value]) => {
                if (`${key}` == q) {

                    console.log(`${value}`);
                    $("#searchResults").append(head, `${value}` );
                }
                
            });
        });

        switch (thisSearch1) {
            case 'skills':
                entryGetter('desc');
                break;
            case 'ability-scores':
                entryGetter('desc');
                break;
            case 'languages':
                Object.entries(res).forEach(([key, value]) => {
                    if (`${key}` == 'typical_speakers') {
                        
                        console.log(`${value}`);
                        $("#searchResults").append(head, "<p><strong>Typical Speakers: </strong></p>", `${value}` );
                    } else if (`${key}` == 'type') {
                        $("#searchResults").append( "<p><strong>Language Type: </strong></p>", `${value}` );
                    }
                });
                break;
            case 'classes':
                $("#searchResults").append(head, "<p><strong>Proficiencies: </strong></p>");
                res.proficiencies.forEach(el => {
                    $("#searchResults").append("<p>" + el.name + "</p>");
                    console.log(el.name);
                });
                $("#searchResults").append("<p><strong>Subclasses: </strong></p>");
                res.subclasses.forEach(el => {
                    $("#searchResults").append("<p>" + el.name + "</p>");
                    console.log(el.name);
                });
                break;
            case 'features':
                $("#searchResults").append(head, "<p><strong>Description: </strong></p>");
                res.desc.forEach(el => {
                    $("#searchResults").append("<p>" + el + "</p>");

                });
                $("#searchResults").append("<p><strong>Level: </strong></p>", "<p>" + res.level + "</p>");
                Object.entries(res.class).forEach(([key, value]) => {
                    if (`${key}` == 'name')
                    $("#searchResults").append("<p>" +  `${value}`+ "</p>");
                });
                
                break;
            case 'races':
                $("#searchResults").append(head, "<p><strong>Languages: </strong></p>");
                res.languages.forEach(el => {
                    $("#searchResults").append("<p>" + el.name + "</p>");
    
                });
                 $("#searchResults").append("<p><strong>Alignment: </strong></p>", "<p>" + res.alignment + "</p>","<p><strong>Speed: </strong></p>", "<p>" + res.speed + "</p>", "<p><strong>Size </strong></p>", "<p>" + res.size_description + "</p>");
                break;
            case 'equipment':
                $("#searchResults").append("<p><strong>Cost: </strong></p>");
                $("#searchResults").append(head, "<p><strong>Type: </strong>" + res.equipment_category + "</p>");
                Object.entries(res.cost).forEach(([key, value]) => {
                    $("#searchResults").append(`${value}`);
                });
                res.desc.forEach(el => {
                    $("#searchResults").append("<p>" + el + "</p>");
    
                });
                $("#searchResults").append("<p><strong>Weight: </strong></p>" + res.weight);
                break;
            case 'conditions':
                $("#searchResults").append("<p><strong>Description: </strong></p>");
                res.desc.forEach(el => {
                    $("#searchResults").append("<p>" + el + "</p>");
    
                });
                break;

        };
    });
});



$(document).on("click", "#charMaker", function() {
    $("#newCharForm").show('fast');
});

$(document).ready(function() {
    $("#newCharForm").hide();
    $("#search2Form").hide();
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
    $.ajax("/api/chars/", {
        type: "POST",
        data: newCharacter
      }).then(function() {
        console.log("new character added");
        location.reload();
      });
    $(".npcForm").val("");
});
});
