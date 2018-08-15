APP.views.mainView = (function() {
  function render(context, canvasWidth, canvasHeight, figures, newFigure) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i = 0; i < figures.length; i++) {
      figures[i].draw(context);
    }

    if (newFigure) {
      newFigure.draw(context);
    }
  }

  return {
    render: render
  };
})();
