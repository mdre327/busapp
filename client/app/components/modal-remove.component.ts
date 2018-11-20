// Import Libraries
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

/**
 * Ask confirm for remove an object
 */
@Component({
    selector: 'modal-remove',
    templateUrl: './modal-remove.component.html',
})
export class ModalRemoveComponent {

    constructor(
        public dialogRef: MatDialogRef<ModalRemoveComponent>,
        @Inject(MAT_DIALOG_DATA) public remove: any
    ) { }

    close(): void {
        this.dialogRef.close();
    }

}