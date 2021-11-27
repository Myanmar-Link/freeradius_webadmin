import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusGroupService } from 'src/app/services/status-group.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  status_name: string = '';
  isLoading: boolean = false;
  statusList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private statusGroupService: StatusGroupService,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog
  ) { }

  private async LoadingData(){
    this.isLoading = true;
    this.statusList = await this.statusGroupService.getAll();

    this.isLoading = false;
  }

  async update(){
    if(this.status_name === ''){
      this.utilitiesService.openToast('Status name is required', 'REQUIRED');
    }
    const updateRequest = {
      status_name: this.status_name
    }
    this.isLoading = true;
    await this.statusGroupService.update(this.data.id, updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.status_name = this.data.status_name;
  }

}
