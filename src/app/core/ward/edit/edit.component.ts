import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { WardService } from 'src/app/services/ward.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  ward_name: string = '';
  township_id: number | null = null;
  isLoading: boolean = false;
  wardList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private wardService: WardService,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.wardList = await this.wardService.getAll();
    this.isLoading = false;
  }

  async update(){
    if(this.ward_name === '' || this.township_id === 0 || this.township_id === null){
      this.utilitiesService.openToast('All fields must be filled', 'REQUIRED');
    }
    const updateRequest = {
      ward_name: this.ward_name,
      township_id: this.township_id
    }
    this.isLoading = true;
    await this.wardService.update(this.data.id ,updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.ward_name = this.data.ward_name;
    this.township_id = this.data.township_id;
  }

}
