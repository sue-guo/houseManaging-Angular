import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor() { }
  url = 'http://localhost:3000/locations';

  // can change fetch method to HttpClient
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? []; // return empty array if no data
  };
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {}; // return empty object if no data
  }

  // getAllHousingLocations(): HousingLocation[] {
  //   return this.housingLocationList;
  // }
  // getHousingLocationById(id: number): HousingLocation | undefined {
  //   return this.housingLocationList.find((housingLocation) => housingLocation.id === id);
  // }

  submitApplication(firstName: string, lastName: string, email: string) {
    //get user input and log it to the console
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
