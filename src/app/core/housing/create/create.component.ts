import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  state_id: number | null = null;
  township_id: number | null = null;
  ward_id: number | null = null;
  street_id: number | null = null;
  housing_name: string = '';
  location: string = '';
  isLoading: boolean = false;
  houseList: any[] = [];

  constructor(
    private housingService: HousingService,
    private utilitiesService: UtilitiesService
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.houseList = await this.housingService.getAll();
    this.isLoading = false;
  }

  async create(){
    if(this.state_id === 0 || this.township_id === 0 || this.ward_id === 0 || this.street_id === 0
      || this.housing_name === '' || this.location === ''){
        this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
      }
      const newRequest = {
        state_id: this.state_id,
        township_id: this.township_id,
        ward_id: this.ward_id,
        street_id: this.street_id,
        housing_name: this.housing_name,
        location: this.location
      }
      this.isLoading = true;
      await this.housingService.create(newRequest);
      this.state_id = null;
      this.township_id = null;
      this.ward_id = null;
      this.street_id = null;
      this.housing_name = '';
      this.location = '';
      this.isLoading =false;
      return;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
