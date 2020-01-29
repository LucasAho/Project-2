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
let newName = "";
let newRace = "";
let newDescript = "";
let newPerson = "";
let newProfess = "";
$(function() {
  $("#nameIn").on("click", event => {
    event.preventDefault();
    newName = $("#nameForm").val().trim();
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

