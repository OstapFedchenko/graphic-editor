APP.models.Rectangle = (function() {
  var shape = APP.models.Shape,
    Point = APP.models.Point;

  var F = function() {};
  F.prototype = shape.prototype;
  Rectangle.prototype = new F();

  function Rectangle(x1, y1, x2, y2, color, fillColor) {
    shape.call(this, x1, y1, x2, y2, color);

    this.height = Math.abs(y2 - y1);
    this.width = Math.abs(x2 - x1);
    this.fillColor = fillColor;
  }

  function recalculateSize() {
    this.width = Math.abs(this.curPoint.x - this.lastPoint.x);
    this.height = Math.abs(this.curPoint.y - this.lastPoint.y);
  }

  function toJSON() {
    var obj = {
      x1: this.curPoint.x,
      y1: this.curPoint.y,
      x2: this.lastPoint.x,
      y2: this.lastPoint.y,
      color: this.color,
      fillColor: this.fillColor,
      type: this.type
    };

    return obj;
  }

  function pointIsBelong(point) {
    if (point instanceof Point) {
      var isBelong =
        (point.x > Math.min(this.curPoint.x, this.lastPoint.x) &&
          point.x < Math.max(this.curPoint.x, this.lastPoint.x) &&
          point.y > Math.min(this.curPoint.y, this.lastPoint.y) &&
          point.y < Math.max(this.curPoint.y, this.lastPoint.y)) === true;

      return isBelong;
    } else {
      throw Error("Ошибка принадлежности точки к прямоугольнику");
    }
  }

  function draw(context) {
    context.beginPath();
    context.rect(
      Math.min(this.curPoint.x, this.lastPoint.x),
      Math.min(this.curPoint.y, this.lastPoint.y),
      this.width,
      this.height
    );
    context.strokeStyle = this.color;

    if (context.strokeStyle !== this.color) {
      this.color = context.strokeStyle;
    }

    context.fillStyle = this.fillColor;

    if (context.fillStyle !== this.fillColor) {
      this.fillColor = context.fillStyle;
    }

    context.fill();
    context.stroke();
    context.closePath();

    if (this.isSelected) {
      context.strokeStyle = "black";
      context.fillStyle = "white";
      context.beginPath();
      context.arc(this.curPoint.x, this.curPoint.y, 3, 0, 2 * Math.PI, false);
      context.fill();
      context.stroke();
      context.closePath();
      context.beginPath();
      context.arc(this.lastPoint.x, this.curPoint.y, 3, 0, 2 * Math.PI, false);
      context.fill();
      context.stroke();
      context.closePath();
      context.beginPath();
      context.arc(this.lastPoint.x, this.lastPoint.y, 3, 0, 2 * Math.PI, false);
      context.fill();
      context.stroke();
      context.closePath();
      context.beginPath();
      context.arc(this.curPoint.x, this.lastPoint.y, 3, 0, 2 * Math.PI, false);
      context.fill();
      context.stroke();
      context.closePath();
    }
  }

  Rectangle.prototype.draw = draw;
  Rectangle.prototype.pointIsBelong = pointIsBelong;
  Rectangle.prototype.recalculateSize = recalculateSize;
  Rectangle.prototype.toJSON = toJSON;
  Rectangle.prototype.type = "Rectangle";

  return Rectangle;
})();
