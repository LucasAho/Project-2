/* eslint-disable indent */
/* eslint-disable prettier/prettier */
dndSearch = (q1, q2) => {
    console.log(q1,q2);
    
    $.get('/search/' + q1 + '/' + q2)
        .catch(function (error) {
            console.log(error);
    }).then (res => {
        console.log(res);
    });
} 
function newChar(name, classType, lvl, exp, race, alignment, str, dex, con, int, wis, cha) {
            this.charName = name;
            this.class = classType;
            this.lvl = lvl;
            this.experience = exp;
            this.race = race;
            this.align = alignment;
            this.profBonus= function () {
                switch(lvl) {
                    case lvl < 5:
                        return 2;
                    case lvl > 4 && lvl < 9:
                        return 3;
                    case lvl > 8 && lvl < 13:
                        return 4;
                    case lvl > 12 && lvl < 17:
                        return 5;
                    case lvl > 15:
                        return 6; 
                }
            };
            this.speed = dndSearch('races', this.race);
            this.strength = str;
            this.dexterity = dex;
            this.constitution = con;
            this.intelligence = int;
            this.wisdom = wis;
            this.charisma = cha;

        }

$("#createCharBtn").on("click", function(event) {
    event.preventDefault();

    
    newName = $("#charName").val().trim();
    newClass = $("#classSelect").val().trim().toLowerCase();
    newLvl = $("#startLvl").val().trim();
    newExp = $("#startExp").val().trim();
    newRace = $("#raceSelect").val().trim().toLowerCase();
    newAlign = $("#alignment").val().trim();
    newHealth = $("#maxHp").val().trim();
    newScores = [$("#str").val(),$("#dex").val(),$("#con").val(),$("#int").val(),$("#wis").val(),$("#cha").val()];
    var newCharacter = new newChar(newName, newClass, newLvl, newExp, newRace, newAlign, newHealth, newScores[0], newScores[1], newScores[2], newScores[3], newScores[4], newScores[5]);
    

        //need , AC, speed, inventory, notes

    // $.ajax("api/chars", {
    //     type: "POST",
    //     data: newChar
    //   }).then(function() {
    //     console.log("new character added");
    //   });
    $(".form-control").val("");
});