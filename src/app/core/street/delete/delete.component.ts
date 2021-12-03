import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StreetService } from 'src/app/services/street.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  isLoading: boolean = false;
  street: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilitiesService: UtilitiesService,
    private streetService: StreetService,
    private dialog: MatDialog
  ) { }

  private setData(){
    this.street = this.data;
  }

  async confirm(){
    this.isLoading = true;
    await this.streetService.del(this.street.id);
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
