import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';

import {
  CommonModule
} from '@angular/common';

import {
  SentenceApiService
} from '../../services/sentence-api.service';

import {
  WordType
} from '../../models/word-type.model';

import {
  Word
} from '../../models/word.model';

import {
  SelectedWord
} from '../../models/selected-word.model';


@Component({
  selector: 'app-sentence-builder',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './sentence-builder.component.html',

  styleUrl: './sentence-builder.component.css',

  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class SentenceBuilderComponent
  implements OnInit {


  private readonly api =
    inject(SentenceApiService);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);


  wordTypes: WordType[] = [];

  words: Word[] = [];

  selectedWordType:
    WordType | null = null;

  selectedWords:
    SelectedWord[] = [];


  editingSentenceId:
    number | null = null;


  loading = false;

  loadingWords = false;

  saving = false;


  errorMessage = '';

  successMessage = '';


  ngOnInit(): void {

    this.loadWordTypes();

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      const sentenceId =
        Number(id);

      if (
        Number.isInteger(sentenceId) &&
        sentenceId > 0
      ) {

        this.editingSentenceId =
          sentenceId;

        this.loadSentence(sentenceId);
      }
    }
  }


  loadWordTypes(): void {

    this.loading = true;

    this.errorMessage = '';

    this.api.getWordTypes()
      .subscribe({

        next: wordTypes => {

          this.wordTypes =
            wordTypes;

          this.loading = false;
        },

        error: error => {

          console.error(error);

          this.loading = false;

          this.errorMessage =
            'Unable to load word types.';
        }

      });
  }


  selectWordType(
    wordType: WordType
  ): void {

    this.selectedWordType =
      wordType;

    this.loadWords(wordType.id);
  }


  loadWords(
    typeId: number
  ): void {

    this.loadingWords = true;

    this.errorMessage = '';

    this.api
      .getWordsByType(typeId)
      .subscribe({

        next: words => {

          this.words = words;

          this.loadingWords = false;
        },

        error: error => {

          console.error(error);

          this.loadingWords = false;

          this.errorMessage =
            'Unable to load words.';
        }

      });
  }


  addWord(
    word: Word
  ): void {

    const selectedWord: SelectedWord = {

      id: word.id,

      text: word.text,

      wordTypeId:
        word.wordTypeId,

      wordTypeName:
        word.wordTypeName
    };

    this.selectedWords = [
      ...this.selectedWords,
      selectedWord
    ];

    this.successMessage = '';
  }


  removeWord(
    index: number
  ): void {

    this.selectedWords =
      this.selectedWords.filter(
        (_, currentIndex) =>
          currentIndex !== index
      );
  }


  clearSentence(): void {

    this.selectedWords = [];

    this.successMessage = '';

    this.errorMessage = '';
  }


  get sentencePreview(): string {

    return this.selectedWords
      .map(word => word.text)
      .join(' ');
  }


  saveSentence(): void {

    if (
      this.selectedWords.length === 0
    ) {

      this.errorMessage =
        'Add at least one word before saving.';

      return;
    }


    this.saving = true;

    this.errorMessage = '';

    this.successMessage = '';


    const wordIds =
      this.selectedWords.map(
        word => word.id
      );


    if (
      this.editingSentenceId === null
    ) {

      this.api
        .createSentence({
          wordIds
        })
        .subscribe({

          next: sentence => {

            this.saving = false;

            this.successMessage =
              'Sentence saved successfully.';

            this.editingSentenceId =
              sentence.id;
          },

          error: error => {

            console.error(error);

            this.saving = false;

            this.errorMessage =
              'Unable to save sentence.';
          }

        });

    } else {

      this.api
        .updateSentence(
          this.editingSentenceId,
          {
            wordIds
          }
        )
        .subscribe({

          next: sentence => {

            this.saving = false;

            this.successMessage =
              'Sentence updated successfully.';
          },

          error: error => {

            console.error(error);

            this.saving = false;

            this.errorMessage =
              'Unable to update sentence.';
          }

        });
    }
  }


  loadSentence(
    id: number
  ): void {

    this.loading = true;

    this.errorMessage = '';

    this.api
      .getSentence(id)
      .subscribe({

        next: sentence => {

          this.selectedWords =
            sentence.words
              .sort(
                (a, b) =>
                  a.position - b.position
              )
              .map(word => ({
                id: word.id,

                text: word.text,

                wordTypeId:
                  word.wordTypeId ?? 0,

                wordTypeName:
                  word.wordTypeName
              }));

          this.loading = false;
        },

        error: error => {

          console.error(error);

          this.loading = false;

          this.errorMessage =
            'Unable to load sentence.';
        }

      });
  }


  viewSavedSentences(): void {

    this.router.navigate(
      ['/sentences']
    );
  }


  createNewSentence(): void {

    this.router.navigate(
      ['/builder']
    );
  }
}