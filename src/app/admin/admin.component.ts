// src/app/admin/admin.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Import RouterOutlet for routing
import { FooterComponent } from './footer/footer.component'; // Import FooterComponent
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-root',
  template: `
    <!-- Footer will always be displayed at the bottom -->
  `,
  standalone: true,
  imports: [RouterOutlet, FooterComponent, RouterModule], // Include necessary modules and components
})
export class AdminComponent {}
