import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DbService } from 'src/app/shared/services/db.service';
import { HolidaySetsService } from '../../shared/services/holiday-sets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('label1') label1: ElementRef;
  @ViewChild('label2') label2: ElementRef;
  @ViewChild('country1') country1: ElementRef;
  @ViewChild('country2') country2: ElementRef;

  constructor(
    private holidayService: HolidaySetsService,
    private dbService: DbService,
    private http: HttpClient
  ) {}

  viewCountry1 = false;
  viewCountry2 = false;
  memoryBoxStatus: string;

  currentYear = new Date().getFullYear();
  memoryCount = 0;
  memoriesVd: number;
  memoriesToV: number;

  memoriesToView = [];
  memoriesViewed = [];

  ngOnInit(): void {
    this.dbService.retrieveMemories();
    this.dbService.retrieveViewedMemories();
    this.holidayService.memoryboxStatus.subscribe(
      (value) => (this.memoryBoxStatus = value)
    );
    this.dbService.memoriesArray.subscribe(
      (value) => (this.memoriesToView = value)
    );
    this.dbService.memoriesArray.subscribe(
      (value) => (this.memoriesToV = value.length)
    );
    this.dbService.viewedMemoriesArray.subscribe(
      (value) => (this.memoriesViewed = value)
    );
    this.dbService.viewedMemoriesArray.subscribe(
      (value) => (this.memoriesVd = value.length)
    );

    this.countrySort();
    if (this.memoriesToView.length !== 0) {
      this.sortMTV();
    }
    if (this.memoriesViewed.length !== 0) {
      this.sortMV();
    }
    if (this.memoriesToView.length === 0) {
      this.mtv = ['Add memories!'];
    }
    if (this.memoriesViewed.length === 0) {
      this.mv = ['View memories!'];
    }
  }
  ngAfterViewInit() {
    this.label1.nativeElement.style.opacity = '1';
    this.label2.nativeElement.style.opacity = '1';
  }
  countryState1() {
    this.viewCountry1 = !this.viewCountry1;
    setTimeout(() => {
      if (this.viewCountry1 === true) {
        this.country1.nativeElement.style.opacity = '1';
      }
      if (this.viewCountry1 === false) {
        this.label1.nativeElement.style.opacity = '1';
      }
    }, 50);
  }
  countryState2() {
    this.viewCountry2 = !this.viewCountry2;
    setTimeout(() => {
      if (this.viewCountry2 === true) {
        this.country2.nativeElement.style.opacity = '1';
      }
      if (this.viewCountry2 === false) {
        this.label2.nativeElement.style.opacity = '1';
      }
    }, 50);
  }

  mCountToDate: number;
  mCountToYear: number;

  countriesMTV = {
    US: [],
    NO: [],
    JP: [],
    GR: [],
    RU: [],
    EG: [],
  };

  countriesMV = {
    US: [],
    NO: [],
    JP: [],
    GR: [],
    RU: [],
    EG: [],
  };
  mv = [];
  mtv = [];

  countrySort() {
    if (this.memoriesToView.length !== 0) {
      for (let i = 0; i < this.memoriesToView.length; i++) {
        if (this.memoriesToView[i].country === 'United States') {
          this.countriesMTV.US.push('USmemory');
        }
        if (this.memoriesToView[i].country === 'Norway') {
          this.countriesMTV.NO.push('NOmemory');
        }
        if (this.memoriesToView[i].country === 'Japan') {
          this.countriesMTV.JP.push('JPmemory');
        }
        if (this.memoriesToView[i].country === 'Greece') {
          this.countriesMTV.GR.push('GRmemory');
        }
        if (this.memoriesToView[i].country === 'Russia') {
          this.countriesMTV.RU.push('RUmemory');
        }
        if (this.memoriesToView[i].country === 'Egypt') {
          this.countriesMTV.EG.push('EGmemory');
        }
      }
    }

    if (this.memoriesViewed.length !== 0) {
      for (let i = 0; i < this.memoriesViewed.length; i++) {
        if (this.memoriesViewed[i].country === 'United States') {
          this.countriesMV.US.push('USmemory');
        }
        if (this.memoriesViewed[i].country === 'Norway') {
          this.countriesMV.NO.push('NOmemory');
        }
        if (this.memoriesViewed[i].country === 'Japan') {
          this.countriesMV.JP.push('JPmemory');
        }
        if (this.memoriesViewed[i].country === 'Greece') {
          this.countriesMV.GR.push('GRmemory');
        }
        if (this.memoriesViewed[i].country === 'Russia') {
          this.countriesMV.RU.push('RUmemory');
        }
        if (this.memoriesViewed[i].country === 'Egypt') {
          this.countriesMV.EG.push('EGmemory');
        }
      }
    }
  }
  sortMTV() {
    let objectKeyLengthArrayMTV = [];
    const objectLengthMTV = Object.keys(this.countriesMTV).length;
    const objectKeysMTV = Object.keys(this.countriesMTV);

    for (let i = 0; i < objectLengthMTV; i++) {
      let country = Object.keys(this.countriesMTV)[i];
      let countryLength = this.countriesMTV[country].length;
      objectKeyLengthArrayMTV.push(countryLength);
    }
    const countryWinnerLengthMTV = Math.max(...objectKeyLengthArrayMTV);

    const multipleWinnersMTV = [];

    for (let i = 0; i < objectLengthMTV; i++) {
      let value = objectKeyLengthArrayMTV[i];
      if (value === countryWinnerLengthMTV) {
        if (objectKeysMTV[i] === 'US') {
          multipleWinnersMTV.push('United States');
        }
        if (objectKeysMTV[i] === 'NO') {
          multipleWinnersMTV.push('Norway');
        }
        if (objectKeysMTV[i] === 'JP') {
          multipleWinnersMTV.push('Japan');
        }
        if (objectKeysMTV[i] === 'GR') {
          multipleWinnersMTV.push('Greece');
        }
        if (objectKeysMTV[i] === 'RU') {
          multipleWinnersMTV.push('Russia');
        }
        if (objectKeysMTV[i] === 'EG') {
          multipleWinnersMTV.push('Egypt');
        }
      }
    }
    if (multipleWinnersMTV.length > 1) {
      this.mtv = ['Tied'];
    }
    if (multipleWinnersMTV.length === 1) {
      this.mtv = multipleWinnersMTV;
    }
  }

  sortMV() {
    let objectKeyLengthArrayMV = [];
    const objectLengthMV = Object.keys(this.countriesMV).length;
    const objectKeysMV = Object.keys(this.countriesMV);

    console.log(Object.keys(this.countriesMV)[0]);
    for (let i = 0; i < objectLengthMV; i++) {
      let country = Object.keys(this.countriesMV)[i];
      let countryLength = this.countriesMV[country].length;
      objectKeyLengthArrayMV.push(countryLength);
    }
    const countryWinnerLengthMV = Math.max(...objectKeyLengthArrayMV);

    const multipleWinnersMV = [];

    for (let i = 0; i < objectLengthMV; i++) {
      let value = objectKeyLengthArrayMV[i];
      if (value === countryWinnerLengthMV) {
        if (objectKeysMV[i] === 'US') {
          multipleWinnersMV.push('United States');
        }
        if (objectKeysMV[i] === 'NO') {
          multipleWinnersMV.push('Norway');
        }
        if (objectKeysMV[i] === 'JP') {
          multipleWinnersMV.push('Japan');
        }
        if (objectKeysMV[i] === 'GR') {
          multipleWinnersMV.push('Greece');
        }
        if (objectKeysMV[i] === 'RU') {
          multipleWinnersMV.push('Russia');
        }
        if (objectKeysMV[i] === 'EG') {
          multipleWinnersMV.push('Egypt');
        }
      }
    }
    if (multipleWinnersMV.length > 1) {
      this.mv = ['Tied'];
    }
    if (multipleWinnersMV.length === 1) {
      this.mv = multipleWinnersMV;
    }
  }
}
