import { GET } from './route';
import consola from 'consola';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from '@langchain/openai';

jest.mock('consola');
jest.mock('langchain/document_loaders/fs/directory');
jest.mock('langchain/document_loaders/fs/json');
jest.mock('langchain/vectorstores/hnswlib');
jest.mock('@langchain/openai');

describe('GET', () => {
  let loaderMock;
  let vectorStoreMock;

  beforeEach(() => {
    loaderMock = {
      load: jest.fn(),
    };
    vectorStoreMock = {
      asRetriever: jest.fn(),
    };
    DirectoryLoader.mockImplementation(() => loaderMock);
    HNSWLib.fromDocuments = jest.fn().mockResolvedValue(vectorStoreMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load data, create vector store, and initialize retriever', async () => {
    const mockData = [
      {
        pageContent: 'content',
        metadata: { source: 'source' },
      },
    ];

    loaderMock.load.mockResolvedValue(mockData);

    await GET();

    expect(loaderMock.load).toHaveBeenCalledWith();
    expect(HNSWLib.fromDocuments).toHaveBeenCalledWith(
      mockData,
      expect.any(OpenAIEmbeddings),
    );
    expect(vectorStoreMock.asRetriever).toHaveBeenCalled();
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to load data');
    loaderMock.load.mockRejectedValue(error);

    await GET();

    expect(consola.error).toHaveBeenCalledWith(
      new Error('Failed to load data from directory:'),
      error,
    );
  });
});
