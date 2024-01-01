import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { OperatorTypeComponent } from './operator-type/operator-type.component';
import { DisplayOutputComponent } from './display-output/display-output.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberInputComponent,
    OperatorTypeComponent,
    DisplayOutputComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
