var cnv;
let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13;
var NUM_COLS = 6;
var NUM_ROWS = 4;
var faces = [];
var possibleFaces = [];
var selected = [];
var tiles = [];
var count = 0;

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function windowResized() {
	centerCanvas();
}

function preload() {
	img1 = loadImage("Picture/Pokemon1.png");
	img2 = loadImage("Picture/Pokemon2.png");
	img3 = loadImage("Picture/Pokemon3.png");
	img4 = loadImage("Picture/Pokemon4.png");
	img5 = loadImage("Picture/Pokemon5.png");
	img6 = loadImage("Picture/Pokemon6.png");
	img7 = loadImage("Picture/Pokemon7.png");
	img8 = loadImage("Picture/Pokemon8.png");
	img9 = loadImage("Picture/Pokemon9.png");
	img10 = loadImage("Picture/Pokemon10.png");
	img11 = loadImage("Picture/Pokemon11.png");
	img12 = loadImage("Picture/Pokemon12.png");
	img13 = loadImage("Picture/Pokemon13.png");
}

function setup() {
	cnv = createCanvas(800, 600);
	centerCanvas();
	background(255, 255, 255);
	frameRate(30);
	faces.push(img1);
	faces.push(img2);
	faces.push(img3);
	faces.push(img4);
	faces.push(img5);
	faces.push(img6);
	faces.push(img7);
	faces.push(img8);
	faces.push(img9);
	faces.push(img10);
	faces.push(img11);
	faces.push(img12);

	for (var i = 0; i < (NUM_COLS * NUM_ROWS) / 2; i++) {
		var randomInd = Math.floor(Math.random() * faces.length);
		var face = faces[randomInd];
		selected.push(face);
		selected.push(face);
		faces.splice(randomInd, 1);
	}

	shuffleArray(selected);

	for (var j = 0; j < NUM_COLS; j++) {
		for (var k = 0; k < NUM_ROWS; k++) {
			var tileX = j * 120 + 50;
			var tileY = k * 120 + 60;
			var tileFace = selected[count];
			count = count + 1;
			tiles.push(new Tile(tileX, tileY, tileFace));
		}
	}
}

class Tile {
	constructor(x, y, face) {
		this.x = x;
		this.y = y;
		this.width = 100;
		this.face = face;
		this.isFaceUp = false;
		this.isMatch = false;
	}

	draw() {
		fill(214, 247, 202);
		strokeWeight(2);
		rect(this.x, this.y, this.width, this.width, 10);
		if (this.isFaceUp) {
			image(this.face, this.x, this.y, this.width, this.width);
		} else {
			image(img13, this.x, this.y, this.width, this.width);
		}
	};

	isUnderMouse(x, y) {
		return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.width;
	};
}

function shuffleArray(array) {
	var counter = array.length;
	while (counter > 0) {
		var ind = Math.floor(Math.random() * counter);
		counter--;
		var temp = array[counter];
		array[counter] = array[ind];
		array[ind] = temp;
	}
}

var numTries = 0;
var numMatches = 0;
var flippedTiles = [];
var delayStartFC = null;

function mouseClicked() {
	for (var i = 0; i < tiles.length; i++) {
		var tile = tiles[i];
		if (tile.isUnderMouse(mouseX, mouseY)) {
			if (flippedTiles.length < 2 && !tile.isFaceUp) {
				tile.isFaceUp = true;
				flippedTiles.push(tile);
				if (flippedTiles.length === 2) {
					numTries++;
					if (flippedTiles[0].face === flippedTiles[1].face) {
						flippedTiles[0].isMatch = true;
						flippedTiles[1].isMatch = true;
						flippedTiles.length = 0;
						numMatches++;
					}
					delayStartFC = frameCount;
				}
			}
			loop();
		}
	}
}

function draw() {
	if (delayStartFC && (frameCount - delayStartFC) > 30) {
		for (var i = 0; i < tiles.length; i++) {
			var tile = tiles[i];
			if (!tile.isMatch) {
				tile.isFaceUp = false;
			}
		}
		flippedTiles = [];
		delayStartFC = null;
		noLoop();
	}

	for (var i = 0; i < tiles.length; i++) {
		tiles[i].draw();
	}

	if (numMatches === tiles.length / 2) {
		fill(0, 0, 0);
		textSize(40);
		text("You found them all in " + numTries + " tries!", (windowWidth - width) / 4, 575);
	}
}

loop();