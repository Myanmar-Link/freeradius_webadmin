import { Component, OnInit } from '@angular/core';
import { DeptService } from 'src/app/services/dept.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  deptName: string = '';

  constructor(
    private utilitiesService: UtilitiesService,
    private deptService: DeptService
  ) { }

  createDept(){
    if(this.deptName === ''){
      return this.utilitiesService.openToast('Department Name is required','REQUIRED')
    }

    return this.deptService.createDepartment(this.deptName);
  }

  ngOnInit(): void {
    this.deptService.getDepartment();
  }

}
