import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Api } from '../../services/APIS/api';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Chart,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  LineController,
  PointElement, // Import PointElement for data points
  ChartConfiguration,
  ChartData,
  ChartType,
} from 'chart.js';

// Register necessary Chart.js components, including PointElement for points on line chart
Chart.register(
  CategoryScale, // For 'category' axis
  LinearScale, // For 'linear' axis
  Tooltip, // For tooltips
  Legend, // For legend
  LineElement, // For line chart elements (line, point)
  LineController, // For line chart controller
  PointElement // For point elements (used for data points on the line chart)
);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit, AfterViewInit {
  public chartType: ChartType = 'line'; // Use 'line' chart type
  public chart: Chart | undefined;
  private api = inject(Api);
  chartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  @ViewChild('myChart') chartCanvas!: ElementRef;
  platformId = inject(PLATFORM_ID);

  // Sample data
  dataSets: any[] = [
    { data: [65, 59, 80, 81, 56, 55], label: 'Users', fill: true },
  ];

  stats: WritableSignal<{ label: string; value: string | number }[]> = signal([
    { label: 'Users Online', value: 120 },
    { label: 'Sales Today', value: '$530' },
    { label: 'Bounce Rate', value: '45%' },
  ]);

  ngOnInit(): void {
    this.api.getChartData().subscribe({
      next: (res) => {
        // this.dataSets = res;
      },
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (this.chartCanvas) {
          const canvas = this.chartCanvas.nativeElement;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const data: ChartData = {
              labels: this.chartLabels,
              datasets: this.dataSets,
            };

            const config: ChartConfiguration = {
              type: this.chartType,
              data: data,
              options: {
                responsive: true,
                scales: {
                  x: {
                    type: 'category',
                    min: 0,
                    title: {
                      display: true,
                      text: 'Months',
                    },
                  },
                  y: {
                    type: 'linear',
                    min: 0,
                    title: {
                      display: true,
                      text: 'Values',
                    },
                  },
                },
                plugins: {
                  tooltip: {
                    enabled: true,
                  },
                  legend: {
                    display: true,
                  },
                },
              },
            };

            this.chart = new Chart(ctx, config);
          } else {
            console.error('Failed to get canvas context');
          }
        }
      }, 0);
    }
  }
}
