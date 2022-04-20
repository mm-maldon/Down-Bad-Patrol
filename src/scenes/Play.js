class Play extends Phaser.Scene {
    
    constructor() {
        super("play");
        
    }
    
    preload() {
        this.load.image('wow', 'assets/wow.png');
        this.load.image('yikes', 'assets/yikes.png');
        this.load.image('brow', 'assets/brow.png');
        this.load.image('skull', 'assets/skull.png');
        this.load.image('clown', 'assets/clown.png');
        this.load.image('wyd', 'assets/wyd.png');
        this.load.image('up', 'assets/up.png');
        this.load.image('heyy', 'assets/heyy.png');
        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
        
    }

    create() {

        this.bg = this.add.tileSprite(0,0, 640,480, 'background').setOrigin(0,0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'wyd', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'heyy', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'up', 0, 10).setOrigin(0,0);
        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 10, 'wow').setOrigin(0.5, 0);

        // initialize score
        this.p1Score = 0;

        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        //GAME OVER flag
        this.gameOver = false;

        //play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menu");
        }

        // update spaceships (x3)
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        let rocketRandom = 0;
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.rocketRandom = Math.floor(Math.random() * 5);
            if(rocketRandom == 0){
                this.p1Rocket.setTexture('wow');
            }else if(rocketRandom == 1){
                this.p1Rocket.setTexture('yikes');
            }else if(rocketRandom == 2){
                this.p1Rocket.setTexture('brow');
            }else if(rocketRandom == 3){
                this.p1Rocket.setTexture('skull');
            }else if(rocketRandom == 4){
                this.p1Rocket.setTexture('clown');
            }
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
          }
          if (this.checkCollision(this.p1Rocket, this.ship02)) {
            rocketRandom = Math.floor(Math.random() * 5);  
            if(rocketRandom == 0){
                this.p1Rocket.setTexture('wow');
            }else if(rocketRandom == 1){
                this.p1Rocket.setTexture('yikes');
            }else if(rocketRandom == 2){
                this.p1Rocket.setTexture('brow');
            }else if(rocketRandom == 3){
                this.p1Rocket.setTexture('skull');
            }else if(rocketRandom == 4){
                this.p1Rocket.setTexture('clown');
            }
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
          }
          if (this.checkCollision(this.p1Rocket, this.ship01)) {  
            rocketRandom = Math.floor(Math.random() * 5);  
            if(rocketRandom == 0){
                this.p1Rocket.setTexture('wow');
            }else if(rocketRandom == 1){
                this.p1Rocket.setTexture('yikes');
            }else if(rocketRandom == 2){
                this.p1Rocket.setTexture('brow');
            }else if(rocketRandom == 3){
                this.p1Rocket.setTexture('skull');
            }else if(rocketRandom == 4){
                this.p1Rocket.setTexture('clown');
            }
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
          }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        if(this.p1Rocket.texture.key == 'clown'){
            this.sound.play('clownhorn');
        }else if(this.p1Rocket.texture.key == 'skull'){
            this.sound.play('churchbell');
        }else{
            this.sound.play('vineboom');
        }
        
    }
}