let title, input, button;
var cnv;
var data, word;
var wordArray = [];
var alphabets = [];
var alphabetsString, alphabetsText;
var words = [];
var wordString, wordsText;
var correct, end;
var mistakes = 0;
var x, y;

function centerCanvas() {
	x = (windowWidth - width) / 2;
	y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function windowResized() {
	centerCanvas();
	title.position(x+95,y+40);
	input.position(x+225,y+125);
	button.position(x+270,y+165);
	alphabetsText.position(x+75,y+185);
	wordsText.position(x+75,y+220);
}

function preload() {
	data = loadJSON("Dictionary.json");
}

function setup() {
	cnv = createCanvas(600, 600);
	centerCanvas();
	background(255, 255, 255);
	frameRate(30);

	word = data[Math.floor(Math.random() * 235)];
	wordArray = split(word, "");

	title = createElement("h1", "Guess an animal with " + word.length + " letters");
	title.position(x+95,y+40);
	input = createInput();
	input.position(x+225,y+125);
	button = createButton("submit");
	button.position(x+270,y+165);
	button.mouseClicked(process);

	alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	alphabetsString = "";
	for (var i = 0; i < alphabets.length; i++) {
		alphabetsString = alphabetsString + alphabets[i] + " ";
	}
	alphabetsText = createElement("h2", alphabetsString);
	alphabetsText.position(x+75,y+185);

	wordString = "";
	for (var i = 0; i < wordArray.length; i++) {
		words[i] = "_";
	}
	for (var i = 0; i < wordArray.length; i++) {
		wordString = wordString + words[i] + " ";
	}
	wordsText = createElement("h2", wordString);
	wordsText.position(x+75,y+220);
}

function process() {
	const answer = input.value();
	input.value('');
	correct = false;
	for (var i = 0; i < wordArray.length; i++) {
		if (words[i] == "_" && wordArray[i] == answer) {
			words[i] = answer;
			correct = true;
		}
	}
	for (var i = 0; i < alphabets.length; i++) {
		if (alphabets[i] == answer) {
			alphabets[i] = "_";
		}
	}
	if (!correct) {
		mistakes = mistakes + 1;
	}

	alphabetsString = "";
	for (var i = 0; i < alphabets.length; i++) {
		alphabetsString = alphabetsString + alphabets[i] + " ";
	}
	alphabetsText.html(alphabetsString);

	wordString = "";
	for (var i = 0; i < wordArray.length; i++) {
		wordString = wordString + words[i] + " ";
	}
	wordsText.html(wordString);

	drawHang();
	gameOver();
}

function gameOver() {
	end = true;
	for (var i = 0; i < wordArray.length; i++) {
		if (wordArray[i] != words[i])
			end = false;
	}

	if (mistakes > 6) {
		textSize(30);
		text("You Lose!", 250, 550);
		wordString = "";
		for (var i = 0; i < wordArray.length; i++) {
			wordString = wordString + wordArray[i] + " ";
		}
		wordsText.html(wordString);

	} else if (end) {
		textSize(30);
		text("You Win!", 250, 550);
		wordString = "";
		for (var i = 0; i < wordArray.length; i++) {
			wordString = wordString + wordArray[i] + " ";
		}
		wordsText.html(wordString);
	}
}

function drawHang() {
	strokeWeight(5);
	if (mistakes == 1) {
		line(200, 500, 425, 500);
	} else if (mistakes == 2) {
		line(200, 500, 200, 300);
	} else if (mistakes == 3) {
		line(200, 300, 315, 300);
	} else if (mistakes == 4) {
		line(315, 300, 315, 350);
	} else if (mistakes == 5) {
		ellipse(315, 350, 50);
	} else if (mistakes == 6) {
		line(315, 375, 315, 425);
		line(315, 375, 365, 400);
		line(315, 375, 265, 400);
	} else if (mistakes == 7) {
		line(315, 425, 365, 450);
		line(315, 425, 265, 450);
	}
}