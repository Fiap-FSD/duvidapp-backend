import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST post (create post)', async () => {
    const response = await request(app.getHttpServer())
      .post('/post')
      .send({
        title: 'Test Post',
        intro: 'This is a test intro',
        content: 'This is test content',
        imageUrl: 'http://example.com/image.png',
      })
      .expect(201);

    expect(response.body).toMatchObject({
      title: 'Test Post',
      intro: 'This is a test intro',
      content: 'This is test content',
      imageUrl: 'http://example.com/image.png',
    });
  });

  it('/GET post (retrieve all posts)', async () => {
    const response = await request(app.getHttpServer())
      .get('/post')
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
