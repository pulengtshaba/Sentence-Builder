# Sentence Builder 

[![CI](https://github.com/pulengtshaba/Sentence-Builder/actions/workflows/ci.yml/badge.svg)](https://github.com/pulengtshaba/Sentence-Builder/actions/workflows/ci.yml)


 [![Continuous Deployment](https://github.com/pulengtshaba/Sentence-Builder/actions/workflows/cd.yml/badge.svg)](https://github.com/pulengtshaba/Sentence-Builder/actions/workflows/cd.yml)

A full-stack web application that allows users to construct 

sentences dynamically by selecting words according to their 

grammatical type. 

 

Users can build, save, view and edit sentences. 

 

## Technology Stack 

 

### Frontend 

- Angular 18+ 

 

### Backend 

- Node.js 

- Express.js 

- Prisma ORM 

 

### Database 

- PostgreSQL 

## Features 

 

- Select a grammatical word type 

- View words belonging to the selected type 

- Add words sequentially to construct a sentence 

- Save completed sentences 

- View previously saved sentences 

- Edit previously saved sentences 

 

## Supported Word Types 

 

- Noun 

- Verb 

- Adjective 

- Adverb 

- Pronoun 

- Preposition 

- Conjunction 

- Determiner 

- Exclamation 

## Architecture 

 

The application consists of three main components: 

 

Angular Client 

      | 

      | HTTP / REST 

      v 

Node.js + Express API 

      | 

      | Prisma ORM 

      v 

PostgreSQL Database 

 

The Angular application manages the sentence currently being 

constructed as client-side state. 

 

Completed sentences are sent to the Express API for persistence. 

 

The backend stores sentences as ordered relationships between 

sentences and words, allowing saved sentences to be reconstructed 

and edited later. 

## Database Model 

 

### WordType 

 

Represents a grammatical category. 

 

Examples: 

- Noun 

- Verb 

- Adjective 

 

### Word 

 

Represents an available word and belongs to a WordType. 

 

### Sentence 

 

Represents a persisted sentence. 

 

### SentenceWord 

 

Associates words with a sentence and stores their position. 

 

This allows the original word order to be reconstructed when 

retrieving or editing a sentence. 

 

WordType 

    1 

    │ 

    │ 

    * 

   Word 

    │ 

    * 

    │ 

SentenceWord 

    │ 

    * 

    │ 

    1 

Sentence 

 
Method 

Endpoint 

Purpose 

GET 

/api/word-types 

Retrieve grammatical types 

GET 

/api/words?typeId=1 

Retrieve words by type 

GET 

/api/sentences 

Retrieve all saved sentences 

GET 

/api/sentences/:id 

Retrieve one sentence 

POST 

/api/sentences 

Create a sentence 

PUT 

/api/sentences/:id 

Update a sentence 

Create Sentence 

POST /api/sentences 

Request: 

{ "wordIds": [4, 17, 31, 45, 52] } 

Response: 

{ 
  "id": 12, 
  "text": "the clever developer writes code", 
  "words": [...] 
} 

Response: 

{ 
  "id": 12, 
  "text": "the clever developer writes code", 
  "words": [...] 
} 

Method 

Endpoint 

Purpose 

GET 

/api/word-types 

Retrieve grammatical types 

GET 

/api/words?typeId=1 

Retrieve words by type 

GET 

/api/sentences 

Retrieve all saved sentences 

GET 

/api/sentences/:id 

Retrieve one sentence 

POST 

/api/sentences 

Create a sentence 

PUT 

/api/sentences/:id 

Update a sentence 

 

### Create Sentence 

 

POST `/api/sentences` 

 

Request: 

 
{ 

  "wordIds": [4, 17, 31, 45, 52] 

} 

 

Response: 

{ 

  "id": 12, 

  "text": "the clever developer writes code", 

  "words": [...] 

} 

# 6. Installation instructions 

 

This section is critical. 

 


## Prerequisites 

 

Ensure the following are installed: 

 

- Node.js 

- npm 

- MS SQL SERVER

- Angular CLI 

Then: 

## Installation 

 

Clone the repository: 

 


[git clone <repository-url> ](https://github.com/pulengtshaba/Sentence-Builder.git)

cd sentence-builder 


# 7. Backend setup 

 

Add: 

 

### Backend Setup 

 

Navigate to the server: 

 


cd server 

npm install 

Create a .env file using .env.example. 

Example: 

DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/sentence_builder 

CLIENT_URL=http://localhost:4200 

PORT=3000 

Run database migrations: 

npx prisma migrate deploy 

Seed the database: 

npx prisma db seed 

Start the development server: 

npm run dev 

The API will be available at: 

http://localhost:3000 

  

# 8. Frontend setup 

 

Add: 

 

### Frontend Setup 

 

Open another terminal: 

 

cd client 

npm install 

ng serve 

Open: 

http://localhost:4200 

 

If your final project uses: 

npm start 


## Testing 


 npm test


### Backend 

cd server 

npm test 

Frontend 

cd client 

ng test 

Production Build 

ng build 

# 10. Document important design decisions 

 

## Design Decisions 

 

### Ordered Sentence Storage 

 

Sentences are stored using Sentence and SentenceWord records 

rather than only storing the final sentence text. 

 

SentenceWord contains a position value, allowing the original 

word sequence to be reconstructed. 

 

### Client-Side Construction 

 

An unfinished sentence remains in Angular state until the user 

chooses to save it. 

 

This prevents incomplete sentences from being persisted after 

every word selection. 

 

### Transactional Updates 

 

Sentence updates are performed in a database transaction. 

 

The existing word relationships are removed and replaced with 

the new ordered collection as a single operation. 

 

### API DTOs 

 

The API returns sentence data in a client-friendly format rather 

than exposing the database schema directly. 

 

## Assumptions 

 

- Users construct sentences only from words available in the system. 

- The same word may appear multiple times in a sentence. 

- Authentication is outside the current assessment scope. 

- Deleting sentences is outside the current assessment scope. 

- Sentence updates replace the existing ordered word collection. 

 

 

sentence-builder/ 

│ 

├── client/ 

│   └── src/app/ 

│       ├── features/ 

│       │   ├── sentence-builder/ 

│       │   └── saved-sentences/ 

│       ├── models/ 

│       └── services/ 

│ 

├── server/ 

│   ├── prisma/ 

│   ├── src/ 

│   │   ├── controllers/ 

│   │   ├── middleware/ 

│   │   ├── routes/ 

│   │   ├── services/ 

│   │   └── lib/ 

│   └── tests/ 

│ 

└── README.md 

 

 

## Screenshots 

 

### Sentence Builder 

 

![builder](./screenshots/builder.png) 

 

### Saved Sentences 

 

![saved](./screenshots/saved.png) 

 

### Editing a Sentence 

 

![edit](./screenshots/edit.png) 



                   Developer 

                       │ 

                       │ push 

                       ▼ 

                    GitHub 

                       │ 

                       ▼ 

              ┌─────────────────┐ 

              │ GitHub Actions  │ 

              └────────┬────────┘ 

                       │ 

          ┌────────────┴────────────┐ 

          ▼                         ▼ 

     Backend CI                Frontend CI 

          │                         │ 

       npm ci                     npm ci 

          │                         │ 

       Prisma                     tests 

          │                         │ 

       tests                      build 

          │                         │ 

          └────────────┬────────────┘ 

                       │ 

                      PASS 

                       │ 

                       ▼ 

                Build containers 

                       │ 

                       ▼ 

                      ACR 

                       │ 

             ┌─────────┴─────────┐ 

             ▼                   ▼ 

        Express API          Angular Web 

             │ 

             ▼ 

        PostgreSQL 
 
