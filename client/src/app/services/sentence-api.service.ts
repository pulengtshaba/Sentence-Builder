import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import {
  WordType
} from '../models/word-type.model';

import {
  Word
} from '../models/word.model';

import {
  Sentence,
  SaveSentenceRequest
} from '../models/sentence.model';

@Injectable({
  providedIn: 'root'
})
export class SentenceApiService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;


  getWordTypes(): Observable<WordType[]> {

    return this.http.get<WordType[]>(
      `${this.apiUrl}/word-types`
    );
  }


  getWordsByType(
    typeId: number
  ): Observable<Word[]> {

    return this.http.get<Word[]>(
      `${this.apiUrl}/words`,
      {
        params: {
          typeId
        }
      }
    );
  }


  getSentences(): Observable<Sentence[]> {

    return this.http.get<Sentence[]>(
      `${this.apiUrl}/sentences`
    );
  }


  getSentence(
    id: number
  ): Observable<Sentence> {

    return this.http.get<Sentence>(
      `${this.apiUrl}/sentences/${id}`
    );
  }


  createSentence(
    request: SaveSentenceRequest
  ): Observable<Sentence> {

    return this.http.post<Sentence>(
      `${this.apiUrl}/sentences`,
      request
    );
  }


  updateSentence(
    id: number,
    request: SaveSentenceRequest
  ): Observable<Sentence> {

    return this.http.put<Sentence>(
      `${this.apiUrl}/sentences/${id}`,
      request
    );
  }
}