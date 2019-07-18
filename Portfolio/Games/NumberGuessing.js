let input, button;
var cnv, num; 
var numTrial;
var title, texts;
var x, y;

function centerCanvas() {
	x = (windowWidth - width) / 2;
	y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function windowResized() {
	centerCanvas();
	title.position(x+60,y+190);
	input.position(x+225,y+275);
	button.position(x+270,y+315);
	texts.position(x+175,y+355);
}

function setup() {
	cnv = createCanvas(600, 600);
	centerCanvas();
	background(255, 255, 255);
	frameRate(30);
	numTrial = 0;
	num = Math.floor(Math.random()*100);
	
	title = createElement("h1","Guess a number between 1 and 100!")
	title.position(x+60,y+190);
	input = createInput();
	input.position(x+225,y+275);
	button = createButton("submit");
	button.position(x+270,y+315);
	button.mouseClicked(check);
	texts = createElement("h2", "");
  	texts.position(x+175,y+355);
}

function check() {
	title.html("Guess a number between 1 and 100!");

	numTrial = numTrial + 1;
	const answer = input.value();
	if (answer == num) {
		texts.html("You have won in " + numTrial + " trials");
	} else if (answer < num) {
		texts.html("Your number is too low");
	} else if (answer > num) {
		texts.html("Your number is too high");
	}
	input.value('');
	
	for (let i = 0; i < 200; i++) {
	    	push();
	    	fill(random(155)+100, random(155)+100, random(155)+100);
	    	translate(random(width), random(height));
	    	rotate(random(2 * PI));
		textSize(50);	
	    	text(answer, 0, 0);
	    	pop();
	}
}

  

