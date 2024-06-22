import { Directionality } from '@angular/cdk/bidi';
import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AnimalsService } from '@shared/services/animals.service';

@Component({
    selector: 'modal-status',
    templateUrl: 'modal-status.component.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatDatepickerModule, MatInputModule, FormsModule],
})
export class ModalStatusComponent {

    @ViewChild('template') template!: TemplateRef<any>;
    message = 'Snack Bar opened.';
    actionButtonLabel = 'Retry';
    action = false;
    setAutoHide = true;
    autoHide = 10000;
    addExtraClass = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    animal: any;
    adoptionDate!: Date;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ModalStatusComponent>,
        private animalsService: AnimalsService,
        public snackBar: MatSnackBar,
        private _dir: Directionality) {
                    
        this.animal = data.data;
        if (this.animal.adoptionDate != null) {
            this.adoptionDate = this.animal.adoptionDate;
        }
    }

    change() {
        console.log(this.adoptionDate);
        if (this.adoptionDate == undefined) {
            this.adoptionDate = new Date();
        }
        
        this.animalsService.changeActive(this.animal.id, this.adoptionDate).subscribe((result: any) => {
            const config = this._createConfig();
            this.snackBar.open("Mudança de status com sucesso!", undefined, config);
            this.dialogRef.close();
        });
    }

    cancel(){
        this.dialogRef.close();
    }

    private _createConfig() {
        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? this.autoHide : 0;
        config.panelClass = this.addExtraClass ? ['demo-party'] : undefined;
        config.direction = this._dir.value;
        return config;
    }
}