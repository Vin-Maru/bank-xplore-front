import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface declarations
interface Transaction {
  transaction_id: string;
  transactionType: string;
  sender_phone_no: string;
  sender_id: string;
  sender_bank_code: string;
  receiver_phone_no: string;
  receiver_id: string;
  receiver_bank_code: string;
  amount: number;
  currency: string;
  reference_note: string;
  transaction_fee: number;
}

interface TransactionResponse {
  content: Transaction[];
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  errorMessage: string = '';
  searchTerm: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.bankTransactions().subscribe(
        (response: TransactionResponse) => {
          if (response && Array.isArray(response.content)) {
            this.transactions = response.content;
            this.filteredTransactions = [...this.transactions]; // Initialize filtered transactions
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        (error) => {
          console.error('Error fetching transactions:', error);
          this.errorMessage = 'Could not fetch transactions. Please try again.';
        }
      );
    }
  }

  searchTransaction(): void {
    if (!this.searchTerm) {
      // Reset to all transactions if search term is empty
      this.filteredTransactions = [...this.transactions];
    } else {
      // Filter transactions by transaction ID
      this.filteredTransactions = this.transactions.filter((transaction) =>
        transaction.transaction_id
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
