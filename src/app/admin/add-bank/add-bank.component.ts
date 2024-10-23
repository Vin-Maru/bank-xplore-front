import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-bank',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-bank.component.html',
})
export class AddBankComponent {
  addBankForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addBankForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.addBankForm.valid) {
      const bankDetails = this.addBankForm.value;
      console.log('Bank added successfully:', bankDetails);
      // Implement logic to handle the bank addition (e.g., API call)
    }
  }
}
