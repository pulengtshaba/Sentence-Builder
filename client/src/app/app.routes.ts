import {
  Routes
} from '@angular/router';

import {
  SentenceBuilderComponent
} from './features/sentence-builder/sentence-builder.component';

import {
  SavedSentencesComponent
} from './features/saved-sentences/saved-sentences.component';


export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'builder'
  },

  {
    path: 'builder',
    component: SentenceBuilderComponent
  },

  {
    path: 'builder/:id',
    component: SentenceBuilderComponent
  },

  {
    path: 'sentences',
    component: SavedSentencesComponent
  },

  {
    path: '**',
    redirectTo: 'builder'
  }

];