import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
    animal: string;
    name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'hs-dialog-overview-example',
    templateUrl: './dialog-overview-example.html',
})
export class DialogOverviewExample {
    animal: string;

    name: string;

    // eslint-disable-next-line no-empty-function,no-useless-constructor
    constructor(public dialog: MatDialog) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            data: { name: this.name, animal: this.animal },
        });

        // eslint-disable-next-line rxjs/no-ignored-error
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.animal = result;
        });
    }
}

@Component({
    selector: 'hs-dialog-overview-example-dialog',
    templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
