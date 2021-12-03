import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusService } from 'src/app/services/status.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  status_group_id: number | null = null;
  status_name: string = '';
  remark: string = '';
  statusList: any[] = [];
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private statusService: StatusService,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog
  ) { }

  async loadingDatat(){
    this.isLoading = true;
    this.statusList = await this.statusService.getAll();
    
    this.isLoading = false;
  }

  async update(){
    if(this.status_group_id === 0 || this.status_name === '' || this.remark === '' || this.status_group_id === null){
      this.utilitiesService.openToast('All field must be filled', 'REQUIRED');
    }
    const updateRequest = {
      status_group_id: this.status_group_id,
      status_name: this.status_name,
      remark: this.remark
    }
    this.isLoading = true;
    await this.statusService.update(this.data.id, updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.status_name = this.data.status_name;
    this.status_group_id = this.data.status_group_id;
    this.remark = this.data.remark;
  }

}
