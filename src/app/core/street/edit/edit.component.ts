import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StreetService } from 'src/app/services/street.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  street_name: string = '';
  ward_id: number | null = null;
  isLoading: boolean = false;
  streetList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private streetService: StreetService,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog
  ) { }

  async loadingData(){
    this.isLoading = true;
    this.streetList = await this.streetService.getAll();
    this.isLoading = false;
  }

  async update(){
    if(this.street_name === '' || this.ward_id === 0 || this.ward_id === null){
      this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
    }
    const updateRequest = {
      street_name: this.street_name,
      ward_id: this.ward_id
    }
    this.isLoading = true;
    await this.streetService.update(this.data.id, updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.street_name = this.data.street_name;
    this.ward_id = this.data.ward_id;
  }

}
