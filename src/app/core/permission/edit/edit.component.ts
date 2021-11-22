import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionService } from 'src/app/services/permission.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  name: string = '';
  read: boolean = false;
  write: boolean = false;
  edit: boolean = false;
  del: boolean = false;
  status: boolean = false;

  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilitiesService: UtilitiesService,
    private permissionService: PermissionService,
    private dialog: MatDialog
  ) { }

  private setData() {
    this.name = this.data.permission_name;
    this.read = this.data.read;
    this.write = this.data.write;
    this.del = this.data.delete;
    this.edit = this.data.edit;
    this.status = this.data.status;
  }

  async update() {
    if(this.name === '') {
      this.utilitiesService.openToast('Permission name is required', 'Dismiss');
      return;
    }

    if(this.read === false && this.write === false && this.del === false && this.edit === false) {
      this.utilitiesService.openToast('Need to choose permission');
      return;
    }

    const updateRequest = {
      permission_name: this.name,
      read: this.read,
      write: this.write,
      edit: this.edit,
      delete: this.del,
      status: this.status
    }

    this.isLoading = true;
    await this.permissionService.update(this.data.id, updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.setData();
  }

}
