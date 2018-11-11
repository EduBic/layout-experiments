import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixiPositionComponentComponent } from './pixi-position-component.component';

describe('PixiPositionComponentComponent', () => {
  let component: PixiPositionComponentComponent;
  let fixture: ComponentFixture<PixiPositionComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixiPositionComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixiPositionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
