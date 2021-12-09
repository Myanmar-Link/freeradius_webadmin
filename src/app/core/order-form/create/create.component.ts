import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, observable, Subscriber } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';
import { BillingZoneService } from 'src/app/services/billing-zone.service';
import { ChannelService } from 'src/app/services/channel.service';
import { CustomerGroupService } from 'src/app/services/customer-group.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { InstallTeamService } from 'src/app/services/install-team.service';
import { OrderFormService } from 'src/app/services/order-form.service';
import { ServicePlanService } from 'src/app/services/service-plan.service';
import { StatusGroupService } from 'src/app/services/status-group.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  customer_name: string= '';
  service_plan_id: number | any ;
  customer_group_id: number | any;
  floor: string = '';
  building_number: string = '';
  street: string = '';
  near_street: string = '';
  ward_id: string | number = '';
  township_id: string | number = '';
  state_id: string | number = '';
  location: string = '';
  passport: string = '';
  nrc_code: number = 1;
  nrc_region: string | undefined;
  nrc_number: string | undefined;
  isCompany: string = '1';
  checked: boolean= true;
  sale_remark: string | null = null;
  remark: string | null = null;
  sale_id:string | number = '';
  channel_id: string | number = '';
  company_id: string | number = '';
  status_id: string | number = '';
  install_team_id: string | number = '';
  billing_zone_id: string | number = '';
  passportBackImage: string | any = '';
  passportFrontImage: string | any = '';
  nrcBackImage: string | any = '';
  nrcFrontImage: string | any = '';


  servicePlanList: any[] = [];
  customerGroupList: any[] = [];
  wardList: any[] = [];
  stateList: any[] = [];
  townshipList: any[] = [];
  nrcRegionList: any[] = [];
  nrcList: any[] = [];
  salenameList: any[] = [];
  channelNameList: any[] = [];
  statusNameList: any[] = [];
  installTeamNameList: any[] = [];
  billingZoneList: any[] = [];
  isLoading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef | any;

  private async loadingData(){
    this.isLoading = true;

    this.servicePlanList = await this.servicePlanService.getAll();
    this.service_plan_id = this.servicePlanList[0].id;

    this.customerGroupList = await this.customerGroupService.getAll();
    this.customer_group_id = this.customerGroupList[0].id;

    this.stateList = await this.addressService.getAllState();
    this.townshipList = this.stateList[0].state_townships;
    this.wardList = this.townshipList[0].township_wards;

    this.state_id = this.stateList[0].id;
    this.township_id = this.townshipList[0].id;
    this.ward_id = this.wardList[0].id;

    this.salenameList = await this.employeeService.getAll();
    this.sale_id = this.salenameList[0].id;

    this.channelNameList = await this.channelService.getAll();
    this.channel_id = this.channelNameList[0].id;

    this.statusNameList = await this.statusGroupService.getAll();
    this.status_id = this.statusNameList[0].id;

    this.billingZoneList = await this.billingZoneService.getAll();
    this.billing_zone_id = await this.billingZoneList[0].id;

    this.installTeamNameList = await this.installTeamService.getAll();
    this.install_team_id = this.installTeamNameList[0].id;

    this.nrcList = this.utilitiesService.nrcList();
    this.nrcRegionList = this.nrcList.filter(value => Number(value.nrc_code) === Number(this.nrc_code));
    this.nrc_region = this.nrcRegionList[0].name_en;

    navigator.geolocation.getCurrentPosition((result: any) => {
      this.location = `${result.coords.latitude},${result.coords.longitude}`;
    });

    this.isLoading = false;
  }

  constructor(
    private servicePlanService: ServicePlanService,
    private customerGroupService: CustomerGroupService,
    private addressService: AddressService,
    private utilitiesService: UtilitiesService,
    private employeeService: EmployeeService,
    private channelService: ChannelService,
    private statusGroupService: StatusGroupService,
    private installTeamService: InstallTeamService,
    private billingZoneService: BillingZoneService,
    private orderFormService: OrderFormService
  ) { }

    converToBase64(file: File){
      const observable = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file, subscriber);
      });
      observable.subscribe((file) => {
        const file64 = file;
        return file64;
      });
      return file;
    }

    readFile(file: File ,subscriber: Subscriber<any>){
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        subscriber.next(fileReader.result);
        subscriber.complete();
      }
      fileReader.onerror = (error) =>{
        subscriber.error(error);
        subscriber.complete();
      }
    }

    selectPassportBackImage(event: any){
      let pBackImage: any = event.target.files[0];
      this.passportBackImage = this.converToBase64(pBackImage);
      console.log(this.passportBackImage);
    }

    selectPassportFrontImage(event: any){
      let pFrontImage: any = event.target.file[0];
      this.passportFrontImage = this.converToBase64(pFrontImage);
      console.log(this.passportFrontImage);
    }

    selectNrcBackImage(event: any){
      let nBackImage: any = event.target.files[0];
      this.nrcBackImage = this.converToBase64(nBackImage);
    }

    selectNrcFrontImage(event: any){
      let nFrontImage: any = event.target.file[0];
      this.nrcFrontImage = this.converToBase64(nFrontImage);
    }

    chooseCode(event: any){
      this.nrc_code = Number(event.value);
      const nrcData: any[] = this.utilitiesService.nrcList();
      
      this.nrcRegionList = nrcData.filter(value => Number(value.nrc_code) === Number(event.value));
      this.nrc_region = this.nrcRegionList[0].name_en;

    }

    chooseRegion(event: any){
      this.nrc_region = event.value;
    }

  chooseServicePlan(event: any){
    this.service_plan_id = event;
  }

  chooseCustomerGroup(event: any){
    this.customer_group_id = event;
  }

  chooseWard(id: number | string){
    this.ward_id = id;
  }

  chooseState(id: number | string) {
    this.state_id = id;

    const filterTownship = this.stateList.filter(value => value.id === id);
    this.townshipList = filterTownship.length > 0? filterTownship[0].state_townships : [];

    if(this.townshipList.length > 0){
      this.wardList = this.townshipList[0].township_wards;
      this.ward_id = this.wardList.length > 0 ? this.wardList[0].id: [];
    } else{
      this.wardList = [];
    }
  }

  chooseTownship(id: number | string){
    this.township_id = id;

    const filterWard = this.townshipList.filter(value => value.id === id);
    this.wardList = filterWard.length > 0? filterWard[0].township_wards: [];

    if(this.wardList.length > 0){
      this.ward_id = this.wardList.length > 0?this.wardList[0].id: [];
    }
    else{
      this.wardList = [];
    }
  }

  radioChangeHandler(event: any){
    this.isCompany = event.target.value;
  }

  chooseSaleName(event: any){
    this.sale_id = event.value;
  }

  changeChannelName(event: any){
    this.channel_id = event.value;
  }

  changeStatusName(event: any){
    this.status_id = event.value;
  }

  changeInstallTeam(event: any){
    this.install_team_id = event.value;
  }

  changeBillngZone(event: any){
    this.billing_zone_id = event.value;
  }

  async create(){
    if(this.customer_name === '' || this.floor === '' || this.building_number === '' , this.street === '' || this.near_street === '' || this.passport === '' ){
      this.utilitiesService.openToast('All Fields must be filled', 'REQUIRED');
    }
    const newRequest = {
      customer_name: this.customer_name,
      service_plan_id: this.service_plan_id,
      customer_group_id: this.customer_group_id,
      address: {
        floor: this.floor,
      building_number: this.building_number,
      street: this.street,
      near_street: this.near_street,
      ward_id: this.ward_id,
      state_id: this.state_id,
      township_id: this.township_id,
      location: this.location,
      },
      passport_img: {
        passport_back_img: this.passportBackImage,
        passport_front_img: this.passportFrontImage,
      },
      nrc_img: {
        nrc_back_img: this.nrcBackImage,
        nrc_front_img: this.nrcFrontImage,
      },
      nrc:this.nrc_code+'/'+this.nrc_region+'(N)'+this.nrc_number,
      passport: this.passport,
      is_company: this.isCompany,
      company_id: this.company_id,
      sale_name_id: this.sale_id,
      sale_remark: this.sale_remark,
      channel_id: this.channel_id,
      status_group_id: this.status_id,
      install_team_id: this.install_team_id,
      billing_zone_id: this.billing_zone_id,
      remark: this.remark
    }
    this.isLoading = true;
    await this.orderFormService.create(newRequest);
    this.customer_name = '';
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
