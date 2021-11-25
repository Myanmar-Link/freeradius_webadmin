import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerGroupService } from 'src/app/services/customer-group.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  customerGroup: any;
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private customerGroupService: CustomerGroupService,
    private dialog: MatDialog
  ) { }

  private setData() {
    this.customerGroup = this.data;
  }

  async confirm() {
    this.isLoading = true;
    await this.customerGroupService.del(this.customerGroup.id);
    this.dialog.closeAll();
    this.isLoading = false;
  }

  async close() {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.setData();
  }

}
