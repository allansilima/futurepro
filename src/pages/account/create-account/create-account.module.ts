import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAccountPage } from './create-account';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateAccountPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(CreateAccountPage),
  ],
})
export class CreateAccountPageModule {}
