import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';

import { Application, Container, Sprite } from 'pixi.js';
import { takeUntil, filter, scan, withLatestFrom, concatMap, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

declare const PIXI;

@Component({
  selector: 'app-pixi-container',
  templateUrl: './pixi-container.component.html',
  styleUrls: ['./pixi-container.component.css']
})
export class PixiContainerComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  app: Application;
  stage: Container;

  cat: Sprite;

  hangPoint: PIXI.Graphics;
  hangPointVisible: boolean;

  private coordinate: {x: number, y: number} = null;

  private lineBuilding = false;

  // Check installation:
  // https://www.reddit.com/r/pixijs/comments/9dzdme/how_to_use_pixi_js_with_angular_6/
  constructor() {}

  ngOnInit() {
    this.app = new PIXI.Application({
      width: 512,
      height: 512,
      antialias: true,
      transparent: false,
      resolution: 1
    });
    this.container.nativeElement.appendChild(this.app.view);

    PIXI.loader
      .add('cat', '../../assets/img/cat.png')
      .load(this.setup.bind(this));

    this.stage = this.app.stage;
  }

  setup() {
    console.log('loading texture completed');

    this.cat = new PIXI.Sprite(PIXI.loader.resources.cat.texture);
    this.app.stage.addChild(this.cat);

    // const line = new PIXI.Graphics();
    // line.lineStyle(10, 0xffffff, 0.5) // width, color hex, alpha
    //    .moveTo(0, 0)
    //    .lineTo(240, 150);
    // this.stage.addChild(line);

    const myX = 256;
    const myY = 256;

    this.drawTestCubeCentered(myX, myY);

    this.hangPoint = new PIXI.Graphics();
    this.hangPoint.beginFill(0xFFFF0B);
    this.hangPoint.drawCircle(myX, myY - 25, 5);
    // this.hangPoint.drawCircle(myX, myY + 25, 5);
    // this.hangPoint.drawCircle(myX - 25, myY, 5);
    // this.hangPoint.drawCircle(myX + 25, myY, 5);
    this.hangPoint.endFill();
    this.stage.addChild(this.hangPoint);

    this.hangPoint.interactive = true;
    this.hangPoint.buttonMode = true;
    this.hangPoint.hitArea = new PIXI.Circle(myX, myY - 25, 5);

    this.app.stage.interactive = true;
    // this.app.stage.buttonMode = true;

    // const click$ = fromEvent(this.hangPoint, 'click')
    // .subscribe((event: PIXI.interaction.InteractionEvent) => {
    //   console.log('Start draw the line');
    //   this.lineBuilding = true;
    //   event.stopPropagation();
    // });

    this.stage.hitArea = new PIXI.Rectangle(0, 0,
      this.app.renderer.width / this.app.renderer.resolution,
      this.app.renderer.height / this.app.renderer.resolution
    );

    // this.hangPoint.on('click', (e: PIXI.interaction.InteractionEvent) => {
    //   console.log('hangPoint', e);
    //   e.stopPropagation();

    //   this.stage.on('click', (ev) => {
    //     console.log('stage click', ev);
    //     this.stage.off('click');
    //   });
    // });

    const hangSub = fromEvent(this.hangPoint, 'click')
      .subscribe((e: PIXI.interaction.InteractionEvent) => {
        this.coordinate = {
          x: e.data.getLocalPosition(this.hangPoint.parent).x,
          y: e.data.getLocalPosition(this.hangPoint.parent).y
        };
        console.log('hang', this.coordinate);
        this.lineBuilding = true;
        e.stopPropagation();
      });

    const stageSub = fromEvent(this.stage, 'click')
      .subscribe((e: PIXI.interaction.InteractionEvent) => {
        if (this.lineBuilding) {
          this.lineBuilding = false;

          const newPos = e.data.getLocalPosition(this.stage);
          console.log('stage', newPos);

          const line = new PIXI.Graphics();
          line.lineStyle(3, 0xffffff) // width, color hex, alpha
            .moveTo(this.coordinate.x, this.coordinate.y)
            .lineTo(newPos.x, newPos.y);
          this.stage.addChild(line);
        }
      });

    // DOM element
    // this.app.view.addEventListener('click', (e: MouseEvent) => {
    //   console.log('app.view', e);
    // });

    // this.stage.interactive = true;


    // const interactionManager = new PIXI.interaction.InteractionManager(this.app.renderer);
    // interactionManager.click = (e) => {
    //   console.log(e);
    // };

    // Init before all other click signal
    // const viewClick$ = fromEvent(this.app.view, 'click')
    //   .subscribe((event) => {
    //     console.log('viewClick$');
    //     if (this.lineBuilding) {
    //       console.log('End draw the line');
    //       this.lineBuilding = false;
    //     }
    //   });


    // let click$ = fromEvent(this.hangPoint, 'click')
    //   .subscribe((event) => {
    //     console.log('click$');
    //   }).takeUntil()

    // fromEvent(this.hangPoint, 'click')
    //   .pipe(takeUntil(fromEvent(this.hangPoint, 'click')))
    //   .subscribe((event) => {
    //     console.log(event);
    // });

    this.hangPointVisible = true;

    // console.log(this.hangPoint);

    this.animate();
  }

  animate() {
    this.app.renderer.render(this.app.stage);
    requestAnimationFrame(this.animate.bind(this));

    if (this.cat.position.x + this.cat.width <= 512) {
      this.cat.position.x += 0.1;
    }
  }

  startPoint(event: MouseEvent) {
    if (this.lineBuilding) {
      console.log('click', event.target);
      const x = event.x - (<HTMLInputElement>event.target).offsetLeft;
      const y = event.y - (<HTMLInputElement>event.target).offsetTop;

      this.lineBuilding = false;
    }

    // //const rect = event.target.getBoundingClientRect();

    // this.drawTestCubeCentered(x, y);


    // if (this.coordinate === null) {
    //   this.coordinate = {
    //     x: event.clientX,
    //     y: event.clientY
    //   };
    // } else {
    //   const line = new PIXI.Graphics();
    //   line.lineStyle(3, 0xffffff) // width, color hex, alpha
    //     .moveTo(this.coordinate.x, this.coordinate.y)
    //     .lineTo(event.clientX, event.clientY);
    //   this.stage.addChild(line);
    // }

  }

  private drawTestCubeCentered(x, y) {
    const width = 50;
    const height = 50;
    const testCube = new PIXI.Graphics();

    testCube.beginFill(0x3498db, 0.5);
    testCube.drawRect(x, y, width, height);
    testCube.pivot.x = width / 2;
    testCube.pivot.y = height / 2;
    testCube.endFill();

    testCube.interactive = true;
    testCube.buttonMode = true;

    testCube.hitArea = new PIXI.Rectangle(x, y, width, height);
    testCube.click = this.graphicClicked.bind(this);

    console.log(testCube.position);
    this.stage.addChild(testCube);
  }

  graphicClicked(event: PIXI.interaction.InteractionEvent): void {
    console.log('Hide/show my hang point');

    if (this.hangPointVisible) {
      this.app.stage.removeChild(this.hangPoint);
      this.hangPointVisible = false;
    } else {
      this.app.stage.addChild(this.hangPoint);
      this.hangPointVisible = true;
    }
  }

}
