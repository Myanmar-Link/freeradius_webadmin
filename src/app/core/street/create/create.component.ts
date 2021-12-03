import { Component, OnInit } from '@angular/core';
import { StreetService } from 'src/app/services/street.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  street_name: string = '';
  ward_id: number | null = null;
  isLoading: boolean = false;
  streetList: any[] = [];

  constructor(
    private utilitiesService: UtilitiesService,
    private streetService: StreetService
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.streetList = await this.streetService.getAll();
    
    this.isLoading = false;
  }

  async create(){
    if(this.street_name === '' || this.ward_id === 0 || this.ward_id === null){
      this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
    }
    const newRequest = {
      street_name: this.street_name,
      ward_id: this.ward_id
    }
    this.isLoading = true;
    await this.streetService.create(newRequest);
    this.street_name = '';
    this.ward_id = null;
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
