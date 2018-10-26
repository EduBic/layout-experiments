import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStubComponent } from './form-stub.component';

describe('FormStubComponent', () => {
  let component: FormStubComponent;
  let fixture: ComponentFixture<FormStubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
