import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  view: any = [600, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme: any = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  countryData: any;
  genderData: any;
  cityData: any;
  ageData: any;
  agegroup: any;

  res:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      // Extract the JSON string
      const jsonString = params.obj;

      // Parse the JSON string into an array of objects
      const arrayOfObjects = JSON.parse(jsonString);

        this.res =  arrayOfObjects
    });

    this.countryCountData()
    this.genderCountData()
    this.cityCountData()
    this.ageRangeData()
  }


  countryCountData() {
    let countries = this.res.map((person: any) => person.country.toLowerCase());
    this.countryData = this.userDetails(countries)
  }

  cityCountData() {
    let cities = this.res.map((person: any) => person.city.toLowerCase());
    this.cityData = this.userDetails(cities)
  }

  genderCountData() {
    let gender = this.res.map((person: any) => person.gender.toLowerCase());
    this.genderData = this.userDetails(gender);
  }

  userDetails(data: any) {

    // Count the occurrences of each data (ex: country,city,gender)
    const countData = data.reduce((acc: any, data: any) => {
      acc[data] = (acc[data] || 0) + 1;
      return acc;
    }, {});

    // Transform the count object into the desired array format
    const result = Object.entries(countData).map(([name, value]) => {
      return { name: name.charAt(0).toUpperCase() + name.slice(1), value };
    });

    return result;
  }


  ageRangeData() {
    this.agegroup = [
      { name: '18-30', value: 0 },
      { name: '30-60', value: 0 },
      { name: '60+', value: 0 }
    ]
    this.res.forEach((person: any) => {
      if (person.age >= '18' && person.age <= '30') {
        this.agegroup[0].value++;
      }
      else if (person.age >= '30' && person.age <= '60') {
        this.agegroup[1].value++;
      }
      else {
        this.agegroup[2].value++;
      }
    });
    console.log('data', this.agegroup)
  }

}
