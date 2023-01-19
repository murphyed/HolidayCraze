import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { HolidaySetsService } from '../../shared/services/holiday-sets.service';
import { DbService } from 'src/app/shared/services/db.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('country') country: ElementRef;
  @ViewChild('holidayName') holidayName: ElementRef;
  @ViewChild('holidayDate') holidayDate: ElementRef;
  @ViewChild('memory') memory: ElementRef;
  @ViewChild('view') view: ElementRef;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('memoryContainer') memoryContainer: ElementRef;

  constructor(
    private http: HttpClient,
    private holidaySetsService: HolidaySetsService,
    private dbService: DbService
  ) {}
  currentYear = new Date().getFullYear;

  holidaysArray = [];
  hover = false;
  modalStatus = false;
  added = false;
  isInputEmpty = true;
  newMemory: FormGroup;
  pMemories = false;
  addCount: number;

  memoryObject = {
    holidayName: null,
    holidayDate: null,
    country: null,
    peopleCount: null,
    memory: null,
    id: null,
  };

  changeView() {
    this.pMemories = !this.pMemories;
  }

  ngOnInit(): void {
    this.dbService.retrieveMemories();
    this.dbService.retrieveCount();
    this.dbService.count.subscribe((value) => (this.addCount = value));

    this.holidaySetsService.holidaySetsArray.subscribe(
      (value) => (this.holidaysArray = value)
    );

    this.holidaySetsService.addCount.subscribe(
      (value) => (this.addCount = value)
    );

    this.newMemory = new FormGroup({
      holidayName: new FormControl(null),
      holidayDate: new FormControl(null),
      country: new FormControl(null),
      memory: new FormControl(null),
      id: new FormControl(null),
    });
    this.fetchData('NO');
  }

  ngAfterViewInit(): void {
    // this.updateCountry(code);
  }

  modalState(i) {
    this.modalStatus = true;
    this.updateView(i);
  }

  fetchData(code: string) {
    this.http
      .get(`https://date.nager.at/api/v3/publicholidays/2022/${code}`)
      .subscribe((res) => {
        this.savedData(res);
      });
    this.updateCountry(code);
  }

  updateCountry(code: string) {
    const countryCode = code;
    switch (countryCode) {
      case 'NO':
        this.newMemory.patchValue({ country: 'Norway' });
        break;
      case 'US':
        this.newMemory.patchValue({ country: 'United States' });
        break;
      case 'GR':
        this.newMemory.patchValue({ country: 'Greece' });
        break;
      case 'JP':
        this.newMemory.patchValue({ country: 'Japan' });
        break;
      case 'RU':
        this.newMemory.patchValue({ country: 'Russia' });
        break;
      case 'EG':
        this.newMemory.patchValue({ country: 'Egypt' });
        break;
    }
  }

  savedData(holidaySet) {
    this.holidaySetsService.holidaySetsArray.next(holidaySet);
  }

  updateView(i) {
    let index = setTimeout(() => {
      this.holidayName.nativeElement.innerText =
        this.holidaysArray[i].localName;
      this.newMemory.patchValue({
        holidayName: this.holidaysArray[i].localName,
        holidayDate: this.holidaysArray[i].date,
        id: this.addCount,
      });
    }, 50);
  }

  changeState() {
    this.hover = !this.hover;
  }

  getId(id: number) {
    const element = document.getElementById(`${id}`);
    if (this.hover === true) {
      element.innerText = this.holidaysArray[id].name;
    } else {
      element.innerText = this.holidaysArray[id].localName;
    }
  }

  add() {
    this.added = true;
    this.dbService.memoriesArray.next(
      this.dbService.memoriesArray.getValue().concat([this.newMemory.value])
    );
    const countryActive = this.newMemory.value.country;
    this.dbService.saveMemory(this.newMemory.value);
    this.newMemory.reset();
    this.dbService.count.next(this.dbService.count.getValue() + 1);
    this.dbService.saveCount();
    this.newMemory.patchValue({ country: countryActive });

    setTimeout(() => {
      this.view.nativeElement.style.opacity = '1';
      setTimeout(() => {
        this.view.nativeElement.style.opacity = '0';
        setTimeout(() => {
          this.memoryContainer.nativeElement.style.opacity = '0';
          setTimeout(() => {
            this.modalStatus = false;
            this.added = false;
          }, 550);
        }, 250);
      }, 1000);
    }, 500);
  }

  checkInput() {
    if (this.memory.nativeElement.value !== '') {
      this.isInputEmpty = false;
    }
  }
}
