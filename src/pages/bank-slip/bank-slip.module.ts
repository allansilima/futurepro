import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankSlipPage } from './bank-slip';

@NgModule({
  declarations: [
    BankSlipPage,
  ],
  imports: [
    IonicPageModule.forChild(BankSlipPage),
  ],
})
export class BankSlipPageModule {}
