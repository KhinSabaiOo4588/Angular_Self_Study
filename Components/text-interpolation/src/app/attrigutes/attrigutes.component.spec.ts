import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttrigutesComponent } from './attrigutes.component';

describe('AttrigutesComponent', () => {
  let component: AttrigutesComponent;
  let fixture: ComponentFixture<AttrigutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttrigutesComponent]
    });
    fixture = TestBed.createComponent(AttrigutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
