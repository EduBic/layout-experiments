import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiContainerComponent } from './gui-container.component';

describe('GuiContainerComponent', () => {
  let component: GuiContainerComponent;
  let fixture: ComponentFixture<GuiContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
