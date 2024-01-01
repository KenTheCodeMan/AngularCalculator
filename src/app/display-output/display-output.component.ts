import { Component, OnInit } from '@angular/core';
import { CalculationsService } from '../calculations.service';

@Component
({
  selector: 'app-display-output',
  templateUrl: './display-output.component.html',
  styleUrl: './display-output.component.scss'
})
export class DisplayOutputComponent implements OnInit {

  public nums: any = [];

  constructor(private calcService: CalculationsService)  {}

  ngOnInit() 
  {
    this.getNumbers();
  }

  public getNumbers()
  {
   this.calcService.getNumberArray()
   .subscribe(nums => {this.nums =Object.values(nums); });
  }
}
