export interface SentenceWord {
  id: number;
  text: string;
  position: number;
  wordTypeId?: number;
  wordTypeName?: string;
}

export interface Sentence {
  id: number;
  createdAt: string;
  text: string;
  words: SentenceWord[];
}

export interface SaveSentenceRequest {
  wordIds: number[];
}