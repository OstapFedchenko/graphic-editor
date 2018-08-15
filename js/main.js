window.onload = function() {
  var mainController = APP.controllers.mainController,
    canvas = document.getElementById("canvas"),
    Tfigures = document.getElementById("Tfigures"),
    curColor = document.getElementById("curColor"),
    changeColorBorder = document.getElementById("changeColorBorder"),
    BackgoundFigure = document.getElementById("BackgoundFigure"),
    changeBackgroundColor = document.getElementById("changeBackgroundColor"),
    Btn_changeborder = document.getElementById("Btn-changeborder"),
    Btn_changebackground = document.getElementById("Btn-changebackground"),
    Btn_clear = document.getElementById("Btn-clear"),
    Btn_save = document.getElementById("Btn-save"),
    Btn_load = document.getElementById("Btn-load"),
    Js_textarea = document.getElementById("Js-textarea"),
    activeFigure;

  canvas.addEventListener("mousedown", function(e) {
    var colorVal = curColor.value,
      fillColorVal = BackgoundFigure.value;

    mainController.mouseDown(e, colorVal, fillColorVal);
  });

  canvas.addEventListener("mouseup", function(e) {
    mainController.mouseUp(e);
  });

  canvas.addEventListener("mousemove", function(e) {
    mainController.mouseMove(e);
  });

  Btn_changeborder.addEventListener("click", function(e) {
    mainController.changeBorder(changeColorBorder.value);
  });

  Btn_changebackground.addEventListener("click", function(e) {
    mainController.changeBackground(changeBackgroundColor.value);
  });

  Btn_clear.addEventListener("click", function(e) {
    mainController.clearFigures();
  });

  Btn_load.addEventListener("click", function(e) {
    mainController.loadFromJson(Js_textarea.value);
  });

  Btn_save.addEventListener("click", function(e) {
    Js_textarea.value = mainController.saveToJson();
  });

  document.addEventListener("keydown", function(e) {
    e = e || window.event;

    mainController.keyDown(e);
  });

  Tfigures.addEventListener("click", function(e) {
    var event = e || window.event,
      target = event.target || event.srcElement;

    for (var i = 0; i < target.classList.length; i++) {
      if (target.classList[i] === "Type") {
        itemClick(target);
        break;
      }
    }
  });

  function itemClick(item) {
    activeFigure = Tfigures.getElementsByClassName("activeFigure");

    if (activeFigure.length > 0) {
      activeFigure[0].classList.remove("activeFigure");
    }

    item.classList.add("activeFigure");
    mainController.setSelectedType(item.attributes.type.value);
  }
};
