import { Component, OnInit } from '@angular/core';
import { InstallTeamService } from 'src/app/services/install-team.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  install_team_name: string = '';
  employee_id: number = 0;
  isLoading: boolean = false;
  teamList: any[] = [];

  constructor(
    private utilitiesService: UtilitiesService,
    private installTeamService: InstallTeamService
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.teamList = await this.installTeamService.getAll();
    
    this.isLoading = false;
  }

  async create(){
    if(this.install_team_name === '' || this.employee_id === 0){
      this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
    }
    const newRequest = {
      install_team_name: this.install_team_name,
      employee_id: this.employee_id
    }
    this.isLoading = true;
    await this.installTeamService.create(newRequest);
    this.install_team_name = '';
    this.employee_id = 0;
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
