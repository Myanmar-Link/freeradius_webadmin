import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services/status.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  status_group_id: number = 0;
  status_name: string = '';
  remark: string = '';
  isLoading: boolean = false;
  statusList: any[] = [];

  constructor(
    private statusService: StatusService,
    private utilitiesService: UtilitiesService
  ) { }

  async loadingData(){
    this.isLoading = true;
    this.statusList = await this.statusService.getAll();

    this.isLoading = false;

  }
  async create(){
    if(this.status_group_id === 0 || this.status_name === '' || this.remark === ''){
      this.utilitiesService.openToast('All field must be filled', 'REQUIRED');
    }
    const newRequest = {
      status_group_id: this.status_group_id,
      status_name: this.status_name,
      remark: this.remark
    }
    this.isLoading = true;
    this.statusService.create(newRequest);
    this.status_group_id = 0 ;
    this.status_name = '';
    this.remark = '';
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
