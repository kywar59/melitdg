import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasComponent } from './respuestas.component';

describe('RespuestasComponent', () => {
  let component: RespuestasComponent;
  let fixture: ComponentFixture<RespuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
