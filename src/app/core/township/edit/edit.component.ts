import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TownshipService } from 'src/app/services/township.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isLoading: boolean = false;
  township_name: string = '';
  state_id: number | null = null;
  townshipList: any[] =[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilitiesService: UtilitiesService,
    private townshipSerVice: TownshipService,
    private dialog: MatDialog
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.townshipList = await this.townshipSerVice.getAll();
    this.isLoading = false;
  }

  async update(){
    if(this.township_name === '' || this.state_id === 0 || this.state_id === null){
      this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
    }
    const updateRequest = {
      township_name: this.township_name,
      state_id: this.state_id
    }
    this.isLoading = true;
    await this.townshipSerVice.update(this.data.id, updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.township_name = this.data.township_name;
    this.state_id = this.data.state_id;
  }

}
