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
var mensen;
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
  mensen = [{ x: 400, y: 150, speedX: 2, speedY: -2 },
            { x: 130, y: 30, speedX: -3, speedY: -3 },
            { x: 104, y: 10, speedX: 5, speedY: 2 },
            { x: 160, y: 200, speedX: -1, speedY: 5 },
            { x: 10, y: 100, speedX: 2, speedY: 1 },
  ]
};


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
