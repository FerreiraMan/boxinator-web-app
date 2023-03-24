import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {

  isDialogOpen = false;

  constructor(public dialog: MatDialog){}

  openDialog(){
    if (!this.isDialogOpen) {
      this.isDialogOpen = true;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.panelClass = 'my-custom-dialog-class';
      const dialogRef = this.dialog.open(OrderModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen = false;
      });
    }
  }
}
