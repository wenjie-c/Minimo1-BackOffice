import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateModal } from './coordinate-modal';

describe('CoordinateModal', () => {
  let component: CoordinateModal;
  let fixture: ComponentFixture<CoordinateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinateModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CoordinateModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
