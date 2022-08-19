import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { faTrash, faPenClip } from '@fortawesome/free-solid-svg-icons';
import ISkill from 'src/app/Models/skill.model';
import { ProgressCountService } from 'src/app/services/progress-count.service';

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.css'],
})
export class ProgressCircleComponent implements DoCheck, OnInit {
  faTrash = faTrash;
  faPenClip = faPenClip;
  @Input() skillPercentage: number = 0;
  @Input() skill: string = 'skill';
  @Input() item!: ISkill;
  @Input() canEdit = false;
  @Output() openModalEdit = new EventEmitter<any>();
  @Output() openModalDelete = new EventEmitter<any>();
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
    this.skillPercentage = this.item.porcentaje;
    const fill = this.calcCirlce(this.maxLength, this.skillPercentage);
    this.elementRef.nativeElement.style.setProperty('--fill', `${fill}`);
  }

  ngDoCheck() {
    if (this.percentage == this.skillPercentage) {
      this.percentageProgress.unsubscribe();
    }
  }

  callOpenModalDelete() {
    this.openModalDelete.emit();
  }
  callOpenModalEdit() {
    this.openModalEdit.emit();
  }
}
