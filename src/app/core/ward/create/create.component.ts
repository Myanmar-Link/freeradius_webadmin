import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { WardService } from 'src/app/services/ward.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  ward_name: string = '';
  township_id: number | null = null;
  isLoading: boolean = false;
  townshipList: any[] = [];

  constructor(
    private utilitiesService: UtilitiesService,
    private wardService: WardService
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.townshipList = await this.wardService.getAll();
    
    this.isLoading = false;
  }

  async create(){
    if(this.ward_name === '' || this.township_id === 0 || this.township_id === null){
      this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
    }
    const newRequest = {
      ward_name: this.ward_name,
      township_id: this.township_id
    }
    this.isLoading = true;
    await this.wardService.create(newRequest);
    this.ward_name = '';
    this.township_id = null;
    this.isLoading = false;
    return;
  }


  ngOnInit(): void {
    this.loadingData();
  }

}
