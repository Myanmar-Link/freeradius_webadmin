import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PERMISSION } from 'src/app/models/permission.model';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  name: string = '';
  read: boolean = false;
  write: boolean = false;
  edit: boolean = false;
  del: boolean = false;
  isLoading: boolean = false;

  constructor(
    private utilitiesService: UtilitiesService,
    private route: Router
  ) { }

  create() {
    if(this.name === '') {
      return this.utilitiesService.openToast('Permission name is required', 'REQUIRED')
    }

    if(this.read === false && this.write === false && this.edit === false && this.del === false){
      return this.utilitiesService.openToast('Select one permission type.', 'CHOOSE');
    }

    const newPermission: PERMISSION = {
      permission_name: this.name,
      write: this.write,
      read: this.read,
      edit: this.edit,
      delete: this.del
    }

    return;
  }

  ngOnInit(): void {
    // const urlData = this.route.getCurrentNavigation();
    // console.log(urlData);
  }

}
