import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  //simulate Api
  getChartData(): Observable<any> {
    return of([
      { data: [65, 59, 80, 81, 56, 55], label: 'Users', fill: true },
    ]).pipe(delay(10000));
  }
}
