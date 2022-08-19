import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectionConfirmPage } from './inspection-confirm';

@NgModule({
  declarations: [
    InspectionConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectionConfirmPage),
  ],
})
export class InspectionConfirmPageModule {}
