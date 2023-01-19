import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HolidaySetsService {
  holidaySetsArray = new BehaviorSubject<Object[]>([]);
  // memoriesArray = new BehaviorSubject<Object[]>([]);
  // viewedMemoriesArray = new BehaviorSubject<Object[]>([]);
  // memoryCount = new BehaviorSubject<number>(0);
  index = new BehaviorSubject<number>(null);

  timerState = new BehaviorSubject<boolean>(false);

  memoryboxStatus = new BehaviorSubject<string>('unavailable');

  addCount = new BehaviorSubject<number>(0);
  constructor() {}
}
