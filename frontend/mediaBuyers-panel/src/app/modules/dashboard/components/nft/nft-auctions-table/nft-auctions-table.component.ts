import { Component, OnInit } from '@angular/core';
import { Nft } from '../../../models/nft';
import { NftAuctionsTableItemComponent } from '../nft-auctions-table-item/nft-auctions-table-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import moment from 'moment';

@Component({
  selector: '[nft-auctions-table]',
  templateUrl: './nft-auctions-table.component.html',
  standalone: true,
  imports: [NgFor, NftAuctionsTableItemComponent, CommonModule],
  styles: [
    `
      .status-icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 8px;
      }

      .status-icon.active {
        background-color: green;
      }

      .status-icon.disabled {
        background-color: red;
      }

      .status-icon.unsettled {
        background-color: orange;
      }

      .status-icon.pending-review {
        background-color: yellow;
      }

      .status-icon.in-grace-period {
        background-color: blue;
      }

      .status-icon.pending-closure {
        background-color: red;
      }

      .status-icon.closed {
        background-color: gray;
      }
    `,
  ],
})
export class NftAuctionsTableComponent implements OnInit {
  public activeAuction: Nft[] = [];
  adAccountsWithSpendData: {
    adAccountName: string;
    adAccountId: string;
    spend: number;
    adAccountStatus: number;
  }[] = [];
  adAccounts: any = [];
  companyId: any = localStorage.getItem('companyId');
  lastUpdated: Date | null = null;

accountWithSpend: {
  adAccountName: string;
  adAccountId: string;
  spend: number;
  adAccountStatus: number;
}[] = [];

  constructor(private svc: DashboardService) {
    this.activeAuction = [
      {
        id: 1346771,
        title: 'Cripto Cities',
        creator: 'Jenny Wilson',
        image:
          'https://lh3.googleusercontent.com/t_S1sM__cKCFbuhbwQ5JHKNRRggKuPH2O3FM_-1yOxJLRzz9VRMAPaVBibgrumZG3qsB1YxEuwvB7r9rl-F-gI6Km9NlfWhecfPS=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 43m 52s',
        last_bid: 22.0,
        price: 35330.9,
        instant_price: 22.0,
      },
      {
        id: 1346772,
        title: 'Lady Ape Club',
        creator: 'Jenny Wilson',
        image:
          'https://lh3.googleusercontent.com/k95IQpeYutx-lYXwgTZw0kXZl9GAkIOc4Yz3Dr06rndWphZ25kSWyF64aTqT3W4cOxz0eB5LfAss5i9WAR-ZPWVaifijsABLqzEYwHY=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '2h 00m 02s',
        last_bid: 2.8,
        price: 4812.72,
        instant_price: 2.9,
      },
      {
        id: 1346780,
        title: 'The King - Gordon Ryan',
        creator: 'Jenny Wilson',
        image:
          'https://lh3.googleusercontent.com/iYNxP1eXG3C6ujTY4REQ9rBea19Z46oKtKkaDS1XA-ED5iFhFmPrvQPzwx8ZwACydCS2wbZ7K1P89XIED3s8JRcT6Pn0M1-sMifeyQ=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 05m 00s',
        last_bid: 1.0,
        price: 1602.77,
        instant_price: 2.9,
      },
      {
        id: 1346792,
        title: 'Only by Shvembldr',
        creator: 'Jenny Wilson',
        image:
          'https://lh3.googleusercontent.com/ujFwzDIXN64mJAHZwZ0OgNupowe5jlJPmV8OIrgSDjUAeb3SZRuhsuyPKAw6S2TkUknZvErVVKbzD-rEcs-augb6_LzUE5NVtPxj_w=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 05m 00s',
        last_bid: 2.0,
        price: 1438.17,
        instant_price: 2.1,
      },
      {
        id: 1346792,
        title: 'Crypto Coven',
        creator: 'Jenny Wilson',
        image:
          'https://lh3.googleusercontent.com/pwjA4CWS9nto8fCis6JzlWwzQgtHUvLlUWcd501LsGQoVUPL5euwhir-2fjPmsJLJ_ovJ7flH_OgDEaALeZrhSXv8Puq85-lZYWuqto=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 05m 00s',
        last_bid: 0.8,
        price: 1278.38,
        instant_price: 0.35,
      },
    ];
  }

  ngOnInit(): void {
    this.accountWithSpend = JSON.parse(localStorage.getItem('accountWithSpend') || '[]');

    const storedLastUpdated = localStorage.getItem('lastUpdated');
    if (storedLastUpdated) {
      this.lastUpdated = new Date(storedLastUpdated);
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1:
        return 'active';
      case 2:
        return 'disabled';
      case 3:
        return 'unsettled';
      case 7:
        return 'pending-review';
      case 8:
        return 'in-grace-period';
      case 9:
        return 'pending-closure';
      case 101:
        return 'closed';
      default:
        return '';
    }
  }

  // DASHBOARD APIS

  // Adaccount with spend

  updateAdAccountsWithSpend(date: number) {
    // this.getInsightsByAdAccount();
  }

  isWithinRateLimit(lastUpdated: Date): boolean {
    const now = new Date();
    const timeDiff = now.getTime() - lastUpdated.getTime(); // Difference in milliseconds
    const rateLimitWindow = 5 * 60 * 1000; // 5 minutes in milliseconds
    return timeDiff < rateLimitWindow;
  }


  getRelativeTime(): string {
    if (this.lastUpdated) {
      return moment(this.lastUpdated).fromNow(); // e.g., "2 minutes ago"
    }
    return 'Not updated yet';
  }

  getInsightsByAdAccount(timeRange: { since: string; until: string }) {
    // let timeRange = {
    //   since: '2024-12-01',
    //   until: '2024-12-31',
    // };

    // Fetch data only if necessary
    if (this.lastUpdated && this.isWithinRateLimit(this.lastUpdated)) {
      console.log('Data is already up-to-date. Last fetched at:', this.lastUpdated);
      return;
    }

    this.svc.getAdAccountWithSpend(this.companyId, timeRange).subscribe({
      next: (response: any) => {

        this.adAccountsWithSpendData = response;
        // Filter accounts with spend not equal to 0
        this.accountWithSpend = this.adAccountsWithSpendData.filter(account => account.spend != 0);

        console.log("accountWithSpend", this.accountWithSpend)
        localStorage.setItem('accountWithSpend', JSON.stringify(this.accountWithSpend));

        console.log('adAccountWithSpend retrieved successfully', response);
        this.lastUpdated = new Date();

        console.log('Last Updated:', this.lastUpdated);
        localStorage.setItem('lastUpdated', this.lastUpdated.toISOString());

        // this.handleRequestSuccess(response);
      },
      error: (error: any) => {
        console.error('Error', error);
        // this.handleRequestError(error);
      },
      complete: () => {},
    });
  }

  setTimeRange(range: string) {
    let timeRange = { since: '', until: '' };

    switch (range) {
      case 'thisMonth':
        timeRange.since = moment().startOf('month').format('YYYY-MM-DD');
        // timeRange.until = moment().endOf('month').format('YYYY-MM-DD');
        timeRange.until = moment().format('YYYY-MM-DD'); // Today's date
        break;
      case 'lastMonth':
        timeRange.since = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        timeRange.until = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
        break;
      case 'lastYear':
        timeRange.since = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
        timeRange.until = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
        break;
    }
    console.log('time range', timeRange);
    this.getInsightsByAdAccount(timeRange)
  }
}
