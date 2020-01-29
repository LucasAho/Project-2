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
