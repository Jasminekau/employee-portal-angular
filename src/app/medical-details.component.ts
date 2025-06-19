import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './users.service';
import { CommonService } from './common';

@Component({
  selector: 'app-medical-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './medical-details.component.html',
  styleUrls: ['./medical-details.component.css']
})
export class MedicalDetailsComponent implements OnInit {
  medicalForm: FormGroup;
  medicalDetails: any[] = [];
  totalDependents: number = 0;
  editMode: boolean = false;
  editId: number | null = null;

  private usersService = inject(UsersService);
  private commonService = inject(CommonService);
  private fb = inject(FormBuilder);

  constructor() {
    this.medicalForm = this.fb.group({
      policyName: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      claimedAmount: [0, [Validators.required, Validators.min(0)]],
      numberOfDependents: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadMedicalDetails();
  }

  loadMedicalDetails() {
    this.commonService.getMedicalDetails().subscribe((data: any[]) => {
      this.medicalDetails = data;
      this.calculateTotalDependents();
    });
  }

  calculatePolicyMaxAmount(salary: number): number {
    if (salary <= 500000) {
      return 1000000;
    } else {
      return salary * 2.5;
    }
  }

  calculateBalanceLeft(policyMaxAmount: number, claimedAmount: number): number {
    return policyMaxAmount - claimedAmount;
  }

  calculateTotalDependents() {
    this.totalDependents = this.medicalDetails.reduce((acc, item) => acc + item.numberOfDependents, 0);
  }

  openAddModal() {
    this.editMode = false;
    this.editId = null;
    this.medicalForm.reset();
  }

  openEditModal(item: any) {
    this.editMode = true;
    this.editId = item.id;
    this.medicalForm.patchValue({
      policyName: item.policyName,
      salary: item.salary,
      claimedAmount: item.claimedAmount,
      numberOfDependents: item.numberOfDependents,
    });
  }

  submitForm() {
    if (this.medicalForm.invalid) {
      return;
    }
    const formValue = this.medicalForm.value;
    const policyMaxAmount = this.calculatePolicyMaxAmount(formValue.salary);
    const balanceLeft = this.calculateBalanceLeft(policyMaxAmount, formValue.claimedAmount);

    const payload = {
      ...formValue,
      policyMaxAmount,
      balanceLeft,
    };

    if (this.editMode && this.editId !== null) {
      // Update existing
      this.commonService.updateMedicalDetail(this.editId, payload).subscribe(() => {
        this.loadMedicalDetails();
        this.medicalForm.reset();
        this.editMode = false;
        this.editId = null;
      });
    } else {
      // Add new
      this.commonService.addMedicalDetail(payload).subscribe(() => {
        this.loadMedicalDetails();
        this.medicalForm.reset();
      });
    }
  }

  deleteMedicalDetail(id: number) {
    this.commonService.deleteMedicalDetail(id).subscribe(() => {
      this.loadMedicalDetails();
    });
  }
}
