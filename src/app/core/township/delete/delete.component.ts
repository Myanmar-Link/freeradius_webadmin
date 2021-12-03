import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TownshipService } from 'src/app/services/township.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  isLoading: boolean = false;
  township: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)private data: any,
    private utilitiesService: UtilitiesService,
    private townshipService: TownshipService,
    private dialog: MatDialog
  ) { }

    private setData(){
      this.township = this.data;
    }

    async confirm(){
      this.isLoading = true;
      this.townshipService.del(this.township.id);
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
