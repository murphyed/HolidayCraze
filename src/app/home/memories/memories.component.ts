import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';
import { HolidaySetsService } from '../../shared/services/holiday-sets.service';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.css'],
})
export class MemoriesComponent implements OnInit {
  @ViewChild('holidayName') holidayName: ElementRef;
  @ViewChild('holidayDate') holidayDate: ElementRef;
  @ViewChild('country') country: ElementRef;
  @ViewChild('memory') memory: ElementRef;
  @ViewChild('memoryContainer') memoryContainer: ElementRef;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('timer') timer: ElementRef;
  @ViewChild('days') days: ElementRef;
  @ViewChild('hours') hours: ElementRef;
  @ViewChild('info') info: ElementRef;
  @ViewChild('mins') mins: ElementRef;
  @ViewChild('seconds') seconds: ElementRef;
  @ViewChild('hoursUp') hoursUp: ElementRef;
  @ViewChild('minsUp') minsUp: ElementRef;
  @ViewChild('secondsUp') secondsUp: ElementRef;

  memories: any[];
  numberOfMemories: number;
  modalStatus = false;
  viewTime = false;

  dayCountDown: string;
  hourCountDown: string;
  minCountDown: string;
  secondCountDown: string;

  daysCountUp: string;
  hourCountUp: string;
  minCountUp: string;
  secondCountUp: string;

  circles = [];
  hover = false;
  currentIndex: number;

  timerState: boolean;

  constructor(
    private holidayService: HolidaySetsService,
    private dbService: DbService
  ) {}

  ngOnInit(): void {
    this.dbService.retrieveMemories();
    this.dbService.memoriesArray.subscribe((value) => (this.memories = value));

    this.dbService.count.next(this.dbService.memoriesArray.getValue().length);

    this.dbService.count.subscribe((value) => (this.numberOfMemories = value));

    this.holidayService.index.subscribe((value) => (this.currentIndex = value));
    this.generateCircle();

    let currentTime = new Date().getTime();
    let currentYear = new Date().getFullYear();
    let currentMin = new Date().getMinutes();
    let currentHour = new Date().getHours();
    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate();
    let viewDate = new Date(
      `${currentMonth} ${currentDay}, ${currentYear} ${currentHour}:${currentMin}:29`
    ).getTime();
    let timeLeft = viewDate - currentTime;
    if (timeLeft < 0) {
      this.viewState();
    } else {
      this.closeState();
    }
  }

  ngAfterViewInit() {}

  memoriesTimerDown() {
    let timeFn = setInterval(() => {
      let currentTime = new Date().getTime();
      let currentYear = new Date().getFullYear();
      let currentMin = new Date().getMinutes();
      let currentHour = new Date().getHours();
      let currentMonth = new Date().getMonth() + 1;
      let currentDay = new Date().getDate();
      let viewDate = new Date(
        `${currentMonth} ${currentDay}, ${currentYear} ${currentHour}:${currentMin}:30`
      ).getTime();
      let timeLeft = viewDate - currentTime;

      let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      this.dayCountDown = days.toString();
      this.hourCountDown = hours.toString();
      this.minCountDown = mins.toString();
      this.secondCountDown = seconds.toString();
      this.days.nativeElement.style.opacity = '1';
      this.hours.nativeElement.style.opacity = '1';
      this.mins.nativeElement.style.opacity = '1';
      this.seconds.nativeElement.style.opacity = '1';
      this.info.nativeElement.style.opacity = '1';

      if (timeLeft < 0) {
        clearInterval(timeFn);
        this.viewState();
      }
    }, 1000);
  }

  memoriesTimerUp() {
    let timeFn2 = setInterval(() => {
      let currentTime = new Date().getTime();
      let currentYear = new Date().getFullYear();
      let currentMin = new Date().getMinutes();
      let currentHour = new Date().getHours();
      let currentMonth = new Date().getMonth() + 1;
      let currentDay = new Date().getDate();
      let closeDate = new Date(
        `${currentMonth} ${currentDay}, ${currentYear} ${currentHour}:${currentMin}:59`
      ).getTime();

      let timeLeft = closeDate - currentTime;
      let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      this.daysCountUp = days.toString();
      this.hourCountUp = hours.toString();
      this.minCountUp = mins.toString();
      this.secondCountUp = seconds.toString();

      if (timeLeft < 0) {
        clearInterval(timeFn2);
        this.closeState();
      }
    }, 1000);
  }

  viewState() {
    this.memoriesTimerUp();
    this.viewTime = true;
    this.holidayService.memoryboxStatus.next('available');
  }
  closeState() {
    this.memoriesTimerDown();
    this.viewTime = false;
    this.holidayService.memoryboxStatus.next('unavailable');
  }

  generateRandom(min: number, max: number) {
    const diff = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * diff);
    rand = rand + min;
    return rand;
  }

  generateCircle() {
    this.circles = [];
    for (let i = 0; i < this.numberOfMemories; i++) {
      const randomSize = this.generateRandom(10, 40);
      const randomPositionX = this.generateRandom(0, 95);
      const randomPositionY = this.generateRandom(10, 95);
      let circle = {
        y: randomPositionY,
        x: randomPositionX,
        h: randomSize,
        w: randomSize,
        id: i,
      };
      this.circles.push(circle);
    }
  }

  modalState(i: number) {
    this.modalStatus = true;
    const number = Number(i);
    this.holidayService.index.next(number);
    setTimeout(() => {
      console.log('modalState i:', i);
      this.updateView(i);
    }, 50);
  }

  updateView(i: number) {
    console.log('updateView I:', i);
    console.log(this.memories);
    const memoryIndex = this.memories.findIndex((object) => {
      return object.id === i;
    });
    console.log(memoryIndex);
    const circleIndex = this.circles.findIndex((object) => {
      return object.id === this.currentIndex;
    });
    this.dbService.updateMemory(i);

    if (
      this.memories[memoryIndex] !== undefined ||
      this.memories[memoryIndex] !== null
    ) {
      this.dbService.viewedMemoriesArray.next(
        this.dbService.viewedMemoriesArray
          .getValue()
          .concat([this.memories[memoryIndex]])
      );
    }
    setTimeout(() => {
      if (this.memories.length > 0) {
        this.holidayName.nativeElement.innerText =
          this.memories.at(memoryIndex).holidayName;
        this.holidayDate.nativeElement.innerText =
          this.memories.at(memoryIndex).holidayDate;
        this.country.nativeElement.innerText =
          this.memories.at(memoryIndex).country;
        this.memory.nativeElement.innerText =
          this.memories.at(memoryIndex).memory;
      }
      this.memories.splice(memoryIndex, 1);
      this.circles.splice(circleIndex, 1);
    }, 50);
  }

  closeMemory() {
    if (this.currentIndex !== null) {
      this.modal.nativeElement.style.opacity = '0';
      setTimeout(() => {
        this.modalStatus = false;
        this.hover = false;
      }, 200);
    }
  }

  hoverStateA() {
    this.hover = true;
  }
  hoverStateI() {
    this.hover = false;
  }

  ngOnDestroy(): void {}
}
