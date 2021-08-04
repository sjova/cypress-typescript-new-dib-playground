describe('Nested Describe - Main Group', () => {
  describe('First Subgroup', () => {
    beforeEach(() => {
      console.log('runs before each test in this block');
    });

    it('should simulate a test inside the first subgroup', () => {
      expect(true).to.equal(true);
    });

    it('should simulate additional test inside the first subgroup', () => {
      expect(true).to.equal(true);
    });
  });

  describe('Second Subgroup', () => {
    beforeEach(() => {
      console.log('runs before each test in this block');
    });

    it('should simulate a test inside the second subgroup', () => {
      expect(true).to.equal(true);
    });

    it('should simulate additional test inside the second subgroup', () => {
      expect(true).to.equal(true);
    });

    afterEach(() => {
      console.log('runs after each test in this block');
    });
  });

  describe('Third Subgroup', () => {
    before(() => {
      console.log('runs once before the first test in this block');
    });

    it('should simulate a test inside the third subgroup', () => {
      expect(true).to.equal(true);
    });

    it('should simulate additional test inside the third subgroup', () => {
      expect(true).to.equal(true);
    });

    after(() => {
      console.log('runs once after the last test in this block');
    });
  });
});
