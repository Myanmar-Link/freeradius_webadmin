import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusGroupService } from 'src/app/services/status-group.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
   
  isLoading: boolean = false;
  status: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private statusGroupService: StatusGroupService,
    private dialog: MatDialog
  ) { }

  private setData(){
    this.status = this.data;
  }

  async confirm(){
    this.isLoading = true;
    await this.statusGroupService.del(this.status.id);
    this.dialog.closeAll();
    this.isLoading = false;
  }

  async close(){
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.setData();
    console.log(this.data);
  }

}
