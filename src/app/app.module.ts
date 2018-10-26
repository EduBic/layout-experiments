import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Material/material.module';
import { TextStubComponent } from './text-stub/text-stub.component';
import { FormStubComponent } from './form-stub/form-stub.component';

@NgModule({
  declarations: [
    AppComponent,
    TextStubComponent,
    FormStubComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
