import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoIndividual } from './recurso-individual';

describe('RecursoIndividual', () => {
  let component: RecursoIndividual;
  let fixture: ComponentFixture<RecursoIndividual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursoIndividual],
    }).compileComponents();

    fixture = TestBed.createComponent(RecursoIndividual);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
