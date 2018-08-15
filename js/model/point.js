APP.models.Point = (function() {
  function Point(x, y) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);

    if (isNaN(this.x) || isNaN(this.y)) {
      throw Error("Point: Argument type exception");
    }
  }

  Point.prototype.isEqual = function(point) {
    return this.x === point.x && this.y === point.y;
  };

  return Point;
})();
