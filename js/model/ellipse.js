APP.models.Ellipse = (function() {
  var shape = APP.models.Shape,
    Point = APP.models.Point;

  var F = function() {};
  F.prototype = shape.prototype;
  Ellipse.prototype = new F();

  function Ellipse(x1, y1, x2, y2, color, fillColor) {
    shape.call(this, x1, y1, x2, y2, color);

    this.radiusX = Math.abs(x1 - x2) / 2;
    this.radiusY = Math.abs(y1 - y2) / 2;
    this.fillColor = fillColor;
  }

  function recalculateSize() {
    this.radiusX = Math.abs(this.curPoint.x - this.lastPoint.x) / 2;
    this.radiusY = Math.abs(this.curPoint.y - this.lastPoint.y) / 2;
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
        Math.pow(point.x - (this.curPoint.x + this.radiusX), 2) /
          Math.pow(this.radiusX, 2) +
          Math.pow(point.y - (this.curPoint.y + this.radiusY), 2) /
            Math.pow(this.radiusY, 2) <=
        1;

      if (isBelong === true) {
        return true;
      } else {
        return false;
      }
    } else {
      throw Error("Ошибка принадлежности точки к элипсу");
    }
  }

  function draw(context) {
    context.beginPath();
    context.save();
    context.translate(0.5, 0.5);
    context.translate(
      Math.min(this.curPoint.x, this.lastPoint.x) +
        Math.abs(this.curPoint.x - this.lastPoint.x) / 2,
      Math.min(this.curPoint.y, this.lastPoint.y) +
        Math.abs(this.curPoint.y - this.lastPoint.y) / 2
    );
    context.scale(this.radiusX / this.radiusY, 1);
    context.arc(0, 0, this.radiusY, 0, Math.PI * 2, true);
    context.strokeStyle = this.color;

    if (context.strokeStyle !== this.color) {
      this.color = context.strokeStyle;
    }

    context.stroke();

    context.fillStyle = this.fillColor;

    if (context.fillStyle !== this.fillColor) {
      this.fillColor = context.fillStyle;
    }

    context.fill();
    context.restore();
    context.closePath();

    if (this.isSelected) {
      context.strokeStyle = "black";
      context.fillStyle = "white";
      context.beginPath();
      context.setLineDash([10]);
      context.rect(
        Math.min(this.curPoint.x, this.lastPoint.x),
        Math.min(this.curPoint.y, this.lastPoint.y),
        this.radiusX * 2,
        this.radiusY * 2
      );
      context.stroke();
      context.setLineDash([0]);
      context.closePath();
      context.beginPath();
      context.arc(this.curPoint.x, this.curPoint.y, 3, 0, 2 * Math.PI, false);
      context.fill();
      context.stroke();
      context.closePath();
      context.beginPath();
      context.arc(this.curPoint.x, this.lastPoint.y, 3, 0, 2 * Math.PI, false);
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
    }
  }

  Ellipse.prototype.draw = draw;
  Ellipse.prototype.pointIsBelong = pointIsBelong;
  Ellipse.prototype.recalculateSize = recalculateSize;
  Ellipse.prototype.toJSON = toJSON;
  Ellipse.prototype.type = "Ellipse";

  return Ellipse;
})();
