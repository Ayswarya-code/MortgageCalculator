import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculateMortgageService {

  constructor() { }
  
//Perform monthly payment callculation using formula P[i(i+1)^n]/[(i+1)^n -1]
   calculate(formValues:FormGroup):Observable<number> {
  return new Observable((observer) => {
    let monthlyInterest =(formValues.value.interestRate/100) /12;
    let principal= formValues.value.morgageAmount - formValues.value.downPayment;
    let termsInmonth = formValues.value.term * 12;
    let exponentValue =Math.pow(monthlyInterest +1,termsInmonth)
    let monthlyPayment : number = (principal*monthlyInterest * exponentValue)/(exponentValue-1)
    observer.next(monthlyPayment);
    observer.complete();
    })
  }
}




