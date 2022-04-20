// DOWN BAD PATROL
// by Malachi Maldonado
// CMPM120 
// Developed with help from Eliana Cadelina and Denae :p on the class Discord.
// Based on code by Adam Smith. This mod project took roughly 10 hours.
// =================Mod Breakdown======================
// - Redesign the game's artwork, UI, and sound to change its theme/aesthetic (60)
//      Changed the theme to a phone UI, where the player has to ward off unwanted
//      attention. Uses meme sounds, emojis, and a different menu/game over screen.
//
// - Display the time remaining (in seconds) on the screen (10)
//      
// - Create 4 new explosion SFX and randomize which one plays on impact (10)
//      I didn't do this exactly, but I randomized the rocket sprite each time a
//      spaceship is hit. Some rockets have special sounds.
// 
// - Created a new title screen/game over screen with mouse control (?)
//      I changed the title screen and game over screen to listen for a mouse click
//      on specified buttons instead of keyboard control. The title screen has buttons
//      for easy and hard difficulties; the game over screen has a button to
//      restart, and a button to return to the menu. I believe this mod is worth 20 points,
//      since it includes both menus and button controls.  
//
// ===================Credits====================
// Sound effects:
// -Bell sound:
//  https://www.youtube.com/watch?v=0Rf1RYYWeuA
// 
// -Clown sound:
//  https://www.youtube.com/watch?v=Z0mrOFZuNJo
//
// -Boom sound:
//  https://www.youtube.com/watch?v=829pvBHyG6I
// 
// Art:
// -Green text bubbles partially drawn by Eliana Cadelina
//
// -Emojis from OpenMoji
//  https://openmoji.org/
//===================================================================== 

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;