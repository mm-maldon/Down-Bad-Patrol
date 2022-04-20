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
            fontFamily: 'Verdana',
            fontSize: '18px',
            color: '#3f48cc',
            align: 'center',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        // display difficulty buttons
        this.easyButton = this.add.text(game.config.width/2 - 80, game.config.height/2 + 90, 'New Recruit', menuConfig).setOrigin(0.5);
        this.add.existing(this.easyButton);
        this.easyButton.setInteractive();
        this.easyButton.on('pointerup', () => {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('play');
         });


        this.hardButton = this.add.text(game.config.width/2 + 65, game.config.height/2 + 90, 'Veteran', menuConfig).setOrigin(0.5);
        this.add.existing(this.hardButton);
        this.hardButton.setInteractive();
        this.hardButton.on('pointerup', () => {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('play');
        });

    }

    update() {
    }
    
}