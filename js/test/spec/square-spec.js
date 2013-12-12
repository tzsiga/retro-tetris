define(["square", "common"], function(Square) {

  describe("Square", function() {

    describe("creation", function() {
      
      it("without params should be at (0,0)", function() {
        var s = new Square();
        expect(s.x).toBe(0);
        expect(s.y).toBe(0);
      });

      it("within gametable borders is valid", function() {
        var x = Math.floor((Math.random() * AREA_WIDTH));
        var y = Math.floor((Math.random() * AREA_HEIGHT));

        var s = new Square(x,y);
        expect(s.x).toBe(x);
        expect(s.y).toBe(y);
      });
    });

    describe("neighbours", function() {
      
      it("should be empty", function() {
        var s = new Square(1,2);
        expect(s.neighbours()).toBeDefined();
        expect(s.neighbours().left).toBe("");
        expect(s.neighbours().right).toBe("");
        expect(s.neighbours().bottom).toBe("");
      });
    });

    describe("can move", function() {
      
      beforeEach(function() {
        this.s = new Square();
      });

      it("down", function() {
        this.s.moveDown();
        expect(this.s.y).toBe(1);
      });
      
      it("left", function() {
        this.s.moveLeft();
        expect(this.s.x).toBe(-1);
      });
      
      it("right", function() {
        this.s.moveRight();
        expect(this.s.x).toBe(1);
      });
      
      it("anywhere", function() {
        this.s.set(1,2);
        expect(this.s.x).toBe(1);
        expect(this.s.y).toBe(2);
      });      
    });

   // depends an existing gametable
      // canMove
      // neighbours
      // draw

  });
});
