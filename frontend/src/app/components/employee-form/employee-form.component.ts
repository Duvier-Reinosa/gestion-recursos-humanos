import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()" class="employee-form">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" formControlName="firstName">
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" formControlName="lastName">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" formControlName="email">
      </div>
      <div>
        <label for="department">Department:</label>
        <select id="department" formControlName="department">
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>
      <button type="submit" [disabled]="!employeeForm.valid">Submit</button>
    </form>
  `,
  styles: [`
    .employee-form {
      display: flex;
      flex-direction: column;
      max-width: 400px;
      margin: 0 auto;
    }
    .employee-form div {
      margin-bottom: 15px;
    }
    .employee-form label {
      display: block;
      margin-bottom: 5px;
    }
    .employee-form input, .employee-form select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .employee-form button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .employee-form button:disabled {
      background-color: #cccccc;
    }
  `]
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      // Here you would typically send the form data to a service
    }
  }
}

