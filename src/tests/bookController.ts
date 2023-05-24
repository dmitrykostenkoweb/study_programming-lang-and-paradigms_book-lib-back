import { Request, Response } from 'express';
import { SinonStub, stub } from 'sinon';
import { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import request from 'supertest';
import { BookController } from "../controllers/bookController";
import Book, { IBook } from "../models/book.model";

import { app } from '../index'


const bookController: BookController = new BookController()
describe('getBooks', (): void => {
  let req: Request;
  let res: Response;
  let findStub: SinonStub;

  beforeEach((): void => {
    req = { query: {} } as Request;
    res = { send: stub(), status: stub().returnsThis() } as unknown as Response;
    findStub = stub(Book, 'find');
  });

  afterEach((): void =>
    findStub.restore()
  );

  it('should retrieve books without any query parameters', async (): Promise<void> => {
    const books:IBook[] = [{ title: 'Book 1' }, { title: 'Book 2' }] as unknown as IBook[];
    findStub.resolves(books);

    await bookController.getBooks(req, res);

    expect(findStub.calledOnce).to.be.true;
    expect(findStub.calledWith({})).to.be.true;
    expect((res.send as SinonStub).calledOnce).to.be.true;
    expect((res.send as SinonStub).calledWith(books)).to.be.true;
  });

  it('should retrieve books with title query parameter', async (): Promise<void> => {
    req.query.title = 'Book Title';
    const books:IBook[] = [{ title: 'Book Title' }] as unknown as IBook[];
    findStub.resolves(books);

    await bookController.getBooks(req, res);

    expect(findStub.calledOnce).to.be.true;
    expect(findStub.calledWith({ title: 'Book Title' })).to.be.true;
    expect((res.send as SinonStub).calledOnce).to.be.true;
    expect((res.send as SinonStub).calledWith(books)).to.be.true;
    expect(res.status).to.not.have.been.all
  });

  it('should retrieve books with author query parameter', async (): Promise<void> => {
    req.query.author = 'Book Author';
    const books: IBook[] = [{ title: 'Book 1', author: 'Book Author' }, { title: 'Book 2', author: 'Book Author' }] as unknown as IBook[];
    findStub.resolves(books);

    await bookController.getBooks(req, res);

    expect(findStub.calledOnce).to.be.true;
    expect(findStub.calledWith({ author: 'Book Author' })).to.be.true;
    expect((res.send as SinonStub).calledOnce).to.be.true;
    expect((res.send as SinonStub).calledWith(books)).to.be.true;
    expect(res.status).to.not.have.been.all
  });

  it('should retrieve books with genre query parameter', async (): Promise<void> => {
    req.query.genre = 'Science Fiction';
    const books = [{ title: 'Book 1', genre: 'Science Fiction' }, { title: 'Book 2', genre: 'Science Fiction' }] as unknown as IBook[];
    findStub.resolves(books);

    await bookController.getBooks(req, res);

    expect(findStub.calledOnce).to.be.true;
    expect(findStub.calledWith({ genre: 'Science Fiction' })).to.be.true;
    expect((res.send as SinonStub).calledOnce).to.be.true;
    expect((res.send as SinonStub).calledWith(books)).to.be.true;
    expect(res.status).to.not.have.been.all
  });


  it('should handle errors and send 500 status code', async (): Promise<void> => {
    const errorMessage = 'Internal Server Error';
    findStub.rejects(new Error(errorMessage));

    await bookController.getBooks(req, res);

    expect(findStub.calledOnce).to.be.true;
    expect(findStub.calledWith({})).to.be.true;
    expect((res.send as SinonStub).called).to.be.true;
    expect((res.status as SinonStub).calledOnce).to.be.true;
    expect((res.status as SinonStub).calledWith(500)).to.be.true;
    expect((res.send as SinonStub).calledOnceWithExactly(errorMessage)).to.be.false;
  });


  let server: any;
  let spy: SinonSpy;

  before((): void => {
    server = app.listen();
  });

  after(() => {
    server.close();
  });

  beforeEach((): void => {
    spy = sinon.spy();
    app.use('/', (req, res) => {
      spy();
      res.sendStatus(200);
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('multiple requests', async ():Promise<void> => {
    const requestPromises: any[] = [];
    const requestCount:number = 232;

    for (let i: number = 0; i < requestCount; i++) {
      requestPromises.push(request(server).get('/'));
    }

    const responses = await Promise.all(requestPromises);

    for (const response of responses) {
      expect(response.status).to.equal(200);
    }
    expect(spy.callCount).to.equal(requestCount);
  });
})