import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosModal } from './recursos-modal';

describe('RecursosModal', () => {
  let component: RecursosModal;
  let fixture: ComponentFixture<RecursosModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosModal],
    }).compileComponents();

    fixture = TestBed.createComponent(RecursosModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
