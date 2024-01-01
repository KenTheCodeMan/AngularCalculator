import { Component, OnInit } from '@angular/core';
import { CalculationsService } from '../calculations.service';


@Component
({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss'
})
export class NumberInputComponent implements OnInit{
  public nums: any = [];
  constructor(private calcService: CalculationsService){} //contruct calculationsservice for calculations and observables

  ngOnInit() { this.getNumbers();  }//on initializiation start subscription service to the numArray in calculation.service.ts

  numberClick(number: any){this.calcService.numberClick(number);}

  turnNegative(){this.calcService.negativeService();}

  public getNumbers()
  {
   this.calcService.getNumberArray()
   .subscribe(nums => {this.nums =Object.values(nums);});
  }
}
