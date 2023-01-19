import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';

@Component({
  selector: 'app-p-memories',
  templateUrl: './p-memories.component.html',
  styleUrls: ['./p-memories.component.css'],
})
export class PMemoriesComponent implements OnInit {
  viewedMemories = [];
  viewedM = false;
  countryCode: string;

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.dbService.retrieveViewedMemories();
    this.dbService.viewedMemoriesArray.subscribe(
      (value) => (this.viewedMemories = value)
    );

    if (this.viewedMemories.length !== 0) {
      this.viewedM = true;
    }
  }
}
