import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-stub',
  templateUrl: './form-stub.component.html',
  styleUrls: ['./form-stub.component.css']
})
export class FormStubComponent implements OnInit {

  @Input()
  vertical = true;

  constructor() { }

  ngOnInit() {
    console.log(this.vertical);
  }

}
