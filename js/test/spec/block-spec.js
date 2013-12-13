define(["block"], function(Block) {

  describe("Block", function() {
    
    describe("creation ", function() {
      
      it("with no params should be a random Block", function() {
        var b = new Block();
        expect(b).toBeDefined();
      });

      it("with 2 params should be a random Block at (x,y)", function() {
        var b = new Block(1,2);
        expect(b).toBeDefined();
      });

      it("with 3 params should be a type (z) Block at (x,y)", function() {
        var b = new Block(1,2,3);
        expect(b).toBeDefined();
        
        // based on the type, the (x,y) is not necessary filled!
        // check all block types
        //expect(b.squares[0].x()).toBe(1);
        //expect(b.squares[0].y()).toBe(2);
      });

      it("with 3 params is possible for 7 distinct types", function() {
        for (var i = 1; i <= 7; i++) {
          var b = new Block(1,2,i);
          expect(b).toBeDefined();
        }
      });
    });

    describe("general", function() {

      beforeEach(function() {
        this.b = new Block(1,2,3);
        this.b2 = new Block(AREA_WIDTH - 1,AREA_HEIGHT - 2,2);
      });

      xit("should contain 4 Squares", function() {
        expect(this.b.squares.length).toBe(4);
      });

      xit("edges should be correct values in the GameTable", function() {
        expect(this.b.edges().left).toBeGreaterThan(-1);
        expect(this.b.edges().left).toBeLessThan(AREA_WIDTH - 1);

        expect(this.b.edges().right).toBeGreaterThan(-1);
        expect(this.b.edges().right).toBeLessThan(AREA_WIDTH - 1);

        expect(this.b.edges().top).toBeGreaterThan(-1);
        expect(this.b.edges().top).toBeLessThan(AREA_HEIGHT - 1);

        expect(this.b.edges().bottom).toBeGreaterThan(-1);
        expect(this.b.edges().bottom).toBeLessThan(AREA_HEIGHT - 1);
      });

      it("width should be between 0 and 5", function() {
        expect(this.b.getWidth()).toBeGreaterThan(0);
        expect(this.b.getWidth()).toBeLessThan(5);
      });

      it("height should be between 0 and 5", function() {
        expect(this.b.getHeight()).toBeGreaterThan(0);
        expect(this.b.getHeight()).toBeLessThan(5);
      });

      it("should have max 4 movable squares", function() {
        expect(this.b.numOfMovableSquaresDown()).toBeLessThan(5);
        expect(this.b.numOfMovableSquaresLeft()).toBeLessThan(5);
        expect(this.b.numOfMovableSquaresRight()).toBeLessThan(5);
      });

      it("can move down", function() {
        expect(this.b.canMoveDown()).toBe(true);
      });

      it("can move left", function() {
        expect(this.b.canMoveLeft()).toBe(true);
      });

      it("can move right", function() {
        expect(this.b.canMoveRight()).toBe(true);
      });

      // depends an existing gametable
      xit("can not move down if at the bottom", function() {
        a = new Block(0,0,2);
        expect(a.canMoveDown()).toBe(false);
      });
    });
  });
});
