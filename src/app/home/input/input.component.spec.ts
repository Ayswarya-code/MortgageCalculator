import { ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { FormGroup ,ReactiveFormsModule,FormsModule,FormBuilder, Validators, FormControl} from '@angular/forms';
import {CalculateMortgageService} from '../.././services/calculate-mortgage.service';
import {of} from 'rxjs';
import { InputComponent } from './input.component';
export class mockCalculateMortgageService
   {
    calculate(formValues:FormGroup){
      return of(800);
    }
  }
describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, FormsModule],
      declarations: [ InputComponent],
      providers: [
       { provide:CalculateMortgageService,useClass :mockCalculateMortgageService}  ]
      
    })
    .compileComponents();
  });

  beforeEach(inject([FormBuilder], (fb: FormBuilder)  => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.paymentForm=  fb.group({ 
      
      
        morgageAmount:new FormControl('1',[Validators.required,Validators.min(0)]),
        interestRate:new FormControl('1',[Validators.required,Validators.min(0)]),
        term:new FormControl('1',[Validators.required,Validators.min(0)]),
        downPayment:new FormControl('1',[Validators.required,Validators.min(0)]),
        paymentFrequency :new FormControl('monthly')
      
      
  });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  })
  // Should Test caluculate method
  it('should calculate',() =>{
    component.isCalculate= true;
    component.calculate();
    expect(component.monthlyPayment).toEqual(800)
     });
    });
