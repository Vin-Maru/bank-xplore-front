import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';
import { adminRoutes } from './admin/admin.routes';
import { clientRoutes } from './client/client.routes';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';



@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  constructor(private router: Router) {
    const routes: Routes = [
      { path: 'admin', component: AdminComponent, children: adminRoutes },
      { path: 'client', component: ClientComponent, children: clientRoutes },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      // Add other routes here
    ];
    
    this.router.resetConfig(routes); // Reset and configure the router
  }
}
