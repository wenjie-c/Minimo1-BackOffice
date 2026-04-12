import { Component, inject, input } from '@angular/core';
import { ICoordinate } from '../../../../Core/models/Coordinate';
import { CoordinateService } from '../../../../Core/services/coordinate-service';
import { catchError } from 'rxjs';
import { ToastService } from '../../../../Core/services/toast.service';
import { Toast } from '../../../../shared/components/toast/toast';
import { CoordinateModal } from '../coordinate-modal/coordinate-modal';

@Component({
  selector: 'app-entry',
  imports: [Toast, CoordinateModal],
  templateUrl: './entry.html',
  styleUrl: './entry.css',
})
export class Entry {
  coordinates = input<Partial<ICoordinate>>({});

  service = inject(CoordinateService);
  toast = inject(ToastService);

  deleteCoordinate() {
    this.service
      .deleteCoordinate(this.coordinates()?._id as string)
      .pipe(
        catchError((err) => {
          this.toast.show('error', 'Couldnt delete it!');
          throw err;
        }),
      )
      .subscribe((res) => {
        // suscribimos con un callback
        this.toast.show('info', 'This coordinate has been delete.');
      });
  }

  modalCallback = (data: Partial<ICoordinate>) => {
    this.service
      .updateCoordinate(this.coordinates()?._id as string, data)
      .pipe(
        catchError((err) => {
          this.toast.show('error', `An error ocurred: ` + err);

          throw err;
        }),
      )
      .subscribe((res) => {
        // suscribimos con un callback
        this.toast.show('info', `Item ${JSON.stringify(res)} has been updated`);
      });
  };
}
