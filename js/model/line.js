APP.models.Line = (function() {
  var shape = APP.models.Shape,
    Point = APP.models.Point,
    newPoint = new Point(0, 0);

  var F = function() {};
  F.prototype = shape.prototype;
  Line.prototype = new F();

  function Line(x1, y1, x2, y2, color) {
    shape.call(this, x1, y1, x2, y2, color);
  }

  function draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;

    if (context.strokeStyle !== this.color) {
      this.color = context.strokeStyle;
    }

    context.moveTo(this.curPoint.x, this.curPoint.y);
    context.lineTo(this.lastPoint.x, this.lastPoint.y);
    context.stroke();
    context.closePath();

    if (this.isSelected) {
      context.strokeStyle = "000";
      context.fillStyle = "fff";
      context.beginPath();
      context.arc(this.curPoint.x, this.curPoint.y, 3, 0, 2 * Math.PI, false);
      context.fill();
      context.stroke();
      context.closePath();
      context.beginPath();
      context.arc(this.lastPoint.x, this.lastPoint.y, 3, 0, 2 * Math.PI, false);
      context.fill();
      context.stroke();
      context.closePath();
    }
  }

  function pointIsBelong(point) {
    if (point instanceof Point) {
      if (
        (point.x > Math.min(this.curPoint.x, this.lastPoint.x) &&
          point.x < Math.max(this.curPoint.x, this.lastPoint.x) &&
          point.y > Math.min(this.curPoint.y, this.lastPoint.y) &&
          point.y < Math.max(this.curPoint.y, this.lastPoint.y)) === true
      ) {
        var isBelong =
          (point.x - this.curPoint.x) * (this.lastPoint.y - this.curPoint.y) -
            (point.y - this.curPoint.y) *
              (this.lastPoint.x - this.curPoint.x) ===
          0;

        return isBelong;
      }

      return false;
    } else {
      throw Error("Ошибка принадлежности точки к линии");
    }
  }

  function toJSON() {
    var obj = {
      x1: this.curPoint.x,
      y1: this.curPoint.y,
      x2: this.lastPoint.x,
      y2: this.lastPoint.y,
      color: this.color,
      type: this.type
    };

    return obj;
  }

  function setFinishPosition() {
    if (this.lastPoint.x < this.curPoint.x) {
      newPoint = new Point(0, 0);
      newPoint.x = this.lastPoint.x;
      newPoint.y = this.lastPoint.y;
      this.lastPoint = this.curPoint;
      this.curPoint = newPoint;
    }
  }

  Line.prototype.draw = draw;
  Line.prototype.pointIsBelong = pointIsBelong;
  Line.prototype.setFinishPosition = setFinishPosition;
  Line.prototype.toJSON = toJSON;
  Line.prototype.type = "Line";

  return Line;
})();
