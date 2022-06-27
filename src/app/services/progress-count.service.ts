import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressCountService {

  count = interval(30)

  constructor() { }
}
