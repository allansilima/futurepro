import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectionDocumentPage } from './inspection-document';

@NgModule({
  declarations: [
    InspectionDocumentPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectionDocumentPage),
  ],
})
export class InspectionDocumentPageModule {}
