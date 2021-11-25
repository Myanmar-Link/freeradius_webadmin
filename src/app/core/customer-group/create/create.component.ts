import { Component, OnInit } from '@angular/core';
import { CustomerGroupService } from 'src/app/services/customer-group.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  title: string = '';
  isLoading: boolean = false;

  constructor(
    private utilitiesService: UtilitiesService,
    private customerGroupService: CustomerGroupService
  ) { }

  async create() {
    if(this.title === '') {
      return this.utilitiesService.openToast('Customer group is required', 'REQUIRED')
    }

    const newCustomerGroup = {
      title: this.title,
    }

    this.isLoading = true;
    await this.customerGroupService.create(newCustomerGroup);
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
  }


}
