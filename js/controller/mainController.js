APP.controllers.mainController = (function() {
  var Point = APP.models.Point,
    Rectangle = APP.models.Rectangle,
    Line = APP.models.Line,
    Ellipse = APP.models.Ellipse,
    view = APP.views.mainView,
    canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    Offset = GetCordinates(canvas),
    selectedFigures = [],
    figures = [],
    currentPoint = new Point(0, 0),
    downPoint = new Point(0, 0),
    figuresRefreshedInWindow = true,
    moveFigures = false,
    mouseIsUp = true,
    newFigure = null,
    timer = null,
    curColor,
    curBackground,
    selectedFigure,
    selectedType;

	canvasWidth = 800,
    canvasHeight = 727,
    ConstractorJS = {},
    ConstrarcorFigure = {},
    canvas.width = canvasWidth;

  canvas.height = canvasHeight;
  context.fillStyle = "#fff";
  context.strokeStyle = "#000000";

  (function init() {
    recOffset();
    startDraw();
  })();

  function mouseDown(e, color, fillColor) {
    curColor = color;
    curBackground = fillColor;

    if (mouseIsUp === true) {
      if (selectedType === "Cursor") {
        selectedFigure = pointIsBelong(figures, currentPoint);

        if (selectedFigure) {
          if (selectedFigure.isSelected === true) {
            moveFigures = true;
            downPoint.x = currentPoint.x;
            downPoint.y = currentPoint.y;
          } else {
            moveFigures = false;
            selectedFigures.push(selectedFigure);
            selectedFigure.isSelected = true;
          }
          selectedFigure = null;
        } else {
          selectedFigures.length = 0;

          notselected(figures);
        }
      } else {
        notselected(figures);

        selectedFigures.length = 0;
        selectedFigure = null;
        moveFigures = false;

        if (!newFigure) {
          if (selectedType) {
            var ctor = ConstrarcorFigure[selectedType];

            if (ctor) {
              newFigure = ctor();
            } else {
              alert("figure type not found");
            }

            if (newFigure) {
              newFigure.isSelected = true;
              selectedFigures.push(newFigure);
              figuresRefreshedInWindow = false;
            }
          }
        }
      }
      mouseIsUp = false;
    }
  }

  function mouseUp(e) {
    if (mouseIsUp === false) {
      if (newFigure) {
        if (!newFigure.curPoint.isEqual(newFigure.lastPoint)) {
          newFigure.setFinishPosition();
          newFigure.rotateDegree = 45;

          addFigure(newFigure);
        } else {
          var tmpPoint = new Point(0, 0);

          tmpPoint.x = newFigure.curPoint.x + 3;
          tmpPoint.y = newFigure.curPoint.y + 3;

          newFigure.setlastPoint(tmpPoint);
          newFigure.setFinishPosition();
          addFigure(newFigure);
        }
        newFigure = null;
      }
      mouseIsUp = true;
    }
  }

  function mouseMove(e) {
    setCurrentPoint(e);

    if (!mouseIsUp && moveFigures === true) {
      if (selectedFigures.length > 0) {
        for (var i = 0; i < selectedFigures.length; i++) {
          selectedFigures[i].moveX(currentPoint.x - downPoint.x);
          selectedFigures[i].moveY(currentPoint.y - downPoint.y);
        }

        downPoint.x = currentPoint.x;
        downPoint.y = currentPoint.y;
      }
    }

    if (newFigure) {
      newFigure.setlastPoint(currentPoint);
    }
  }

  //изменение бордюра выделенной фигуры
  function changeBorder(color) {
    for (var i = 0; i < selectedFigures.length; i++) {
      selectedFigures[i].color = color;
    }
  }

  //Изменение бэкграунда
  function changeBackground(color) {
    for (var i = 0; i < selectedFigures.length; i++) {
      if (selectedFigures[i].hasOwnProperty("fillColor")) {
        selectedFigures[i].fillColor = color;
      }
    }
  }

  //загрузка
  ConstractorJS = {
    Ellipse: function(Obj) {
      return new Ellipse(
        Obj.x1,
        Obj.y1,
        Obj.x2,
        Obj.y2,
        Obj.color,
        Obj.fillColor
      );
    },
    Rectangle: function(Obj) {
      return new Rectangle(
        Obj.x1,
        Obj.y1,
        Obj.x2,
        Obj.y2,
        Obj.color,
        Obj.fillColor
      );
    },
    Line: function(Obj) {
      return new Line(Obj.x1, Obj.y1, Obj.x2, Obj.y2, Obj.color);
    }
  };

  //рисование
  ConstrarcorFigure = {
    Ellipse: function() {
      return new Ellipse(
        currentPoint.x,
        currentPoint.y,
        currentPoint.x,
        currentPoint.y,
        curColor,
        curBackground
      );
    },
    Rectangle: function() {
      return new Rectangle(
        currentPoint.x,
        currentPoint.y,
        currentPoint.x,
        currentPoint.y,
        curColor,
        curBackground
      );
    },
    Line: function() {
      return new Line(
        currentPoint.x,
        currentPoint.y,
        currentPoint.x,
        currentPoint.y,
        curColor
      );
    }
  };

  function startDraw() {
    timer = setInterval(function() {
      view.render(context, canvasWidth, canvasHeight, figures, newFigure);
    }, 100);
  }

  function stopDraw() {
    clearInterval(timer);
  }

  //отмена выделения
  function notselected(figures) {
    for (var i = 0; i < figures.length; i++) {
      figures[i].isSelected = false;
    }
  }

  //Проверка принадлежит ли точка какой-либо фигуре
  function pointIsBelong(figures, point) {
    for (var i = figures.length - 1; i >= 0; i--) {
      if (figures[i].pointIsBelong(point)) {
        return figures[i];
      }
    }
    return null;
  }

  function getFigureById(id, selectThis) {
    for (var i = 0; i < figures.length; i++) {
      if (figures[i].getId() === Number(id)) {
        if (selectThis === true) {
          selectedFigures.length = 0;

          notselected(figures);

          moveFigures = false;

          selectedFigures.push(figures[i]);

          figures[i].isSelected = true;
        }

        return figures[i];
      }
    }

    return null;
  }

  function getFigureIndexById(figures, id) {
    for (var i = 0; i < figures.length; i++) {
      if (figures[i].getId() === Number(id)) {
        return i;
      }
    }
  }

  function recOffset() {
    Offset = GetCordinates(canvas);
  }

  function getContext() {
    return context;
  }

  function setCurrentPoint(e) {
    currentPoint.x = e.pageX - Offset.x;
    currentPoint.y = e.pageY - Offset.y;
  }

  function getCurrentPoint() {
    return currentPoint;
  }

  function addFigure(figure) {
    figures.push(figure);
  }

  function keyDown(e) {
    var ind;

    if (e.keyCode === 46) {
      for (var i = selectedFigures.length - 1; i >= 0; i--) {
        ind = getFigureIndexById(figures, selectedFigures[i].getId());

        if (!isNaN(ind)) {
          figures.splice(ind, 1);
          selectedFigures.splice(i, 1);
          figuresRefreshedInWindow = false;
        }
      }
    }
  }

  function saveToJson() {
    var final = JSON.stringify(figures, function(status, value) {
      if (status === "id" || status === "isSelected") {
        return undefined;
      }

      return value;
    });

    return final;
  }

  function loadFromJson(string) {
    try {
      var final = JSON.parse(string),
        Obj;

      if (final && final instanceof Array) {
        for (var i = 0; i < final.length; i++) {
          Obj = final[i];
          var ctor = ConstractorJS[Obj.type];

          if (ctor) {
            newFigure = ctor(Obj);
          } else {
            alert("такого типа фигуры нет");
          }

          if (newFigure) {
            newFigure.isSelected = true;

            selectedFigures.push(newFigure);

            addFigure(newFigure);

            newFigure = null;
          }
        }
      } else {
        alert("Ошибка формата");
      }

      if (figures.length > 0) {
        figuresRefreshedInWindow = false;
      }
    } catch (e) {
      alert(e);
    }
  }

  function GetCordinates(obj) {
    var p = {};

    p.x = obj.offsetLeft;
    p.y = obj.offsetTop;

    while (obj.offsetParent) {
      p.x = p.x + obj.offsetParent.offsetLeft;
      p.y = p.y + obj.offsetParent.offsetTop;

      if (obj === document.getElementsByTagName("body")[0]) {
        break;
      } else {
        obj = obj.offsetParent;
      }
    }

    return p;
  }

  function clearFigures() {
    selectedFigure = null;
    selectedFigures.length = 0;
    figures.length = 0;
    newFigure = null;
    mouseIsUp = true;
    moveFigures = false;
    figuresRefreshedInWindow = false;
  }

  //получение фигур для вывода в окно
  function getFiguresForWindow() {
    if (figuresRefreshedInWindow === false) {
      figuresRefreshedInWindow = true;

      return figures;
    }

    return null;
  }

  function setSelectedType(type) {
    selectedType = type;
  }

  function getLastSelectedFigure() {
    var count = selectedFigures.length;

    if (count > 0) {
      return selectedFigures[count - 1];
    }

    return null;
  }

  return {
    getContext: getContext,
    startDraw: startDraw,
    stopDraw: stopDraw,
    mouseUp: mouseUp,
    mouseMove: mouseMove,
    mouseDown: mouseDown,
    recOffset: recOffset,
    keyDown: keyDown,
    changeBorder: changeBorder,
    changeBackground: changeBackground,
    getFigureById: getFigureById,
    getFiguresForWindow: getFiguresForWindow,
    getLastSelectedFigure: getLastSelectedFigure,
    getCurrentPoint: getCurrentPoint,
    setSelectedType: setSelectedType,
    clearFigures: clearFigures,
    saveToJson: saveToJson,
    loadFromJson: loadFromJson
  };
})();
