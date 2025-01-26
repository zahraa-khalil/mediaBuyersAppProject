import { Component, effect } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import moment from 'moment';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from 'src/app/shared/models/chart-options';

@Component({
  selector: '[nft-bar-chart-card]',
  standalone: true,
  imports: [AngularSvgIconModule, NgApexchartsModule],
  templateUrl: './nft-bar-chart-card.component.html',
  styleUrl: './nft-bar-chart-card.component.scss'
})
export class NftBarChartCardComponent {
  public chartOptions: Partial<ChartOptions>;

accountWithSpend: {
  adAccountName: string;
  adAccountId: string;
  spend: number;
  adAccountStatus: number;
}[] = [];
lastUpdated: Date | null = null;

  constructor(private themeService: ThemeService) {

    this.accountWithSpend = JSON.parse(localStorage.getItem('accountWithSpend') || '[]');
    console.log(" this.accountWithSpend ",  this.accountWithSpend )

    // Separate names and spend values
const categoriesList =  this.accountWithSpend.map((account) => account.adAccountName);
const spendDataList =  this.accountWithSpend.map((account) => account.spend);

    const storedLastUpdated = localStorage.getItem('lastUpdated');
    if (storedLastUpdated) {
      this.lastUpdated = new Date(storedLastUpdated);
    }


    let baseColor = '#FFFFFF';
    const data = spendDataList
    const categories = categoriesList

    this.chartOptions = {
      series: [
        {
          name: 'Spend',
          data: data,
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: 250,
        toolbar: {
          show: true,
        },
        sparkline: {
          enabled: false,
        },
      },

      plotOptions: {
        bar: {
          borderRadius: 4,

          horizontal: true,
        }
      },


      dataLabels: {
        enabled: false,
      },
      // fill: {
      //   type: 'gradient',
      //   gradient: {
      //     shadeIntensity: 1,
      //     opacityFrom: 0.4,
      //     opacityTo: 0.2,
      //     stops: [15, 120, 100],
      //   },
      // },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [baseColor], // line color
      },
      xaxis: {
        categories: categories,
        labels: {
          show: true,
        },
        crosshairs: {
          position: 'front',
          stroke: {
            color: baseColor,
            width: 1,
            dashArray: 4,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: function (val) {
            return val + '$';
          },
        },
      },
      colors: [baseColor], //line colors
    };

    effect(() => {
      /** change chart theme */
      let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
      primaryColor = this.HSLToHex(primaryColor);
      this.chartOptions.tooltip = {
        theme: this.themeService.theme().mode,
      };
      this.chartOptions.colors = [primaryColor];
      this.chartOptions.stroke!.colors = [primaryColor];
      this.chartOptions.xaxis!.crosshairs!.stroke!.color = primaryColor;
    });
  }

  setTimeRange(range: string) {
    this.accountWithSpend = JSON.parse(localStorage.getItem('accountWithSpend') || '[]');
    console.log(" this.accountWithSpend ",  this.accountWithSpend )
  }
  private HSLToHex(color: string): string {
    const colorArray = color.split('%').join('').split(' ');
    const colorHSL = colorArray.map(Number);
    const hsl = {
      h: colorHSL[0],
      s: colorHSL[1],
      l: colorHSL[2],
    };

    const { h, s, l } = hsl;

    const hDecimal = l / 100;
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

      // Convert to Hex and prefix with "0" if required
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}


  getRelativeTime(): string {
    if (this.lastUpdated) {
      return moment(this.lastUpdated).fromNow(); // e.g., "2 minutes ago"
    }
    return 'Not updated yet';
  }

}


