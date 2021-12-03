import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HousingService } from 'src/app/services/housing.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  isLoading: boolean = false;
  housing: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utitlitiesService: UtilitiesService,
    private housingService: HousingService,
    private dialog: MatDialog
  ) { }

  private setData(){
    this.housing = this.data;
  }

  async confirm(){
    this.isLoading = true;
    this.housingService.del(this.housing.id);
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
