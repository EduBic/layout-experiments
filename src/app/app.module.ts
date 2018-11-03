import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Material/material.module';
import { TextStubComponent } from './text-stub/text-stub.component';
import { FormStubComponent } from './form-stub/form-stub.component';
import { LayoutContainerComponent } from './layout-container/layout-container.component';
import { GuiContainerComponent } from './gui-container/gui-container.component';
import { BabylonContainerComponent } from './babylon-container/babylon-container.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/layout-test', pathMatch: 'full' },
  { path: 'layout-test', component: LayoutContainerComponent },
  { path: 'threejs-test', component: GuiContainerComponent },
  { path: 'babylonjs-test', component: BabylonContainerComponent },
  { path: '**', component:  LayoutContainerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TextStubComponent,
    FormStubComponent,
    LayoutContainerComponent,
    GuiContainerComponent,
    BabylonContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
