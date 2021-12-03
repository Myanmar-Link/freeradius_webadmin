import { Component, OnInit } from '@angular/core';
import { TownshipService } from 'src/app/services/township.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  isLoading: boolean = false;
  township_name: string = '';
  state_id: number = 0;
  townshipList: any[] = [];

  constructor(
    private townshipService: TownshipService,
    private utilitiesService: UtilitiesService
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.townshipList = await this.townshipService.getAll();
    this.isLoading = false;
  }

  async create(){
    if(this.township_name === '' || this.state_id === 0){
      this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
    }
    const newRequest = {
      township_name: this.township_name,
      state_id: this.state_id
    }
    this.isLoading = true;
    await this.townshipService.create(newRequest);
    this.township_name = '';
    this.state_id = 0;
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
