import { Injectable } from '@angular/core';
import {Nums} from './numbersInterface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  private numArray:Nums[];
  private lastOperation:string = ' ';
  private firstFlag:string= 'true';

  constructor() {
    this.numArray =[
    {id: 'inputNumberOne', value: 0}, //input number    [0]
    {id: 'outputNumber', value: 0 }, //output number    [1]
    {id: ' ', value: 0}              //operator storage [2]
    ];
  }

  numberClick(number: any){
    let temp = " " + this.numArray[0].value + number; //concantenates numbers instead of adding them by using a temp variable to convert it to a string, then to parse it back into a number on the next line
    this.numArray[0].value = parseInt(temp);
    this.getNumberArray();
  }

  negativeService(){this.numArray[0].value = this.numArray[0].value * -1;} //turns input number negative by multiplying it by -1 }
  
  returnArray(): Nums[]{return this.numArray;}

  getNumberArray() : Observable<any>
  {
    let numbers = of(this.numArray);
    return numbers;
  }
  addOperator()
  {
    if (this.lastOperation != '+') {this.checkLastOperation('+');} //if the previous operation does not match the current operation, finish the previous operation before starting a new operation of a new type
    else {
      this.numArray[1].value = this.numArray[1].value + this.numArray[0].value; //output set to value of input + output
      this.numArray[0].value = 0; //sets input back to zero
      this.getNumberArray(); //updates the subscribed variables
      this.lastOperation = '+'; //updates last operation to add
      this.firstFlag = 'false'; 
      this.numArray[2].id =  '+'; //
    }
  }

  subtractOperator()
  {
    if (this.lastOperation != '-') {this.checkLastOperation('-');}

    else{
      this.numArray[1].value = this.numArray[1].value - this.numArray[0].value;
      this.numArray[0].value = 0;
      this.getNumberArray();
      this.lastOperation = '-';
      this.firstFlag = 'false';
      this.numArray[2].id = '-';
    }
  }

  multiplyOperator()
  { 
    if (this.lastOperation != '*' && this.firstFlag == 'false') {this.checkLastOperation('*');
  }
    else if(this.firstFlag == 'false' && this.numArray[0].value != 0){
       this.numArray[1].value = this.numArray[1].value * this.numArray[0].value;
       this.numArray[0].value = 0;
       this.getNumberArray();
       this.lastOperation = '*';
       this.numArray[2].id = '*';
    }
   else if (this.firstFlag == 'true'){
      console.log("inside true if statement");
      this.numArray[1].value = this.numArray[0].value;
      this.firstFlag = 'false';
      this.numArray[0].value = 0;
      this.lastOperation = '*';
      this.numArray[2].id = '*';
    }   
  }

  divideOperator()
  {
    if (this.lastOperation != '/' && this.firstFlag == 'false' ){this.checkLastOperation('/');}
    else if(this.firstFlag == 'false')
    {
      if (this.numArray[0].value == 0){alert("Please do not divide by 0");}
      
        else{
        this.numArray[1].value = this.numArray[1].value / this.numArray[0].value;
        this.numArray[0].value = 0;
        this.getNumberArray();
        this.lastOperation = '/';
        this.numArray[2].id = '/';
        }
    }
    else if (this.firstFlag == 'true' || this.numArray[0].value == 0){
      this.numArray[1].value = this.numArray[0].value;
      this.firstFlag = 'false';
      this.numArray[0].value = 0;
      this.lastOperation = '/';
      this.numArray[2].id = '/';
    }
  }
  
  equalsOperator() //uses last operation to finish calculations, then resets last operation variables to blank
  {
    if(this.lastOperation == '+'){
      this.addOperator();
      this.numArray[0].value = 0;
      this.numArray[2].id = ' ';
      this.lastOperation = ' ';
    }

    if(this.lastOperation == '-'){
      this.subtractOperator();
      this.numArray[0].value = 0;
      this.numArray[2].id = ' ';
      this.lastOperation = ' ';
    }

    if(this.lastOperation == '*'){
      this.multiplyOperator();
      this.numArray[0].value = 0;
      this.numArray[2].id = ' ';
      this.lastOperation = ' ';
    }

    if(this.lastOperation == '/'){
      this.divideOperator();
      this.numArray[0].value = 0;
      this.numArray[2].id = ' ';
      this.lastOperation = ' ';
    }
  }
  clearCalculator(){
    this.numArray[0].value = 0;
    this.numArray[1].value = 0;
    this.numArray[2].id = ' ';
    this.firstFlag = "true";
    this.lastOperation = ' ';
  }
  checkLastOperation(nextOperation: string) 
  {
    if (this.lastOperation== "+"){
      this.addOperator();
      this.lastOperation= nextOperation;
      this.numArray[2].id = nextOperation;
    }
    else if (this.lastOperation== "-"){
      this.subtractOperator();
      this.lastOperation= nextOperation;
      this.numArray[2].id = nextOperation;
    }
    else if (this.lastOperation== "*"){
      this.multiplyOperator();
      this.lastOperation= nextOperation;
      this.numArray[2].id = nextOperation;
    }
    else if (this.lastOperation== "/"){
      this.divideOperator();
      this.lastOperation= nextOperation;
      this.numArray[2].id = nextOperation;
    }
    else //this is for when last operation is ' ' or blank, it then look at the next operation for direction on what to do next
    {
      if (nextOperation== "+"){
        this.lastOperation= nextOperation;
        this.addOperator();
        this.numArray[2].id = nextOperation;
      }
      else if (nextOperation== "-"){
        this.lastOperation= nextOperation;
        this.subtractOperator();
        this.numArray[2].id = nextOperation;
      }
      else if (nextOperation== "*"){
        this.lastOperation= nextOperation;
        this.multiplyOperator();
        this.numArray[2].id = nextOperation;
      }
      else if (nextOperation== "/"){
        this.lastOperation= nextOperation;
        this.divideOperator();
        this.numArray[2].id = nextOperation;
      }
    }
  }
}
