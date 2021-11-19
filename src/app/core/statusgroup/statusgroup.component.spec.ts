import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusgroupComponent } from './statusgroup.component';

describe('StatusgroupComponent', () => {
  let component: StatusgroupComponent;
  let fixture: ComponentFixture<StatusgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
