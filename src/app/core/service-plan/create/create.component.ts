import { Component, OnInit } from '@angular/core';
import { ServicePlanService } from 'src/app/services/service-plan.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import moment from 'moment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title: string = '';
  download_limit: number = 0;
  upload_limit: number = 0;
  total_limit: number = 0;
  expriry_date: string = new Date().toString();
  balance: number = 0;

  isLoading: boolean = false;

  constructor(
    private utilitiesService: UtilitiesService,
    private servicePlanService: ServicePlanService
  ) { }

  async create() {

    if(this.title === '' || this.expriry_date === '') {
      this.utilitiesService.openToast("All fields are required", 'REQUIRED');
      return;
    }

    if(!Number(this.upload_limit) || !Number(this.total_limit) || !Number(this.download_limit)) {
      this.utilitiesService.openToast('Upload, Download and Total limit must be number', 'INVALID');
      return;
    }

    if(!Number(this.balance)) {
      this.utilitiesService.openToast('Balance must be number', 'INVALID');
      return;
    }

    const newServicePlan = {
      title: this.title,
      download_limit: this.download_limit,
      upload_limit: this.upload_limit,
      total_limit: this.total_limit,
      expriry_date: moment(this.expriry_date).format('Y-M-D hh:mm:ss'),
      balance: this.balance
    }
    
    this.isLoading = true;
    await this.servicePlanService.create(newServicePlan);
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

}
