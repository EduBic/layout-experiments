import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  PaperScope,
  Project,
  Path,
  TextItem,
  Point
} from 'paper';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  @ViewChild('canvasElement') canvasElement: ElementRef;
  scope: PaperScope;
  project: Project;

  constructor() {}

  ngOnInit() {
    this.scope = new PaperScope();
    this.project = new Project(this.canvasElement.nativeElement);

    const path = new Path.Circle({
      center: this.scope.view.center,
      radius: 30,
      strokeColor: 'black'
    });

    const myPath = new Path();
    myPath.strokeColor = 'black';
    myPath.add(new Point(0, 0));
    myPath.add(new Point(100, 50));

  }

}
