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
import { PixiContainerComponent } from './pixi-container/pixi-container.component';
import { PixiPositionComponentComponent } from './pixi-position-component/pixi-position-component.component';
import { PaperComponent } from './paper/paper.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/layout-test', pathMatch: 'full' },
  { path: 'layout-test', component: LayoutContainerComponent },
  { path: 'threejs-test', component: GuiContainerComponent },
  { path: 'babylonjs-test', component: BabylonContainerComponent },
  { path: 'pixi-test', component: PixiContainerComponent },
  { path: 'pixi-position-test', component: PixiPositionComponentComponent },
  { path: 'paper-test', component: PaperComponent },
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
    PixiContainerComponent,
    PixiPositionComponentComponent,
    PaperComponent,
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
