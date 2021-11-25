import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressService } from 'src/app/services/address.service';
import { CompanyService } from 'src/app/services/company.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  company_name: string = '';
  contact_person: string = '';
  company_type: string = '';
  email_address: string = '';
  phone_number: string = '';
  state_id: number | string = '';
  township_id: number | string = '';
  ward_id: number | string = '';
  floor: number | string = '';
  building_number: number | string = '';
  street: number | string = '';
  near_street: string = '';
  location: string = '';

  stateList: any[] = [];
  townshipList: any[] = [];
  wardList: any[] = [];

  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilitiesService: UtilitiesService,
    private addressService: AddressService,
    private companyService: CompanyService,
    private dialog: MatDialog
  ) { }

  private setData() {
    this.company_name = this.data.company_name;
    this.contact_person = this.data.contact_person;
    this.company_type = this.data.type;
    this.email_address = this.data.email_address;
    this.phone_number = this.data.phone_number;
    this.state_id = this.data.state_id;
    this.ward_id = this.data.ward_id;
    this.township_id = this.data.township_id;
    this.floor = this.data.floor;
    this.near_street = this.data.near_street;
    this.street = this.data.street;
    this.building_number = this.data.building_number;
  }

  private async loadingData() {
    this.isLoading = true;
    this.stateList = await this.addressService.getAllState();
    this.townshipList = this.stateList[0].state_townships;
    this.wardList = this.townshipList[0].township_wards;

    this.state_id = this.stateList[0].id;
    this.township_id = this.townshipList[0].id;
    this.ward_id = this.wardList[0].id;

    this.isLoading = false;
  }

  /**
   * choose state [Address]
   * @param id 
   */
   chooseState(id: number | string) {
    this.state_id = id;

    const filterTownship = this.stateList.filter(value => value.id === id);
    this.townshipList = filterTownship.length > 0 ? filterTownship[0].state_townships : [];

    if(this.townshipList.length > 0) {
      this.wardList = this.townshipList[0].township_wards;
      this.ward_id = this.wardList.length > 0 ? this.wardList[0].id : [];
    } else {
      this.wardList = [];
    }
  }

  /**
   * choose township [Address]
   * @param id 
   */
  chooseTownship(id: number | string) {
    this.township_id = id;
    
    const filterWards = this.townshipList.filter(value => value.id === id);
    this.wardList = filterWards.length > 0 ? filterWards[0].township_wards : [];

    if(this.wardList.length > 0) {
      this.ward_id = this.wardList.length > 0 ? this.wardList[0].id : [];
    } else {
      this.wardList = [];
    }
  }

  /**
   * Choose ward [Address]
   * @param id 
   */
  chooseWard(id: number | string) {
    this.ward_id = id;
  }

  /**
   * update company info
   * @returns 
   */
  async update() {
    if(this.company_name === '' || this.company_type === '' || this.contact_person === '' || this.email_address === '' || this.phone_number === '') {
      return this.utilitiesService.openToast('Company infos are required', 'REQUIRED');
    }

    const updateRequest = {
      company_name: this.company_name,
      company_type: this.company_type,
      contact_persion: this.contact_person,
      email_address: this.email_address,
      phone_number: this.phone_number,
      state_id: this.state_id,
      township_id: this.township_id,
      ward_id: this.ward_id,
      floor: this.floor,
      building_number: this.building_number,
      near_street: this.near_street,
      street: this.near_street,
      locaiton: this.location
    }

    this.isLoading = true;
    await this.companyService.update(this.data.id, updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.loadingData();
    this.setData();
  }

}
