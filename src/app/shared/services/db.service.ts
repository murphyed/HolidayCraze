import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private http: HttpClient) {}

  memoriesArray = new BehaviorSubject<Object[]>([]);
  currentMemoriesArray = this.memoriesArray.asObservable();
  viewedMemoriesArray = new BehaviorSubject<Object[]>([]);
  count = new BehaviorSubject<any>(0);

  saveMemory(object) {
    this.http
      .post(
        `https://holiday-craze-780c4-default-rtdb.firebaseio.com/${JSON.stringify(
          localStorage.getItem('userUID')
        )}/memories.json`,
        object
      )
      .subscribe();
  }
  saveCount() {
    this.http
      .put(
        `https://holiday-craze-780c4-default-rtdb.firebaseio.com/${JSON.stringify(
          localStorage.getItem('userUID')
        )}/addCount.json`,
        this.count.getValue()
      )
      .subscribe();
  }
  saveViewedMemory(object) {
    this.http
      .post(
        `https://holiday-craze-780c4-default-rtdb.firebaseio.com/${JSON.stringify(
          localStorage.getItem('userUID')
        )}/viewedMemories.json`,
        object
      )
      .subscribe();
  }

  retrieveMemories() {
    return this.http
      .get(
        `https://holiday-craze-780c4-default-rtdb.firebaseio.com/${JSON.stringify(
          localStorage.getItem('userUID')
        )}/memories.json`,
        {}
      )
      .subscribe((res) => {
        if (res === null) {
          return;
        } else {
          console.log(Object.values(res));
          this.memoriesArray.next(Object.values(res));
          console.log(this.memoriesArray.getValue());
        }
      });
  }
  retrieveCount() {
    return this.http
      .get(
        `https://holiday-craze-780c4-default-rtdb.firebaseio.com/${JSON.stringify(
          localStorage.getItem('userUID')
        )}/addCount.json`,
        {}
      )
      .subscribe((res) => {
        if (res === null) {
          return;
        }
        this.count.next(res);
      });
  }
  async retrieveViewedMemories() {
    return this.http
      .get(
        `https://holiday-craze-780c4-default-rtdb.firebaseio.com/${JSON.stringify(
          localStorage.getItem('userUID')
        )}/viewedMemories.json`,
        {}
      )
      .subscribe((res) => {
        if (res === null) {
          return;
        }
        this.viewedMemoriesArray.next(Object.values(res));
      });
  }

  updateMemory(i) {
    this.http
      .get(
        `https://holiday-craze-780c4-default-rtdb.firebaseio.com/${JSON.stringify(
          localStorage.getItem('userUID')
        )}/memories.json`,
        {}
      )
      .subscribe((res) => {
        const memories = Object.keys(res);
        const memoryValues = Object.values(res);
        const key = memories[i];
        const value = memoryValues[i];
        console.log('value', value);
        console.log('key', key);
        this.http
          .post(
            `https://holiday-craze-780c4-default-rtdb.firebaseio.com/${JSON.stringify(
              localStorage.getItem('userUID')
            )}/viewedMemories.json`,
            value
          )
          .subscribe();
        this.http
          .delete(
            `https://holiday-craze-780c4-default-rtdb.firebaseio.com/${JSON.stringify(
              localStorage.getItem('userUID')
            )}/memories/${key}.json`
          )
          .subscribe();
      });
  }
}
