import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownshipComponent } from './township.component';

describe('TownshipComponent', () => {
  let component: TownshipComponent;
  let fixture: ComponentFixture<TownshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownshipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
