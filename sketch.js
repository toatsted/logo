let editor;
let turtle;

function setup() {
  createCanvas(200, 200);
  angleMode(DEGREES);
  editor = select("#code");
  turtle = new Turtle(100, 100, 0);
  editor.input(goTurtle);
  goTurtle();
}

function goTurtle() {
  background(0);
  push();
  turtle.reset();
  let code = editor.value();
  let parser = new Parser(code);

  let commands = [];

  let movement = /^([fb]d|[lr]t)$/;
  let pen = /^p/;
  let repeat = /^repeat$/;

  while(parser.remainingTokens()) {
    let token = parser.nextToken();
    if( movement.test(token) ) {
      let cmd = new Command(token, parser.nextToken());
      commands.push(cmd);

    } else if( pen.test(token) ) {
      let cmd = new Command(token);
      commands.push(cmd);
    } else if( repeat.test(token) ) {
      let cmd = new Command(token, parser.nextToken());
      commands.push(cmd);
      let toRepeat = parser.getRepeat();
      console.log(toRepeat)
    }
  }

  console.log(commands);
  pop();
}
