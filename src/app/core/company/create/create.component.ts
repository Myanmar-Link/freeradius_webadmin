import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  companyName: string = '';
  contactPerson: string = '';
  companyType: string = '';
  email: string = '';
  phNo: number = 0;
  addressId: string = '';

  constructor(
    private utilitiesService: UtilitiesService,
    private companyService: CompanyService
  ) { }

  createCompany(){
    if(this.companyName === '' || this.contactPerson === '' || this.companyType === '' || this.email === '' || this.phNo === 0 || this.addressId === '' || this.phNo === null)
    {
      return this.utilitiesService.openToast('All Fields Must Be Filled','REQUIRED');
    }
    return ;
  }

  ngOnInit(): void {
  }

}
