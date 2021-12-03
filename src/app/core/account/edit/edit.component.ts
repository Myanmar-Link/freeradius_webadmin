import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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
    @Inject(MAT_DIALOG_DATA)private data: any,
    private utilitiesService: UtilitiesService,
    private accountService: AccountService,
    private dialog: MatDialog
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.accountList = await this.accountService.getAll();
    this.isLoading = false;
  }

  async update(){
    if(this.mac_address === '' || this.type_id === '' || this.password === '' || this.mac_address_cm === '' || this.is_ip_address_mode_cm === '' || this.is_ip_address_mode_cpe === '',
    this.mac_address_cpe === '' , this.allow_this_mac_only === '' || this.ip_address_mode_cpe_id === '' || this.simultaneous_use === '' || this.vat_id === '' ){
      this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
    }
    const updateRequest = {
      mac_address: this.mac_address,
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
    await this.accountService.update(this.data.id, updateRequest);
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.mac_address = this.data.mac_address;
    this.type_id = this.data.type_id;
    this.password = this.data.password;
    this.mac_address_cm = this.data.mac_address;
    this.is_ip_address_mode_cm = this.data.is_ip_address_mode_cm;
    this.is_ip_address_mode_cpe = this.data.is_ip_address_mode_cpe;
    this.mac_address_cpe = this.data.mac_address_cpe;
    this.allow_this_mac_only = this.data.allow_this_mac_only;
    this.ip_address_mode_cpe_id = this.data.ip_address_mode_cpe_id;
    this.simultaneous_use = this.data.simultaneous_use;
    this.vat_id = this.data.vat_id;
    this.loadingData();
  }

}
