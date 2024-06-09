import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<article>
  <img
    class="listing-photo"
    [src]="housingLocation?.photo"
    alt="Exterior photo of {{ housingLocation?.name }}"
    crossorigin
  />
  <section class="listing-description">
    <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
    <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
  </section>
  <section class="listing-features">
    <h2 class="section-heading">About this housing location</h2>
    <ul>
      <li>Units available: {{ housingLocation?.availableUnits }}</li>
      <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
      <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
    </ul>
  </section>
  <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <!-- The template now includes an event handler (submit)="submitApplication()". 
         Angular uses parentheses syntax around the event name to define events in the template code. 
         The code on the right hand side of the equals sign is the code that should be executed when this event is triggered. 
         You can bind to browser events and custom events. -->
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
</article>`,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  //create a new instance of the FormGroup class, FormGroup and FormControl are types that enable you to build forms in Angular
  applyForm = new FormGroup({
    firstName: new FormControl(''),//default value is an empty string
    lastName: new FormControl(''),
    email: new FormControl(''),
  });


  route: ActivatedRoute = inject(ActivatedRoute);
  //inject means that Angular will provide the instance of the service when the component is created
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;



  constructor() {
    // now, get data from the service, it is asynchronous
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
      //this is the old way of getting the data
      // // route.snapshot.params is an Observable, so we need to subscribe to it
      // const housingLocationId = Number(this.route.snapshot.params['id']);
      // this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }


  submitApplication() {
    this.housingService.submitApplication(
      //?? is the nullish coalescing operator, show the right-hand operand when the left-hand operand is null or undefined
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
