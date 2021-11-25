import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerGroupService } from 'src/app/services/customer-group.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  name: string = '';

  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilitiesService: UtilitiesService,
    private customerGroupService: CustomerGroupService,
    private dialog: MatDialog
  ) { }

  private setData() {
    this.name = this.data.title;
  }

  async update() {
    if(this.name === '') {
      this.utilitiesService.openToast('Customer group name is required', 'REQUIRED');
      return;
    }
    const updateRequest = {
      title: this.name,
    }

    this.isLoading = true;
    await this.customerGroupService.update(this.data.id, updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.setData();
  }

}
