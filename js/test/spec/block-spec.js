define(['block'], function(Block) {
  describe('Block test suite', function() {

    beforeEach(function() {
      this.b = new Block(1,1,1);
    });

    describe("a Block contains Squares", function() {
      it("should be four of them in each block", function() {
        expect(this.b.squares.length).toBe(4);
      });
    });

  });
});
