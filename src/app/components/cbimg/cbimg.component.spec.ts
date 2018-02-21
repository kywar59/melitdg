import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbimgComponent } from './cbimg.component';

describe('CbimgComponent', () => {
  let component: CbimgComponent;
  let fixture: ComponentFixture<CbimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
