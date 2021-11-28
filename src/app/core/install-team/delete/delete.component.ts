import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstallTeamService } from 'src/app/services/install-team.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  isLoading: boolean = false;
  installTeam: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilitiesService: UtilitiesService,
    private installTeamService: InstallTeamService,
    private dialog: MatDialog
  ) { }

  private setData(){
    this.installTeam = this.data;
  }

  async confirm(){
    this.isLoading = true;
    await this.installTeamService.del(this.installTeam.id);
    this.dialog.closeAll();
    this.isLoading = false;
  }

  async close(){
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.setData();
  }

}
