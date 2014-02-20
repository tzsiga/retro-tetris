define("sprites", function() {

  return function Sprite(type) {
    switch (type) {
      case 1:
        return [{ x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 2 }];
      case 2:
        return [{ x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 }];
      case 3:
        return [{ x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 }];
      case 4:
        return [{ x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 1 }];
      case 5:
        return [{ x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
          { x: 2, y: 0 }];
      case 6:
        return [{ x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 0, y: 2 }];
      case 7:
        return [{ x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 }];
      default:
        return [];
    }
  }
});
