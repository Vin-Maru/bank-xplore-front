import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ CommonModule, RouterModule], // Add CommonModule to imports
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
