import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare const PIXI: any;

@Component({
  selector: 'app-pixi-position-component',
  templateUrl: './pixi-position-component.component.html',
  styleUrls: ['./pixi-position-component.component.css']
})
export class PixiPositionComponentComponent implements OnInit {

  @ViewChild('container')
  containerRef: ElementRef;

  // Pixi elems
  app: PIXI.Application;
  square: PIXI.Graphics;
  cat: PIXI.Sprite;

  constructor() { }

  ngOnInit() {
    this.app = new PIXI.Application({
      width: 512,
      height: 512
    });

    this.containerRef.nativeElement.appendChild(this.app.view);

    this.square = new PIXI.Graphics();

    this.square.beginFill(0xFFFF00);
    this.square.drawRect(50, 50, 100, 100);
    this.square.endFill();
    console.log(this.square.position);
    console.log('localBounds', this.square.getLocalBounds());

    this.app.stage.addChild(this.square);

    this.cat = new PIXI.Sprite.fromImage('../../assets/img/cat.png');
    this.cat.position.set(100, 100);
    console.log(this.cat.position);

    this.app.stage.addChild(this.cat);

  }

}
