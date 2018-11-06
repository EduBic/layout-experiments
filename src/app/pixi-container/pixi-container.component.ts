import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare const PIXI: any;

@Component({
  selector: 'app-pixi-container',
  templateUrl: './pixi-container.component.html',
  styleUrls: ['./pixi-container.component.css']
})
export class PixiContainerComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  myApp: any;

  // Check installation:
  // https://www.reddit.com/r/pixijs/comments/9dzdme/how_to_use_pixi_js_with_angular_6/
  constructor() { }

  ngOnInit() {
    this.myApp = new PIXI.Application({ width: 800, height: 600 });
    this.container.nativeElement.appendChild(this.myApp.view);
  }
}
