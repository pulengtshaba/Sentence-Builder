import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  provideRouter,
  Routes
} from '@angular/router';

import {
  Component
} from '@angular/core';

import {
  of,
  throwError
} from 'rxjs';

import {
  describe,
  beforeEach,
  it,
  expect,
  vi
} from 'vitest';

import {
  SentenceBuilderComponent
} from '../sentence-builder/sentence-builder.component';

import {
  SentenceApiService
} from '../../services/sentence-api.service';

@Component({
  template: ''
})
class DummyComponent {}

const routes: Routes = [
  {
    path: 'sentences',
    component: DummyComponent
  }
];
describe(
  'SentenceBuilderComponent',
  () => {

    let component:
      SentenceBuilderComponent;

    let fixture:
      ComponentFixture<SentenceBuilderComponent>;

    let apiService: {
      getWordTypes: ReturnType<typeof vi.fn>;
      getWordsByType: ReturnType<typeof vi.fn>;
      getSentence: ReturnType<typeof vi.fn>;
      createSentence: ReturnType<typeof vi.fn>;
      updateSentence: ReturnType<typeof vi.fn>;
    };


    beforeEach(async () => {

      apiService = {

        getWordTypes:
          vi.fn(),

        getWordsByType:
          vi.fn(),

        getSentence:
          vi.fn(),

        createSentence:
          vi.fn(),

        updateSentence:
          vi.fn()

      };


      apiService
        .getWordTypes
        .mockReturnValue(
          of([
            {
              id: 1,
              name: 'Noun'
            },
            {
              id: 2,
              name: 'Verb'
            }
          ])
        );


      await TestBed.configureTestingModule({

        imports: [
          SentenceBuilderComponent
        ],

        providers: [

          provideRouter(routes),

          {
            provide: SentenceApiService,
            useValue: apiService
          }

        ]

      }).compileComponents();


      fixture =
        TestBed.createComponent(
          SentenceBuilderComponent
        );

      component =
        fixture.componentInstance;

    });


    it(
      'should create',
      () => {

        expect(component)
          .toBeTruthy();

      }
    );


    it(
      'should load word types',
      () => {

        component.loadWordTypes();


        expect(
          apiService.getWordTypes
        ).toHaveBeenCalled();


        expect(
          component.wordTypes.length
        ).toBe(2);

      }
    );


    it(
      'should select a word type and load its words',
      () => {

        apiService
          .getWordsByType
          .mockReturnValue(
            of([
              {
                id: 1,
                text: 'dog',
                wordTypeId: 1
              }
            ])
          );


        const wordType = {
          id: 1,
          name: 'Noun'
        };


        component.selectWordType(
          wordType
        );


        expect(
          component.selectedWordType
        ).toEqual(wordType);


        expect(
          apiService.getWordsByType
        ).toHaveBeenCalledWith(1);


        expect(
          component.words.length
        ).toBe(1);

      }
    );


    it(
      'should add words in sequence',
      () => {

        component.addWord({
          id: 1,
          text: 'the',
          wordTypeId: 1
        });


        component.addWord({
          id: 2,
          text: 'developer',
          wordTypeId: 1
        });


        expect(
          component.selectedWords
        ).toEqual([

          {
            id: 1,
            text: 'the',
            wordTypeId: 1
          },

          {
            id: 2,
            text: 'developer',
            wordTypeId: 1
          }

        ]);

      }
    );


    it(
      'should remove the selected word',
      () => {

        component.selectedWords = [

          {
            id: 1,
            text: 'the',
            wordTypeId: 1
          },

          {
            id: 2,
            text: 'clever',
            wordTypeId: 3
          },

          {
            id: 3,
            text: 'developer',
            wordTypeId: 1
          }

        ];


        component.removeWord(1);


        expect(
          component.selectedWords
        ).toEqual([

          {
            id: 1,
            text: 'the',
            wordTypeId: 1
          },

          {
            id: 3,
            text: 'developer',
            wordTypeId: 1
          }

        ]);

      }
    );


    it(
      'should clear the sentence',
      () => {

        component.selectedWords = [

          {
            id: 1,
            text: 'the',
            wordTypeId: 1
          }

        ];


        component.clearSentence();


        expect(
          component.selectedWords
        ).toEqual([]);

      }
    );


    it(
      'should create a new sentence with POST',
      () => {

        component.selectedWords = [

          {
            id: 1,
            text: 'the',
            wordTypeId: 1
          },

          {
            id: 2,
            text: 'developer',
            wordTypeId: 1
          }

        ];


        apiService
          .createSentence
          .mockReturnValue(
            of({
              id: 10,
              createdAt:
                '2026-09-29T00:00:00.000Z',
              text:
                'the developer',
              words: []
            })
          );


        component.editingSentenceId =
          null;


        component.saveSentence();


        expect(
          apiService.createSentence
        ).toHaveBeenCalledWith({
          wordIds: [1, 2]
        });


        expect(
          component.editingSentenceId
        ).toBe(10);

      }
    );


    it(
      'should update an existing sentence with PUT',
      () => {

        component.selectedWords = [

          {
            id: 1,
            text: 'the',
            wordTypeId: 1
          },

          {
            id: 3,
            text: 'car',
            wordTypeId: 1
          }

        ];


        component.editingSentenceId =
          10;


        apiService
          .updateSentence
          .mockReturnValue(
            of({
              id: 10,
              createdAt:
                '2026-09-29T00:00:00.000Z',
              text:
                'the car',
              words: []
            })
          );


        component.saveSentence();


        expect(
          apiService.updateSentence
        ).toHaveBeenCalledWith(
          10,
          {
            wordIds: [1, 3]
          }
        );

      }
    );


    it(
      'should not save an empty sentence',
      () => {

        component.selectedWords = [];


        component.saveSentence();


        expect(
          apiService.createSentence
        ).not.toHaveBeenCalled();


        expect(
          component.errorMessage
        ).toBe(
          'Add at least one word before saving.'
        );

      }
    );


    it(
      'should display an error when loading words fails',
      () => {

        apiService
          .getWordsByType
          .mockReturnValue(
            throwError(
              () => new Error('Network error')
            )
          );


        component.loadWords(1);


        expect(
          component.loadingWords
        ).toBe(false);


        expect(
          component.errorMessage
        ).toBe(
          'Unable to load words.'
        );

      }
    );

  }
);