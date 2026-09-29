const request =
    require('supertest');

jest.mock(
    '../src/services/wordTypeService',
    () => ({
        getAllWordTypes: jest.fn()
    })
);

const wordTypeService =
    require('../src/services/wordTypeService');

const app =
    require('../src/app');


describe(
    'GET /api/word-types',
    () => {

        afterEach(() => {
            jest.clearAllMocks();
        });


        test(
            'returns all word types',
            async () => {

                wordTypeService
                    .getAllWordTypes
                    .mockResolvedValue([
                        {
                            id: 1,
                            name: 'Noun'
                        },
                        {
                            id: 2,
                            name: 'Verb'
                        }
                    ]);


                const response =
                    await request(app)
                        .get('/api/word-types');


                expect(
                    response.status
                ).toBe(200);


                expect(
                    response.body
                ).toEqual([
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


        test(
            'returns 500 when service fails',
            async () => {

                wordTypeService
                    .getAllWordTypes
                    .mockRejectedValue(
                        new Error('Database failure')
                    );


                const response =
                    await request(app)
                        .get('/api/word-types');


                expect(
                    response.status
                ).toBe(500);


                expect(
                    response.body.message
                ).toBe(
                    'An unexpected server error occurred.'
                );
            }
        );

    }
);