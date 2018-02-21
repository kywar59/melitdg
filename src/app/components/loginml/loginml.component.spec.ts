import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmlComponent } from './loginml.component';

describe('LoginmlComponent', () => {
  let component: LoginmlComponent;
  let fixture: ComponentFixture<LoginmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
