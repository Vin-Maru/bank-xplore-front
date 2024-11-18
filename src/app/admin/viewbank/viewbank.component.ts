import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../services/user.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewbank',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './viewbank.component.html',
  styleUrl: './viewbank.component.css'
})

export class ViewBanksComponent implements OnInit {
  banks: any[] = [];

  constructor(private http: HttpClient,  private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object ) {}

  ngOnInit() {
    this.getBanks();
  }

  getBanks(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.getBanks().subscribe(
        (response)=> {
        this.banks = response;
      },
      (error) => {
        console.error('Error fetching banks:', error);
      }
    );
  }
}
}