import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { ProgressCountService } from 'src/app/services/progress-count.service';

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.css'],
  host: {
    class:
      'col-xl-3 col-md-4 my-3 d-flex justify-content-center shadow p-3 border',
  },
})
export class ProgressCircleComponent implements DoCheck, OnInit {
  @Input() skillPercentage: number = 0;
  @Input() skill: string = 'skill';
  percentage = 0;
  maxLength: number = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--max-length')
  );

  constructor(
    private progressCount: ProgressCountService,
    private elementRef: ElementRef
  ) {}

  percentageProgress = this.progressCount.count.subscribe({
    next: (value) => {
      this.percentage = value;
    },
  });

  calcCirlce(max: number, percentage: number) {
    return max - (max * percentage) / 100 + 18;
  }

  ngOnInit(): void {
    const fill = this.calcCirlce(this.maxLength, this.skillPercentage);
    this.elementRef.nativeElement.style.setProperty('--fill', `${fill}`);
  }

  ngDoCheck() {
    if (this.percentage == this.skillPercentage) {
      this.percentageProgress.unsubscribe();
    }
  }
}
