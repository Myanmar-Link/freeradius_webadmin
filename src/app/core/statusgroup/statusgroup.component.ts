import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { status, StatusgroupService } from 'src/app/services/statusgroup.service';

@Component({
  selector: 'app-statusgroup',
  templateUrl: './statusgroup.component.html',
  styleUrls: ['./statusgroup.component.css']
})
export class StatusgroupComponent implements OnInit {
  dataSource: any = new MatTableDataSource([]);
  displayedColumns:string[] = ['id', 'status_name', 'active', 'created_at', 'updated_at'];

  constructor(
    private statusGroupService: StatusgroupService
  ) { }
  @ViewChild(MatTable) table: MatTable<status> | any;

  async showTable(){
    let getTable = await this.statusGroupService.getStatusGroup();
    this.dataSource = getTable;
    this.table.renderRows();
  }

  ngOnInit(): void {
    this.showTable();
  }

}
