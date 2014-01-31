define("sprites", function() {

  return function Sprite(type) {
    switch (type) {
      case 1:
        return new Array(
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 2 }
        );
      case 2:
        return new Array(
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 }
        );
      case 3:
        return new Array(
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 }
        );
      case 4:
        return new Array(
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 1 }
        );
      case 5:
        return new Array(
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
          { x: 2, y: 0 }
        );
      case 6:
        return new Array(
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 0, y: 2 }
        );
      case 7:
        return new Array(
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 }
        );
    }
  }
});
