import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import {HousingService} from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
  <section>
    <form>
      <!-- #filter used to access the element -->
      <input type="text" placeholder="Filter by city" #filter/>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
`,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/tutorials/common';
  //create a single instance of the  interface housinglocation, housingLocation11 can used in the template
  // housingLocation11: HousingLocation = {
  //   id: 9999,
  //   name: 'Test Home',
  //   city: 'Test city',
  //   state: 'ST',
  //   // photo: `${this.baseUrl}/example-house.jpg`,
  //   photo: 'assets/example-house.jpg',
  //   availableUnits: 99,
  //   wifi: true,
  //   laundry: false,
  // };
  housingLocationList: HousingLocation[] = [];
  //store the results of search
  filteredLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);
  constructor() {
    // now, get data from the service, it is asynchronous
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
    //this is the old way of getting the data
    // this.housingLocationList = this.housingService.getAllHousingLocations();
    // this.filteredLocationList = this.housingLocationList;
  }
  filterResults(text: String){
    //if the input is empty, show all the results, otherwise show the results that match the input
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((location) => {
      return location.city.toLowerCase().includes(text.toLowerCase());
    });
  }

} 
