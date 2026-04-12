import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { ToastService } from '../../../../Core/services/toast.service';
import { ICoordinate } from '../../../../Core/models/Coordinate';
import { FormsModule } from '@angular/forms';
import { Toast } from "../../../../shared/components/toast/toast";

@Component({
  selector: 'app-coordinate-modal',
  imports: [FormsModule, Toast],
  templateUrl: './coordinate-modal.html',
  styleUrl: './coordinate-modal.css',
})
export class CoordinateModal {

  data : Partial<ICoordinate> = {};

  toast = inject(ToastService);
  // Lo hago asi por inversion de control o dependency injection
  callback = input<(data: Partial<ICoordinate>)=>void>();
  actionText = input<string>("");

  @ViewChild('dialog') dialog!: ElementRef;
  OpenDialog() {
    this.dialog.nativeElement.showModal();
    this.toast.show('info', 'Modal has been created');
  }

  onSave(){
    if(this.data.latitude === null || this.data.longitude === null)
    {
      this.toast.show('error','Los campos latitude y longitude no pueden estar vacios');
      return;
    }

    this.callback()!(this.data);
    this.dialog.nativeElement.close();
  }
}
