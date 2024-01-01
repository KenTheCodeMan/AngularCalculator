import { Component, OnInit } from '@angular/core';
import { CalculationsService } from '../calculations.service';

@Component
({
  selector: 'app-operator-type',
  templateUrl: './operator-type.component.html',
  styleUrl: './operator-type.component.scss'
})
export class OperatorTypeComponent implements OnInit{
  public nums: any = [];
  constructor(private calcService: CalculationsService){}
  ngOnInit() {this.getNumbers();}

  operatorButton(string:string) //passes in the string to select the appropriate operation within the calculation services
  {
      if(string == 'add') this.calcService.addOperator();
      if(string == 'subtract') this.calcService.subtractOperator();
      if(string == 'multiply') this.calcService.multiplyOperator();
      if(string == 'divide') this.calcService.divideOperator();
      if(string == 'equals') this.calcService.equalsOperator();
      if(string == 'clear') this.calcService.clearCalculator();
  }

  public getNumbers()
  {
   this.calcService.getNumberArray()
   .subscribe(nums => {this.nums =Object.values(nums);console.log(this.nums, "testing array"); });
  }
}
