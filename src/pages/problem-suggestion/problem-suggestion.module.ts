import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemSuggestionPage } from './problem-suggestion';

@NgModule({
  declarations: [
    ProblemSuggestionPage,
  ],
  imports: [
    IonicPageModule.forChild(ProblemSuggestionPage),
  ],
})
export class ProblemSuggestionPageModule {}
