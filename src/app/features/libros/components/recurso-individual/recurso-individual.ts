import { Component, inject } from '@angular/core';
import { input, signal } from '@angular/core';
import IRecurso from '../../../../Core/models/recurso.model';
import { RecursoService } from '../../../../Core/services/recurso.service';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../../../Core/services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recurso-individual',
  imports: [FormsModule],
  templateUrl: './recurso-individual.html',
  styleUrl: './recurso-individual.css',
})
export class RecursoIndividual {
  recurso = input<Partial<IRecurso>>();
  editMode = signal<boolean>(false); // flag de modo editar
  recursoService: RecursoService = inject(RecursoService);
  toast: ToastService = inject(ToastService);

  temporal: Partial<IRecurso> = this.recurso()!;

  onDeleteClick() {
    this.recursoService
      .deleteRecurso(this.temporal._id as string)
      .pipe(
        catchError((error) => {
          this.toast.show('error', error.error);
          return throwError(error);
        }),
      )
      .subscribe((data) => {});
  }

  onEditClick() {
    if (!this.editMode()) {
      this.editMode.set(true);
    } else {
      this.editMode.set(false);
      this.recursoService
        .updateRecurso(this.temporal._id as string, this.temporal)
        .pipe(
          catchError((error) => {
            this.toast.show('error', error.error);
            return throwError(error);
          }),
        )
        .subscribe((data) => {
          this.toast.show('info', 'Successfully updated!');
        });
    }
  }
}
