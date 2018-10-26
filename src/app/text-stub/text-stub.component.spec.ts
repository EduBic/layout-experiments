import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStubComponent } from './text-stub.component';

describe('TextStubComponent', () => {
  let component: TextStubComponent;
  let fixture: ComponentFixture<TextStubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextStubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
