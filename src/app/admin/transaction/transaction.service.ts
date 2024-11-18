import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionsComponent implements OnInit {
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
