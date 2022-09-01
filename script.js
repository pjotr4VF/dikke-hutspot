 /* Opdracht Objectgeorienteerd programmeren
    Informatica - Emmauscollege Rotterdam
 */

/* ******************************************************* */
/* instellingen om foutcontrole van je code beter te maken */
/* ******************************************************* */
///<reference path="p5.global-mode.d.ts" />
"use strict"


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
var xPositie;
var yPositie;
var speedX;
var speedY;
const BREEDTE = 20;



/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // initialiseer waarden
  xPositie = [100, 200, 150, 250, 300];               // midden van de breedte van het canvas
  yPositie = [100, 200, 300, 200, 300 ];              // midden van de hoogte van het canvas
  speedX = random(-5, 5, 3, -3, 2);      // random waarde tussen -5 en 5
  speedY = random(-5, 5, 3, -3, 2);      // 👆
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // zwarte achtergrond
  background(0, 0, 0);

  // teken
  noStroke;
  fill(255, 255, 255);
  rect(xPositie, yPositie, BREEDTE, BREEDTE);

  // update positie
 for (var i = 0; i < xPositie.length; i++) {
  ellipse(xPositie[i], yPositie[i], 10, 10);
    xPositie[1] += speedX;
    yPositie[1] += speedY;
    
 }

  // stuiter evt. tegen de kanten
  if (xPositie <= 0 || xPositie + BREEDTE >= width) {
    speedX = speedX * -1;
  }

  if (yPositie <= 0 || yPositie + BREEDTE >= height) {
    speedY = speedY * -1;
  }

}
