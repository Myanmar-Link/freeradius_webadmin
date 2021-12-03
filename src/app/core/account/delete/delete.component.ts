import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  isLoading: boolean = false;
  account: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)private data: any,
    private accountService: AccountService,
    private dialog: MatDialog
  ) { }

    private async setData(){
      this.account = this.data;
    }

    async confirm(){
      this.isLoading = true;
      await this.accountService.del(this.data.id);
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
