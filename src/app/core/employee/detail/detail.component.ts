import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: string | number = '';
  employee: any;

  nrcList: any[] = [];
  nrcRegionList: any[] = [];
  departmentList: any[] = [];
  stateList: any[] = [];
  townshipList: any[] = [];
  wardList: any[] = [];

  isLoading: boolean = false;
  editEmployeeInfo: boolean = false;
  editEmployeeAddress: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private utitlitiesService: UtilitiesService,
    private departmentService: DepartmentService,
    private addressService: AddressService,
  ) { 
    this.activeRoute.params.subscribe((result: any) => {
      this.id = result.id;
    })
  }

  private async loadingData() {
    this.isLoading = true;
    this.employee = await this.employeeService.getById(this.id);
    this.employee.address = {
      floor: this.employee.employee_address.floor,
      building_number: this.employee.employee_address.building_number,
      street: this.employee.employee_address.street,
      near_street: this.employee.employee_address.near_street,
      ward_id: this.employee.employee_address.ward_id,
      state_id: this.employee.employee_address.state_id,
      township_id: this.employee.employee_address.township_id,
      location: this.employee.employee_address.location
    }

    this.departmentList = await this.departmentService.getAll();
    this.stateList = await this.addressService.getAllState();

    this.chooseState(this.employee.address.state_id);
    this.chooseTownship(this.employee.address.township_id);
    this.chooseWard(this.employee.address.ward_id);

    this.nrcList = this.utitlitiesService.nrcList();
    this.nrcRegionList = this.nrcList.filter(value => Number(value.nrc_code) === Number(this.employee.nrc_code));

    this.isLoading = false;
  }

  /**
  * NRC Code
  * @param $event 
  */
  chooseCode(id: number | string) {
    this.employee.nrc_code = Number(id);
    const nrcData: any[] = this.utitlitiesService.nrcList();
      
    this.nrcRegionList = nrcData.filter(value => Number(value.nrc_code) === Number(id));
    this.employee.nrc_region = this.nrcRegionList[0].name_en;
  }
  
  /**
    * NRC Region
    * @param $event 
    */
  chooseRegion(id: number | string) {
    this.employee.nrc_region = id;
  }

  /**
   * Choose Department
   * @param id 
   */
  chooseDepartment(id: number | string) {
    this.employee.department_id = id;
  }

  /**
   * choose state [Address]
   * @param id 
   */
  chooseState(id: number | string) {
    this.employee.address.state_id = id;

    const filterTownship = this.stateList.filter(value => value.id === id);
    this.townshipList = filterTownship.length > 0 ? filterTownship[0].state_townships : [];

    if(this.townshipList.length > 0) {
      this.wardList = this.townshipList[0].township_wards;
      this.employee.address.ward_id = this.wardList.length > 0 ? this.wardList[0].id : [];
    } else {
      this.wardList = [];
    }
  }

  /**
   * choose township [Address]
   * @param id 
   */
    chooseTownship(id: number | string) {
      this.employee.address.township_id = id;
      
      const filterWards = this.townshipList.filter(value => value.id === id);
      this.wardList = filterWards.length > 0 ? filterWards[0].township_wards : [];

      if(this.wardList.length > 0) {
        this.employee.address.ward_id = this.wardList.length > 0 ? this.wardList[0].id : [];
      } else {
        this.wardList = [];
      }
    }

  /**
   * Choose ward [Address]
   * @param id 
   */
  chooseWard(id: number | string) {
    this.employee.address.ward_id = id;
  }

  /**
   * Open Edit Form
   * @returns
   */
  openEditForm(type: string) {

    if(type === 'info') {
      this.editEmployeeInfo = !this.editEmployeeInfo;

      const splitNRC = this.employee.nrc.split('/');
  
      this.chooseCode(Number(splitNRC[0]));
      this.employee.nrc_region = splitNRC[1].split('(N)')[0];
      this.employee.nrc_number = splitNRC[1].split('(N)')[1];
      return;
    }

    if(type === 'address') {
      this.editEmployeeAddress = !this.editEmployeeAddress;
      return;
    }

  }

  /**
   * Save Employee Info
   * @returns
   */
  async saveEmployeeInfo() {
    this.isLoading = true;

    this.employee.nrc = `${this.employee.nrc_code}/${this.employee.nrc_region}(N)${this.employee.nrc_number}`;

    await this.employeeService.update(this.employee.id, this.employee);
    this.loadingData();
    this.editEmployeeInfo = false;
  }

  /**
   * Update Employee Address
   * @returns 
   */
  async saveEmployeeAddress() {
    this.isLoading = true;

    await this.employeeService.update(this.employee.id, this.employee);
    this.loadingData();
    this.editEmployeeAddress = false;
    return;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
