import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectionRegisterPage } from './inspection-register';

@NgModule({
  declarations: [
    InspectionRegisterPage
  ],
  imports: [
    IonicPageModule.forChild(InspectionRegisterPage)
  ],
})
export class InspectionRegisterPageModule {}
