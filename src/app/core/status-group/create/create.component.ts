import { Component, OnInit } from '@angular/core';
import { StatusGroupService } from 'src/app/services/status-group.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  status_name: string = '';
  isLoading: boolean = false;
  statusList: any[] = [];

  constructor(
    private utilitiesService: UtilitiesService,
    private statusGroupService: StatusGroupService
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.statusList = await this.statusGroupService.getAll();

    this.isLoading = false;
  }

  async create(){
    if(this.status_name === ''){
      this.utilitiesService.openToast('Status name is required', 'REQUIRED');
    }
    const newRequest = {
      status_name: this.status_name
    }
    this.isLoading = true;
    this.statusGroupService.create(newRequest);
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
