import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  name: string = '';
  status: boolean = false;

  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilitiesService: UtilitiesService,
    private departmentService: DepartmentService,
    private dialog: MatDialog
  ) { }

  private setData() {
    this.name = this.data.department_name;
    this.status = this.data.status;
  }

  async update() {
    if(this.name === '') {
      this.utilitiesService.openToast('Department name is required', 'REQUIRED');
      return;
    }

    const updateRequest = {
      department_name: this.name,
      status: this.status
    }

    this.isLoading = true;
    await this.departmentService.update(this.data.id, updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.setData();
  }

}
