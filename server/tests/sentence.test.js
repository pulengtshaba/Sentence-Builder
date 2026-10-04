const request =
    require('supertest');


jest.mock(
    '../src/services/sentenceService',
    () => ({
        getAllSentences: jest.fn(),
        getSentenceById: jest.fn(),
        createSentence: jest.fn(),
        updateSentence: jest.fn()
    })
);


const sentenceService =
    require('../src/services/sentenceService');

const app =
    require('../src/app');


describe(
    'Sentence API',
    () => {

        afterEach(() => {
            jest.clearAllMocks();
        });


        describe(
            'GET /api/sentences',
            () => {

                test(
                    'returns saved sentences',
                    async () => {

                        sentenceService
                            .getAllSentences
                            .mockResolvedValue([
                                {
                                    id: 1,
                                    text:
                                        'the clever developer',
                                    words: [
                                        {
                                            id: 1,
                                            text: 'the',
                                            position: 1
                                        },
                                        {
                                            id: 2,
                                            text: 'clever',
                                            position: 2
                                        },
                                        {
                                            id: 3,
                                            text: 'developer',
                                            position: 3
                                        }
                                    ]
                                }
                            ]);


                        const response =
                            await request(app)
                                .get(
                                    '/api/sentences'
                                );


                        expect(
                            response.status
                        ).toBe(200);


                        expect(
                            response.body[0].text
                        ).toBe(
                            'the clever developer'
                        );
                    }
                );

            }
        );


        describe(
            'GET /api/sentences/:id',
            () => {

                test(
                    'returns a sentence',
                    async () => {

                        sentenceService
                            .getSentenceById
                            .mockResolvedValue({
                                id: 10,
                                text:
                                    'the fast car',
                                words: [
                                    {
                                        id: 1,
                                        text: 'the',
                                        position: 1
                                    },
                                    {
                                        id: 2,
                                        text: 'fast',
                                        position: 2
                                    },
                                    {
                                        id: 3,
                                        text: 'car',
                                        position: 3
                                    }
                                ]
                            });


                        const response =
                            await request(app)
                                .get(
                                    '/api/sentences/10'
                                );


                        expect(
                            response.status
                        ).toBe(200);


                        expect(
                            response.body.id
                        ).toBe(10);


                        expect(
                            response.body.text
                        ).toBe(
                            'the fast car'
                        );
                    }
                );


                test(
                    'returns 400 for invalid ID',
                    async () => {

                        const response =
                            await request(app)
                                .get(
                                    '/api/sentences/abc'
                                );


                        expect(
                            response.status
                        ).toBe(400);


                        expect(
                            response.body.message
                        ).toBe(
                            'Sentence ID must be a positive integer.'
                        );
                    }
                );


                test(
                    'returns 404 when sentence does not exist',
                    async () => {

                        sentenceService
                            .getSentenceById
                            .mockRejectedValue(
                                {
                                    statusCode: 404,
                                    message:
                                        'Sentence not found.',
                                    isOperational: true
                                }
                            );


                        const response =
                            await request(app)
                                .get(
                                    '/api/sentences/999'
                                );


                        expect(
                            response.status
                        ).toBe(404);


                        expect(
                            response.body.message
                        ).toBe(
                            'Sentence not found.'
                        );
                    }
                );

            }
        );


        describe(
            'POST /api/sentences',
            () => {

                test(
                    'creates a sentence',
                    async () => {

                        sentenceService
                            .createSentence
                            .mockResolvedValue({
                                id: 1,
                                text:
                                    'the clever developer',
                                words: [
                                    {
                                        id: 1,
                                        text: 'the',
                                        position: 1
                                    },
                                    {
                                        id: 2,
                                        text: 'clever',
                                        position: 2
                                    },
                                    {
                                        id: 3,
                                        text: 'developer',
                                        position: 3
                                    }
                                ]
                            });


                        const response =
                            await request(app)
                                .post(
                                    '/api/sentences'
                                )
                                .send({
                                    wordIds: [
                                        1,
                                        2,
                                        3
                                    ]
                                });


                        expect(
                            response.status
                        ).toBe(201);


                        expect(
                            sentenceService
                                .createSentence
                        ).toHaveBeenCalledWith([
                            1,
                            2,
                            3
                        ]);


                        expect(
                            response.body.text
                        ).toBe(
                            'the clever developer'
                        );
                    }
                );


                test(
                    'returns 400 when wordIds is missing',
                    async () => {

                        sentenceService
                            .createSentence
                            .mockRejectedValue(
                                {
                                    statusCode: 400,
                                    message:
                                        'wordIds must be an array.',
                                    isOperational: true
                                }
                            );


                        const response =
                            await request(app)
                                .post(
                                    '/api/sentences'
                                )
                                .send({});


                        expect(
                            response.status
                        ).toBe(400);


                        expect(
                            response.body.message
                        ).toBe(
                            'wordIds must be an array.'
                        );
                    }
                );


                test(
                    'returns 400 for empty wordIds',
                    async () => {

                        sentenceService
                            .createSentence
                            .mockRejectedValue(
                                {
                                    statusCode: 400,
                                    message:
                                        'At least one word is required.',
                                    isOperational: true
                                }
                            );


                        const response =
                            await request(app)
                                .post(
                                    '/api/sentences'
                                )
                                .send({
                                    wordIds: []
                                });


                        expect(
                            response.status
                        ).toBe(400);
                    }
                );

            }
        );


        describe(
            'PUT /api/sentences/:id',
            () => {

                test(
                    'updates a sentence',
                    async () => {

                        sentenceService
                            .updateSentence
                            .mockResolvedValue({
                                id: 10,
                                text:
                                    'the fast car',
                                words: [
                                    {
                                        id: 1,
                                        text: 'the',
                                        position: 1
                                    },
                                    {
                                        id: 2,
                                        text: 'fast',
                                        position: 2
                                    },
                                    {
                                        id: 3,
                                        text: 'car',
                                        position: 3
                                    }
                                ]
                            });


                        const response =
                            await request(app)
                                .put(
                                    '/api/sentences/10'
                                )
                                .send({
                                    wordIds: [
                                        1,
                                        2,
                                        3
                                    ]
                                });


                        expect(
                            response.status
                        ).toBe(200);


                        expect(
                            sentenceService
                                .updateSentence
                        ).toHaveBeenCalledWith(
                            10,
                            [1, 2, 3]
                        );


                        expect(
                            response.body.text
                        ).toBe(
                            'the fast car'
                        );
                    }
                );


                test(
                    'returns 400 for invalid sentence ID',
                    async () => {

                        const response =
                            await request(app)
                                .put(
                                    '/api/sentences/abc'
                                )
                                .send({
                                    wordIds: [1]
                                });


                        expect(
                            response.status
                        ).toBe(400);


                        expect(
                            response.body.message
                        ).toBe(
                            'Sentence ID must be a positive integer.'
                        );
                    }
                );


                test(
                    'returns 404 for nonexistent sentence',
                    async () => {

                        sentenceService
                            .updateSentence
                            .mockRejectedValue(
                                {
                                    statusCode: 404,
                                    message:
                                        'Sentence not found.',
                                    isOperational: true
                                }
                            );


                        const response =
                            await request(app)
                                .put(
                                    '/api/sentences/999'
                                )
                                .send({
                                    wordIds: [1]
                                });


                        expect(
                            response.status
                        ).toBe(404);


                        expect(
                            response.body.message
                        ).toBe(
                            'Sentence not found.'
                        );
                    }
                );

            }
        );

    }
);