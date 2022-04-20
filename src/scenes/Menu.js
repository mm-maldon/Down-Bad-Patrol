class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }
    
    preload() {
        // load audio
        this.load.audio('sfx_select', 'assets/assets_blip_select12.wav');
        this.load.audio('vineboom', 'assets/vineboom.wav');
        this.load.audio('clownhorn', 'assets/clownhorn.wav');
        this.load.audio('churchbell', 'assets/churchbell.wav');
        this.load.audio('sfx_rocket', 'assets/assets_rocket_shot.wav');

        // load title screen
        this.load.image('titlescreen', 'assets/titlescreen.png');
    }
    
    create() {

        this.bg = this.add.tileSprite(0,0, 640,480, 'titlescreen').setOrigin(0,0);

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('play');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('play');    
        }
      }
    
}