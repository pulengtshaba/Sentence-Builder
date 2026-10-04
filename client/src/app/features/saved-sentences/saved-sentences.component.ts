import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  SentenceApiService
} from '../../services/sentence-api.service';

import {
  Sentence
} from '../../models/sentence.model';


@Component({
  selector: 'app-saved-sentences',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './saved-sentences.component.html',

  styleUrl:
    './saved-sentences.component.css',

  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class SavedSentencesComponent
  implements OnInit {


  private readonly api =
    inject(SentenceApiService);

  private readonly router =
    inject(Router);

  private readonly changeDetectorRef =
  inject(ChangeDetectorRef);

  sentences: Sentence[] = [];

  loading = false;

  errorMessage = '';


  ngOnInit(): void {

    this.loadSentences();
  }


  /*loadSentences(): void {

    this.loading = true;

    this.errorMessage = '';

    this.api
      .getSentences()
      .subscribe({

        next: sentences => {

          this.sentences =
            sentences;

          this.loading = false;
        },

        error: error => {

          console.error(error);

          this.loading = false;

          this.errorMessage =
            'Unable to load saved sentences.';
        }

      });
  }*/

  loadSentences(): void {

  this.loading = true;
  this.errorMessage = '';

  this.api
    .getSentences()
    .subscribe({

      next: sentences => {

        console.log(
          'SAVED SENTENCES API RESPONSE:',
          sentences
        );

        this.sentences =
          sentences;

        this.loading = false;

        console.log(
          'SAVED SENTENCES LENGTH:',
          this.sentences.length
        );

        this.changeDetectorRef.markForCheck();
      },

      error: error => {

        console.error(
          'loadSentences() ERROR:',
          error
        );

        this.loading = false;

        this.errorMessage =
          'Unable to load saved sentences.';

        this.changeDetectorRef.markForCheck();
      }

    });
}

  editSentence(
    id: number
  ): void {

    this.router.navigate(
      ['/builder', id]
    );
  }


  createNewSentence(): void {

    this.router.navigate(
      ['/builder']
    );
  }
}