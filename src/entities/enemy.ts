import { Entity } from "./entity";

export class Enemy extends Entity{
    constructor(scene: Phaser.Scene,x: number,y: number, texture: string, type?: string){
        super(scene, x, y, texture);
    }
}