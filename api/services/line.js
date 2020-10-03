class Line {
  constructor(app) {}
  echo() {
    console.log("Hello from user service");
  }
  test(line) {
    line.child = true;
    line.baby = true;
    return line;
  }
}

module.exports = (app) => new Line(app);
