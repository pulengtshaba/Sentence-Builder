import {
  TestBed
} from '@angular/core/testing';

import {
  provideHttpClient
} from '@angular/common/http';

import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import {
  describe,
  beforeEach,
  afterEach,
  it,
  expect
} from 'vitest';

import {
  SentenceApiService
} from './sentence-api.service';

import {
  environment
} from '../../environments/environment';


describe('SentenceApiService', () => {

  let service: SentenceApiService;

  let httpMock: HttpTestingController;


  beforeEach(() => {

    TestBed.configureTestingModule({

      providers: [

        SentenceApiService,

        provideHttpClient(),

        provideHttpClientTesting()

      ]

    });


    service =
      TestBed.inject(
        SentenceApiService
      );

    httpMock =
      TestBed.inject(
        HttpTestingController
      );

  });


  afterEach(() => {

    httpMock.verify();

  });


  it(
    'should get word types',
    () => {

      service
        .getWordTypes()
        .subscribe(wordTypes => {

          expect(wordTypes.length)
            .toBe(2);

          expect(wordTypes[0].name)
            .toBe('Noun');

        });


      const request =
        httpMock.expectOne(
          `${environment.apiUrl}/api/word-types`
        );


      expect(request.request.method)
        .toBe('GET');


      request.flush([
        {
          id: 1,
          name: 'Noun'
        },
        {
          id: 2,
          name: 'Verb'
        }
      ]);

    }
  );


  it(
    'should get words by type',
    () => {

      service
        .getWordsByType(1)
        .subscribe(words => {

          expect(words.length)
            .toBe(2);

        });


      const request =
        httpMock.expectOne(
          req =>
            req.url ===
              `${environment.apiUrl}/api/words`
            &&
            req.params.get('typeId') === '1'
        );


      expect(request.request.method)
        .toBe('GET');


      request.flush([
        {
          id: 1,
          text: 'dog',
          wordTypeId: 1
        },
        {
          id: 2,
          text: 'cat',
          wordTypeId: 1
        }
      ]);

    }
  );


  it(
    'should create a sentence',
    () => {

      service
        .createSentence({
          wordIds: [1, 2, 3]
        })
        .subscribe(sentence => {

          expect(sentence.id)
            .toBe(10);

        });


      const request =
        httpMock.expectOne(
          `${environment.apiUrl}/api/sentences`
        );


      expect(request.request.method)
        .toBe('POST');


      expect(request.request.body)
        .toEqual({
          wordIds: [1, 2, 3]
        });


      request.flush({
        id: 10,
        createdAt:
          '2026-09-29T00:00:00.000Z',
        text:
          'the clever developer',
        words: []
      });

    }
  );


  it(
    'should update a sentence',
    () => {

      service
        .updateSentence(
          10,
          {
            wordIds: [1, 2, 4]
          }
        )
        .subscribe(sentence => {

          expect(sentence.id)
            .toBe(10);

        });


      const request =
        httpMock.expectOne(
          `${environment.apiUrl}/api/sentences/10`
        );


      expect(request.request.method)
        .toBe('PUT');


      expect(request.request.body)
        .toEqual({
          wordIds: [1, 2, 4]
        });


      request.flush({
        id: 10,
        createdAt:
          '2026-09-29T00:00:00.000Z',
        text:
          'the clever car',
        words: []
      });

    }
  );

});