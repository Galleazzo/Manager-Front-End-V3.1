import { Directionality } from "@angular/cdk/bidi";
import { Component, Inject, TemplateRef, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { AnimalsService } from "@shared/services/animals.service";


@Component({
    selector: 'modal-view-image',
    templateUrl: 'view-image-modal.component.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, BrowserModule],
})
export class ViewImageModalComponent {

    @ViewChild('template') template!: TemplateRef<any>;
    animal: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ViewImageModalComponent>,
        private animalsService: AnimalsService,
        public snackBar: MatSnackBar,
        private _dir: Directionality) {

        this.animal = data.data;
        console.log("modalssssss"+this.animal);
        
    }

    
    cancel(){
        this.dialogRef.close();
    }
}