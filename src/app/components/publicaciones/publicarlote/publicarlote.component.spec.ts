import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarloteComponent } from './publicarlote.component';

describe('PublicarloteComponent', () => {
  let component: PublicarloteComponent;
  let fixture: ComponentFixture<PublicarloteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicarloteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarloteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
