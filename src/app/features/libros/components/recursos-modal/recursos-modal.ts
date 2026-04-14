import { Component, ElementRef, inject, OnInit, signal, ViewChild, input } from '@angular/core';
import { Toast } from '../../../../shared/components/toast/toast';
import { ToastService } from '../../../../Core/services/toast.service';
import { catchError, retry, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RecursoService } from '../../../../Core/services/recurso.service';
import IRecurso from '../../../../Core/models/recurso.model';
import { RecursoIndividual } from '../recurso-individual/recurso-individual';
import { Libro } from '../../../../Core/models/libro.model';

// Gran parte es un copia y pega de libro-modal, en el su respectivo actividad he dejado las referencias.

@Component({
  selector: 'app-recursos-modal',
  imports: [RecursoIndividual, FormsModule],
  templateUrl: './recursos-modal.html',
  styleUrl: './recursos-modal.css',
})
export class RecursosModal implements OnInit {
  toast = inject(ToastService);
  recursoService = inject(RecursoService);
  buffer = signal<IRecurso[]>([]);
  libro = input<Libro>();
  addMode = signal<boolean>(false);

  inputName : string = "";
  inputUrl : string = "";
  inputType : string = "";


  @ViewChild('dialog') dialog!: ElementRef;
  OpenDialog() {
    this.dialog.nativeElement.showModal();
    this.toast.show('info', 'Modal has been created');
    this.callApi();
  }
  onClose() {
    this.dialog.nativeElement.close();
  }

  ngOnInit(): void {
    //this.callApi(); // hombre no
  }

  addRecurso() {
    if (!this.addMode()) {
      this.addMode.set(true);
    } else {
      this.addMode.set(false);
      if(this.inputName !== "" && this.inputUrl !== "" && this.inputType !=="")
        {        
        const data : Partial<IRecurso> = {name:this.inputName, url: this.inputUrl, type: this.inputType as 'Manual' | 'Video' | 'Image' | 'Others'};
        this.recursoService.createRecurso(data)
      this.toast.show('info', 'Recurso was created! ' + JSON.stringify(data));
}    }
  }

  // Separado, por si queremos refrescar en otro lado
  callApi() {
    this.recursoService
      .readRecursoByLibro(this.libro()?._id as string)
      .pipe(
        catchError((error) => {
          this.toast.show('error', error.error);
          return throwError(error);
        }),
      )
      .subscribe((data) => {
        this.toast.show('info', 'Successfully retrieved!');
        this.buffer.set(data);
      });
  }
}
