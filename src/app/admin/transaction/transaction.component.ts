import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.userService.bankTransaction().subscribe({
      next: (data) => {
        console.log('Transactions:', data);
        this.transactions = data;
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
        this.errorMessage = 'Could not fetch transactions. Please try again.';
      },
    });
  }
}
