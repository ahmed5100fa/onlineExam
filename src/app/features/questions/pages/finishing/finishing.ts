import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FinishQuestion } from "../../ui/components/finish-question/finish-question";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Chart, ChartConfiguration, registerables, TooltipItem } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-finishing',
  imports: [FinishQuestion, RouterLink],
  templateUrl: './finishing.html',
  styleUrl: './finishing.scss',
})
export class Finishing implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private _activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  @Input() totalcorr!: string;
  @Input() resultWron!: any;
  @Input() wrong!: number;
  @Input() correct!: number;

  @Output() restart = new EventEmitter<void>();

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  _id: string = '';
  chart: Chart | undefined;

  constructor() {}

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this._id = params['id'] || '';
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['correct'] || changes['wrong']) && this.chart) {
      this.updateChart();
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  calculatePercentage(): number {
    const total = this.correct + this.wrong;
    if (total === 0) return 0;
    return Math.round((this.correct / total) * 100);
  }

  createChart() {
    const canvas = this.chartCanvas?.nativeElement;
    if (!canvas) {
      return;
    }

    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    const data = [this.correct, this.wrong];
    const total = data.reduce((a, b) => a + b, 0);

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
          data: data,
          backgroundColor: [
            '#4CAF50', // Green for correct
            '#F44336'  // Red for incorrect
          ],
          borderColor: [
            '#388E3C',
            '#D32F2F'
          ],
          borderWidth: 2,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context: TooltipItem<'doughnut'>) => {
                const label = context.label || '';
                const value = context.parsed;
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        },
        cutout: '70%'
      }
    };

    this.chart = new Chart(canvas, config);
  }

  updateChart() {
    if (this.chart) {
      const data = [this.correct, this.wrong];
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    } else {
      this.createChart();
    }
  }

  restartQuiz() {
    this.restart.emit();
    // Destroy chart when restarting
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }
}
