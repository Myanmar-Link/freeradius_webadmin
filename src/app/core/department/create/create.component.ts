import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  name: string = '';
  isLoading: boolean = false;

  constructor(
    private utilitiesService: UtilitiesService,
    private departmentService: DepartmentService
  ) { }

  async create() {
    if(this.name === '') {
      return this.utilitiesService.openToast('Department name is required', 'REQUIRED');
    }

    const newDepartment = {
      department_name: this.name
    }

    this.isLoading = true;
    await this.departmentService.create(newDepartment);
    this.isLoading = false;

    return;
  }

  ngOnInit(): void {
  }

}
