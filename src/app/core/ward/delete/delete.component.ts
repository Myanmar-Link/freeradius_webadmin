import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { WardService } from 'src/app/services/ward.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  isLoading: boolean = false;
  ward: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)private data: any,
    private wardService: WardService,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog
  ) { }

  private setData(){
    this.ward = this.data;
  }

  async confirm(){
    this.isLoading = true;
    await this.wardService.del(this.ward.id);
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
