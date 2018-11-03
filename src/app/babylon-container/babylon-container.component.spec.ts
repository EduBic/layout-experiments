import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabylonContainerComponent } from './babylon-container.component';

describe('BabylonContainerComponent', () => {
  let component: BabylonContainerComponent;
  let fixture: ComponentFixture<BabylonContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabylonContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabylonContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
