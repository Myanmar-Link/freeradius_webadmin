import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  mac_address: string = '';
  type_id: string = '';
  password: string = '';
  mac_address_cm:string ='';
  is_ip_address_mode_cm: string = '';
  is_ip_address_mode_cpe: string = '';
  mac_address_cpe: string = '';
  allow_this_mac_only: string = '';
  ip_address_mode_cpe_id: string = '';
  simultaneous_use: string = '';
  vat_id: string = '';
  isLoading: boolean = false;
  accountList: any[] = [];


  constructor(
    private utilitiesService: UtilitiesService,
    private accountService: AccountService
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.accountList = await this.accountService.getAll();

    this.isLoading = false;
  }

  async create(){
    if(this.mac_address === '' || this.type_id === '' || this.password === '' || this.mac_address_cm === '' || this.is_ip_address_mode_cm === '' || this.is_ip_address_mode_cpe === '',
        this.mac_address_cpe === '' , this.allow_this_mac_only === '' || this.ip_address_mode_cpe_id === '' || this.simultaneous_use === '' || this.vat_id === '' ){
          this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
        }

        const newRequest = {
          mac_address: this.mac_address_cpe,
          type_id: this.type_id,
          password: this.password,
          mac_address_cm: this.mac_address_cm,
          is_ip_address_mode_cm: this.is_ip_address_mode_cm,
          is_ip_address_mode_cpe: this.is_ip_address_mode_cpe,
          mac_address_cpe: this.mac_address_cpe,
          allow_this_mac_only: this.allow_this_mac_only,
          ip_address_mode_cpe_id: this.ip_address_mode_cpe_id,
          simultaneous_use: this.simultaneous_use,
          vat_id: this.vat_id
        }
        this.isLoading = true;
        await this.accountService.create(newRequest);
        this.mac_address = '';
        this.type_id ='';
        this.password ='';
        this.mac_address_cm = '';
        this.is_ip_address_mode_cm = '';
        this.is_ip_address_mode_cpe = '';
        this.mac_address_cpe = '';
        this.allow_this_mac_only = '';
        this.ip_address_mode_cpe_id = '';
        this.simultaneous_use = '';
        this.vat_id = '';
        this.isLoading = false;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
