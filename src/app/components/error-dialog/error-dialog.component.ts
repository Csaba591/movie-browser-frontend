import { Component, Inject } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.less']
})
export class ErrorDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public errorMessage: string) {}
}
