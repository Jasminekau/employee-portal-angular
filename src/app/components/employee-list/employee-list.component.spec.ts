import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../../services/employee.service';
import { of } from 'rxjs';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let mockEmployeeService: any;

  beforeEach(async () => {
    mockEmployeeService = {
      getEmployees: jasmine.createSpy('getEmployees').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [ EmployeeListComponent ],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employees on init', () => {
    component.ngOnInit();
    expect(mockEmployeeService.getEmployees).toHaveBeenCalled();
  });
});
