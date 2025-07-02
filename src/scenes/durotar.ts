import { UP } from "phaser";
import durotarJSON from "../assets/durotar.json";
import { Enemy } from "../entities/enemy";
import { Player } from "../entities/player";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";
export class Durotar extends Phaser.Scene {
    private player?: Player;
    private boar: Enemy;
    public WINText: string;
    public boarText: string;
    public collisionText?: Phaser.GameObjects.Text;
    public collisionText1?: Phaser.GameObjects.Text;
    constructor() {
        super("DurotarScene")
    }

    preload() {
        this.load.image(TILES.DUROTAR, "src/assets/durotar.png")
        this.load.tilemapTiledJSON("map", "src/assets/durotar.json")
        this.load.spritesheet(SPRITES.PLAYER, "src/assets/characters/alliance.png", {
            frameWidth: SIZES.PLAYER.WIDTH,
            frameHeight: SIZES.PLAYER.HEIGHT
        })
        this.load.spritesheet(SPRITES.BOAR.base, "src/assets/characters/boar.png", {
            frameWidth: SIZES.BOAR.WIDTH,
            frameHeight: SIZES.BOAR.HEIGHT
        })

    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage(durotarJSON.tilesets[0].name, TILES.DUROTAR, SIZES.TILE, SIZES.TILE);
        const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        const wallsLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0);
        this.player = new Player(this, 400, 250, SPRITES.PLAYER);
        this.boar = new Enemy(this, 305, 270, SPRITES.BOAR.base);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, 1000);

        this.physics.world.setBounds(0, 0, map.widthInPixels, 1000);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, wallsLayer);
        wallsLayer.setCollisionByExclusion([-1]);
        this.boar.setCollideWorldBounds(true);



    }
    update(time: number, delta: number): void {
        this.cameras.main.roundPixels = true;
        this.player.update(delta);

        document.addEventListener('keydown', (event) => {
            const isColliding = this.physics.overlap(this.player, this.boar);

            if (isColliding && event.key === 'Enter') {
                console.log("djfskdj");
                this.showWinText();
            } else {
                this.destroyCollisionText();
            }
        });
        document.addEventListener('keydown', (event) => {
            const isColliding = this.physics.overlap(this.player, this.boar);

            if (isColliding || (event.key === "down" || event.key === "up" || event.key === "right" || event.key === "left")) {
                this.showText();
            }
            else if (event.key === "Enter") {
                this.destroyText();

            }
            else {
                this.destroyText();
            }
        });


    }
    private showText(): void {
        if (!this.collisionText1) {
            this.boarText = "PRESS ENTER";
            this.collisionText1 = this.add.text(270, 220, this.boarText, {
                font: "10px Arial",
                color: "#fff",
            })
        }
    }

    private destroyText(): void {
        if (this.collisionText1) {
            this.collisionText1.destroy();
            this.collisionText1 = undefined;
        }
    }

    private showWinText(): void {
        if (!this.collisionText) {
            this.WINText = "Победа";
            this.collisionText = this.add.text(365, 150, this.WINText, {
                font: "28px Arial",
                color: "#fff"
            }).setScrollFactor(0);
        }
    }

    private destroyCollisionText(): void {
        if (this.collisionText) {
            this.collisionText.destroy();
            this.collisionText = undefined;
        }
    }


}