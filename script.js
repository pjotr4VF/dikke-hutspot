/* Opdracht Objectgeorienteerd programmeren
   Informatica - Emmauscollege Rotterdam
*/

/* ******************************************************* */
/* instellingen om foutcontrole van je code beter te maken */
/* ******************************************************* */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* Klassendefinities                             */
/* ********************************************* */

class Actor {
  x;
  y;
  speedX;
  speedY;
  breedte;

  isBesmet;
  besmettelijkheidsTeller;

  /**
   * constructor van abstracte klasse
   * initialiseert de attributen x, y, speedX, speedY
   * 
   * LET OP: subklassen MOETEN zelf this.breedte
   * en this.besmettelijkheidsTeller in hun constructor definiëren.
   */
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;

    this.isBesmet = false;
    this.besmettelijkheidsTeller = 0;

  }

  show() { }


  besmet() { }


  update() {
  
    this.x = this.x - this.speedX;
    this.y = this.y - this.speedY;

    if (this.x <= 0 || this.x + this.breedte >= width) {
      this.speedX = this.speedX * -1;
    }

    if (this.y <= 0 || this.y + this.breedte >= height) {
      this.speedY = this.speedY * -1;
    }

    this.besmettelijkheidsTeller--;
    if (this.besmettelijkheidsTeller === 0) {
      this.isBesmet = false;
    }
  }

  /**
   * berekent of 'this' Actor-object overlapt
   * met een ander actorobject genaamd andereActor
   */
  isOverlappend(andereActor) {
    // zet teruggeefwaarde standaard op false
    var overlappend = false;

    if ( 
      (this.x >= andereActor.x &&
        this.x <= andereActor.x + andereActor.breedte &&
        this.y >= andereActor.y &&
        this.y <= andereActor.y + andereActor.breedte)
      ||
      (this.x + this.breedte >= andereActor.x &&
        this.x + this.breedte <= andereActor.x + andereActor.breedte &&
        this.y >= andereActor.y &&
        this.y <= andereActor.y + andereActor.breedte)
      || 
      (this.x >= andereActor.x &&
        this.x <= andereActor.x + andereActor.breedte &&
        this.y + this.breedte >= andereActor.y &&
        this.y + this.breedte <= andereActor.y + andereActor.breedte)
      || 
      (this.x >= andereActor.x &&
        this.x <= andereActor.x + andereActor.breedte &&
        this.y + this.breedte >= andereActor.y &&
        this.y + this.breedte <= andereActor.y + andereActor.breedte)
    ) {

      overlappend = true;
    }
    return overlappend;
  }
}

class Mens extends Actor {
  constructor(x, y, speedX, speedY) {

    super(x, y, speedX, speedY);


    this.breedte = 20;
  }

  show() {
    noStroke();
    if (this.isBesmet === true) {
      fill(255, 0, 0);      
    }
    else {
      fill(255, 255, 255);  
    }

    rect(this.x, this.y, this.breedte, this.breedte);
  }

  besmet() {
    this.besmettelijkheidsTeller = 400;
    this.isBesmet = true;
  }
}

class Kat extends Actor {
  constructor(x, y, speedX, speedY) {
    super(x, y, speedX, speedY);
    this.breedte = 10;
  }

  show() {
    noStroke();
    if (this.isBesmet === true) {
      fill(255, 140, 0);   
    }
    else {
      fill(0, 0, 255);     
    }

    rect(this.x, this.y, this.breedte, this.breedte);
  }

  besmet() {
    this.besmettelijkheidsTeller = 200;
    this.isBesmet = true;
  }
}

class Dokter extends Mens {
  show() {

    super.show();


    strokeWeight(5);
    stroke(0, 255, 0);   
    line(this.x + this.breedte / 2, this.y, this.x + this.breedte / 2, this.y + this.breedte);
    line(this.x, this.y + this.breedte / 2, this.x + this.breedte, this.y + this.breedte / 2);
  }
}


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
var actoren = [];        



/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */


function setup() {
  createCanvas(1280, 720);

  for (var teller = 0; teller < 30; teller++) {
    var ruimteTotRand = 50;


    var randomX = random(ruimteTotRand, width - ruimteTotRand);
    var randomY = random(ruimteTotRand, height - ruimteTotRand);
    var randomSpeedX = random(-5, 5);
    var randomSpeedY = random(-5, 5);

    var nieuwMens = new Mens(randomX, randomY, randomSpeedX, randomSpeedY);
    actoren.push(nieuwMens);
  }

  for (var teller = 0; teller < 10; teller++) {

    var ruimteTotRand = 50;

 
    var randomX = random(ruimteTotRand, width - ruimteTotRand);
    var randomY = random(ruimteTotRand, height - ruimteTotRand);
    var randomSpeedX = random(-2, 2);
    var randomSpeedY = random(-2, 2);


    var nieuweKat = new Kat(randomX, randomY, randomSpeedX, randomSpeedY);

  
    actoren.push(nieuweKat);
  }

  actoren.push(new Dokter(width / 2, height / 2, 3, 5));

  actoren[0].isBesmet = true;
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {

  background(0, 0, 0);

  var aantalBesmet = 0;
  var aantalOnbesmet = 0;
  for (var i = 0; i < actoren.length; i++) {
    var actor = actoren[i];

 
    actor.show();

    actor.update();

    if (actor.isBesmet) {
      aantalBesmet = aantalBesmet + 1;
    }
    else {
      aantalOnbesmet = aantalOnbesmet + 1;
    }
  }

  noStroke();
  textSize(25);           
  fill(128, 128, 128);    
  text("Besmet: " + aantalBesmet, 1100, 30);
  text("Onbesmet: " + aantalOnbesmet, 1100, 60);

  for (var i = 0; i < actoren.length; i++) {
    var actorA = actoren[i];
    for (var j = 0; j < actoren.length; j++) {
      var actorB = actoren[j];
      if (actorA != actorB) {
        var actorenOverlappen = actorA.isOverlappend(actorB);
        if (actorenOverlappen) {
          if (actorA instanceof Dokter || actorB instanceof Dokter) {
            actorA.isBesmet = false;
            actorB.isBesmet = false;
          }
          else {
            if (actorA.isBesmet && !actorB.isBesmet) {
              actorB.besmet();
            }
            else if (actorB.isBesmet && !actorA.isBesmet) {
              actorA.besmet();
            }
          }
        }
      }
    }
  }
}