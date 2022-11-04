import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CalculateMortgageService } from '../.././services/calculate-mortgage.service';
import{MatTooltip} from '@angular/material/tooltip';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
 public monthlyPayment :number=0;
 public isCalculate:boolean=false
 public errorMsg:string="Enter a valid Value";
 public isInvalid:boolean = false;
 
  paymentForm = new FormGroup({
    morgageAmount: new FormControl('0',[Validators.required,Validators.min(0)]),
    interestRate: new FormControl('0',[Validators.required,Validators.min(0)]),
    term : new FormControl('0',[Validators.required,Validators.min(0)]),
    downPayment :new FormControl('0',[Validators.required,Validators.min(0)]),
    paymentFrequency : new FormControl('Monthly')
  });
  
  constructor(private calculateMortgageService:CalculateMortgageService ) {
    ;
   }

  ngOnInit(): void {

  }
  //Calculates the payment if forms are valid
  calculate(){
    console.log("tess",this.paymentForm);
    if(this.paymentForm.invalid){
      this.isInvalid = true;
    }else{
      this.isInvalid= false;
      this.isCalculate= true;
    this.calculateMortgageService.calculate(this.paymentForm).subscribe(payment=>{
    if(payment){
  this.monthlyPayment = payment;
    }
  
  })
    }
   }
}
