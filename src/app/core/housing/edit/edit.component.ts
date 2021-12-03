import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HousingService } from 'src/app/services/housing.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  state_id: number | null = null;
  township_id: number | null = null;
  ward_id: number | null = null;
  street_id: number | null = null;
  housing_name: string = '';
  location: string = '';
  isLoading: boolean = false;
  housingList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)private data: any,
    private utitlitiesService: UtilitiesService,
    private housingService: HousingService,
    private dialog: MatDialog
  ) { }

  async loadingData(){
    this.isLoading = true;
    this.housingList = await this.housingService.getAll();
    this.isLoading = false;
  }

  async update() {
    if(this.state_id === 0 || this.township_id === 0 || this.ward_id === 0 || this.street_id === 0
      || this.housing_name === '' || this.location === '' || this.state_id === null || this.township_id === null ||
      this.ward_id === null){
        this.utitlitiesService.openToast('All fields must be filled', 'REQUIRED');
      }
      const updateRequest = {
        state_id: this.state_id,
        township_id: this.township_id,
        ward_id: this.ward_id,
        street_id: this.state_id,
        housing_name: this.housing_name,
        location: this.location
      }
      this.isLoading = true;
      await this.housingService.update(this.data.id, updateRequest);
      this.dialog.closeAll();
      this.isLoading = false;
      return;
  }

  ngOnInit(): void {
    this.state_id = this.data.state_id;
    this.township_id = this.data.township_id;
    this.ward_id = this.data.ward_id;
    this.street_id = this.data.street_id;
    this.housing_name = this.data.housing_name;
    this.location = this.data.location;
  }

}
