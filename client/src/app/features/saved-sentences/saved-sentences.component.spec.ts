import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  provideRouter
} from '@angular/router';

import {
  of
} from 'rxjs';

import {
  describe,
  beforeEach,
  it,
  expect,
  vi
} from 'vitest';

import {
  SavedSentencesComponent
} from '../saved-sentences/saved-sentences.component';

import {
  SentenceApiService
} from '../../services/sentence-api.service';


describe(
  'SavedSentencesComponent',
  () => {

    let component:
      SavedSentencesComponent;

    let fixture:
      ComponentFixture<SavedSentencesComponent>;

    let apiService: {
      getSentences: ReturnType<typeof vi.fn>;
    };


    beforeEach(async () => {

      apiService = {

        getSentences:
          vi.fn()

      };


      apiService
        .getSentences
        .mockReturnValue(
          of([
            {
              id: 1,
              createdAt:
                '2026-09-29T00:00:00.000Z',
              text:
                'the clever developer',
              words: []
            }
          ])
        );


      await TestBed.configureTestingModule({

        imports: [
          SavedSentencesComponent
        ],

        providers: [

          provideRouter([]),

          {
            provide: SentenceApiService,
            useValue: apiService
          }

        ]

      }).compileComponents();


      fixture =
        TestBed.createComponent(
          SavedSentencesComponent
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
      'should load saved sentences',
      () => {

        component.loadSentences();


        expect(
          apiService.getSentences
        ).toHaveBeenCalled();


        expect(
          component.sentences.length
        ).toBe(1);


        expect(
          component.sentences[0].text
        ).toBe(
          'the clever developer'
        );

      }
    );


    it(
      'should initially have no error',
      () => {

        expect(
          component.errorMessage
        ).toBe('');

      }
    );

  }
);