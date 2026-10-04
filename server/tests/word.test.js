const request =
    require('supertest');


jest.mock(
    '../src/services/wordService',
    () => ({
        getWordsByTypeId: jest.fn()
    })
);


const wordService =
    require('../src/services/wordService');

const app =
    require('../src/app');


describe(
    'GET /api/words',
    () => {

        afterEach(() => {
            jest.clearAllMocks();
        });


        test(
            'returns words for a word type',
            async () => {

                wordService
                    .getWordsByTypeId
                    .mockResolvedValue([
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


                const response =
                    await request(app)
                        .get('/api/words')
                        .query({
                            typeId: 1
                        });


                expect(
                    response.status
                ).toBe(200);


                expect(
                    wordService
                        .getWordsByTypeId
                ).toHaveBeenCalledWith(1);


                expect(
                    response.body
                ).toEqual([
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


        test(
            'returns 400 when typeId is missing',
            async () => {

                const response =
                    await request(app)
                        .get('/api/words');


                expect(
                    response.status
                ).toBe(400);


                expect(
                    response.body.message
                ).toBe(
                    'typeId must be a positive integer.'
                );
            }
        );


        test(
            'returns 400 when typeId is invalid',
            async () => {

                const response =
                    await request(app)
                        .get('/api/words')
                        .query({
                            typeId: 'abc'
                        });


                expect(
                    response.status
                ).toBe(400);


                expect(
                    response.body.message
                ).toBe(
                    'typeId must be a positive integer.'
                );
            }
        );


        test(
            'returns 400 when typeId is zero',
            async () => {

                const response =
                    await request(app)
                        .get('/api/words')
                        .query({
                            typeId: 0
                        });


                expect(
                    response.status
                ).toBe(400);
            }
        );

    }
);