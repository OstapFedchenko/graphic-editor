APP.models.Shape = (function() {
  var Point = APP.models.Point,
    getId = counter(),
    stepX,
    stepY;

  var Shape = function(x1, y1, x2, y2, color) {
    this.curPoint = new Point(x1, y1);
    this.lastPoint = new Point(x2, y2);
    this.color = color;
    this.isSelected = false;

    var id = getId();
    this.getId = function() {
      return id;
    };
  };

  function setcurPoint(point) {
    if (point instanceof Point) {
      this.curPoint.x = point.x;
      this.curPoint.y = point.y;

      if (this.recalculateSize) {
        this.recalculateSize();
      }
    } else {
      throw Error("Ошибка текущей точки");
    }
  }

  function setlastPoint(point) {
    if (point instanceof Point) {
      this.lastPoint.x = point.x;
      this.lastPoint.y = point.y;

      if (this.recalculateSize) {
        this.recalculateSize();
      }
    } else {
      throw Error("Ошибка конечной точки");
    }
  }

  function counter() {
    var count = 0;

    return function() {
      return count++;
    };
  }

  function moveX(value) {
    stepX = parseFloat(value);

    if (!isNaN(stepX)) {
      this.curPoint.x += stepX;
      this.lastPoint.x += stepX;
    } else {
      throw Error("Движение по оси Х ошибка");
    }
  }

  function moveY(value) {
    stepY = parseFloat(value);

    if (!isNaN(stepY)) {
      this.curPoint.y += stepY;
      this.lastPoint.y += stepY;
    } else {
      throw Error("Движение по оси У ошибка");
    }
  }

  function setFinishPosition() {
    var tmpPoint = new Point(0, 0);

    tmpPoint.x = this.curPoint.x;
    tmpPoint.y = this.curPoint.y;

    this.curPoint.x = Math.min(this.curPoint.x, this.lastPoint.x);
    this.curPoint.y = Math.min(this.curPoint.y, this.lastPoint.y);

    this.lastPoint.x = Math.max(tmpPoint.x, this.lastPoint.x);
    this.lastPoint.y = Math.max(tmpPoint.y, this.lastPoint.y);
  }

  Shape.prototype = {
    moveX: moveX,
    moveY: moveY,
    setFinishPosition: setFinishPosition,
    setcurPoint: setcurPoint,
    setlastPoint: setlastPoint
  };

  return Shape;
})();
