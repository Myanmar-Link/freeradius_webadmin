import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PermissionService } from 'src/app/services/permission.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  name: string | undefined;
  phone: number | undefined;
  email: string | undefined;
  position: string | undefined;
  nrc_code: number = 1;
  nrc_region: string | undefined;
  nrc_number: string | undefined;
  nrc: string | undefined;
  floor: string | number = '';
  building_number: string | number = '';
  street: string | number = '';
  near_street: string | number = '';
  department_id: number | string = '';
  permission_id: number | string = '';
  state_id: number | string = '';
  township_id: number | string = '';
  ward_id: number | string = '';
  location: string = '';

  nrcList: any[] = [];
  nrcRegionList: any[] = [];
  permissionList: any[] = [];
  departmentList: any[] = [];
  stateList: any[] = [];
  townshipList: any[] = [];
  wardList: any[] = [];

  isLoading: boolean = false;

  constructor(
    private utitlitiesService: UtilitiesService,
    private permissionService: PermissionService,
    private departmentService: DepartmentService,
    private addressService: AddressService,
    private employeeService: EmployeeService
  ) { }
  
  /**
   * Loading Data
   */
  private async loadingData() {
    this.isLoading = true;
    this.permissionList = await this.permissionService.getAll();
    this.permission_id = this.permissionList[0].id;
    
    this.departmentList = await this.departmentService.getAll();
    this.department_id = this.departmentList[0].id;

    this.stateList = await this.addressService.getAllState();
    this.townshipList = this.stateList[0].state_townships;
    this.wardList = this.townshipList[0].township_wards;

    this.state_id = this.stateList[0].id;
    this.township_id = this.townshipList[0].id;
    this.ward_id = this.wardList[0].id;

    this.nrcList = this.utitlitiesService.nrcList();
    this.nrcRegionList = this.nrcList.filter(value => Number(value.nrc_code) === Number(this.nrc_code));
    this.nrc_region = this.nrcRegionList[0].name_en;

    navigator.geolocation.getCurrentPosition((result: any) => {
      this.location = `${result.coords.latitude}, ${result.coords.longitude}`;
    });
    
    this.isLoading = false;
  }

  /**
   * NRC Code
   * @param $event 
   */
  chooseCode($event: any) {
    this.nrc_code = Number($event.value);
    const nrcData: any[] = this.utitlitiesService.nrcList();
    
    this.nrcRegionList = nrcData.filter(value => Number(value.nrc_code) === Number($event.value));
    this.nrc_region = this.nrcRegionList[0].name_en;
  }

  /**
   * NRC Region
   * @param $event 
   */
  chooseRegion($event: any) {
    this.nrc_region = $event.value;
  }

  /**
   * Permisison
   * @param $event 
   */
  choosePermission($event: any) {
    this.permission_id = $event.value;
  }

  /**
   * Department
   * @param $event 
   */
  chooseDepartment($event: any) {
    this.department_id = $event.value;
  }
  /**
   * choose state [Address]
   * @param id 
   */
   chooseState(id: number | string) {
    this.state_id = id;

    const filterTownship = this.stateList.filter(value => value.id === id);
    this.townshipList = filterTownship.length > 0 ? filterTownship[0].state_townships : [];

    if(this.townshipList.length > 0) {
      this.wardList = this.townshipList[0].township_wards;
      this.ward_id = this.wardList.length > 0 ? this.wardList[0].id : [];
    } else {
      this.wardList = [];
    }
  }

  /**
   * choose township [Address]
   * @param id 
   */
  chooseTownship(id: number | string) {
    this.township_id = id;
    
    const filterWards = this.townshipList.filter(value => value.id === id);
    this.wardList = filterWards.length > 0 ? filterWards[0].township_wards : [];

    if(this.wardList.length > 0) {
      this.ward_id = this.wardList.length > 0 ? this.wardList[0].id : [];
    } else {
      this.wardList = [];
    }
  }

  /**
   * Choose ward [Address]
   * @param id 
   */
  chooseWard(id: number | string) {
    this.ward_id = id;
  }

  /**
   * Create New Employee
   * @returns 
   */
  async create() {
    if(this.name === '' || this.position === '' || this.email === '' || this.phone === undefined || this.nrc_number === '') {
      return this.utitlitiesService.openToast('All fields are required', 'REQUIRED');
    }

    const newEmployee = {

    }

    this.isLoading = true;
    await this.employeeService.create(newEmployee);
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
