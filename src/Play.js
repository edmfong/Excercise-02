class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, 'cup');
        this.cup.body.setCircle(this.cup.width / 4);
        this.cup.body.setOffset(this.cup.width / 4);
        this.cup.body.setImmovable(true);

        // add ball
        this.createBall();
        
        // add walls
        let wallA = this.physics.add.sprite(0, height / 4, 'wall');
        wallA.setX(Phaser.Math.Between(0 + wallA.width / 2, width - wallA.width / 2));
        wallA.body.setImmovable(true);
        // move wallA back and forth
        wallA.body.setBounce(1);
        wallA.body.setVelocityX(200);
        wallA.body.setCollideWorldBounds(true);

        let wallB = this.physics.add.sprite(0, height / 2, 'wall');
        wallB.setX(Phaser.Math.Between(0 + wallB.width / 2, width - wallB.width / 2));
        wallB.body.setImmovable(true);

        this.walls = this.add.group([wallA, wallB]);

        // one way
        this.oneway = this.physics.add.sprite(0, height / 4 * 3, 'oneway');
        this.oneway.setX(Phaser.Math.Between(0 + this.oneway.width / 2, width - this.oneway.width / 2));
        this.oneway.body.setImmovable(true);
        this.oneway.body.checkCollision.down = false;

        //
        this.SHOT_VELOCITY_X = 200;
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100

        this.input.on('pointerdown', (pointer) => {
            let shotDirection;
            pointer.y <= this.ball.y ? shotDirection = 1 : shotDirection = -1;
            if (pointer.x < this.ball.x) { // clicked on left
                this.ball.body.setVelocityX(Phaser.Math.Between(0, this.SHOT_VELOCITY_X));
            }
            else { // clickeed on right
                this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, 0));
            }
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection);

        })

        // destroys ball if ball touches cup
        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            ball.destroy();
            this.createBall();
        });
        this.physics.add.collider(this.ball, this.walls);
        this.physics.add.collider(this.ball, this.oneway);
    }

    update() {
        // // move wallA
        // this.direction = 'left';
        // if (direction == 'left'){
        //     this.wallA.setX()
        // }

    }

    createBall() {
        // add ball
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball');
        this.ball.body.setCircle(this.ball.width / 2);
        this.ball.body.setCollideWorldBounds(true);
        this.ball.body.setBounce(0.5);
        this.ball.setDamping(true).setOrigin(0.5);
    }
}