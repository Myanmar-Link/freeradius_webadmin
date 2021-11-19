import { Component, OnInit } from '@angular/core';
import { StatusgroupService } from 'src/app/services/statusgroup.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  statusName: string = '';
  active: boolean = true;

  constructor(
    private utilitiesService: UtilitiesService,
    private statusGroupService: StatusgroupService
  ) { }

  createstatus(){
    if(this.statusName === ''){
      return this.utilitiesService.openToast('Status Name is Required','REQUIRED');
    }
    return this.statusGroupService.createStatusGroup(this.statusName);
  }

  ngOnInit(): void {
  }

}
