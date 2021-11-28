import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstallTeamService } from 'src/app/services/install-team.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  install_team_name: string = '';
  employee_id: number = 0;
  isLoading: boolean = false;
  teamList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private installTeamService: InstallTeamService,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog
  ) { }

  async loadingData(){
    this.isLoading = true;
    this.teamList = await this.installTeamService.getAll();
    this.isLoading = false;
  }

  async update(){
    if(this.install_team_name === '' || this.employee_id === 0){
      this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
    }
    const updateRequest = {
      install_team_name: this.install_team_name,
      employee_id: this.employee_id
    }
    this.isLoading = true;
    await this.installTeamService.update(this.data.id, updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
    return;
  }


  ngOnInit(): void {
    this.install_team_name = this.data.install_team_name;
    this.employee_id = this.data.employee_id;
  }

}
