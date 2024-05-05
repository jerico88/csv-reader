const dataController = require('../controllers/dataController');
const csv = require('csv-parser');
const fs = require('fs');
const mockcsvData = [
  { name: 'John', age: '30', city: 'New York' },
  { name: 'Jane', age: '25', city: 'London' },
  { name: 'Bob', age: '35', city: 'Paris' },
];

jest.mock('csv-parser', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('fs', () => ({
  createReadStream: jest.fn(() => ({
    pipe: jest.fn().mockReturnThis(),
    on: jest.fn().mockImplementationOnce((event, callback) => {
      if (event === 'data') {
        mockcsvData.forEach(callback);
      } else if (event === 'end') {
        callback();
      }
    }),
  })),
}));

describe('dataController', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('uploadData', () => {
    it('should upload CSV data successfully', () => {
      const mockReq = {
        files: {
          csvFile: {
            path: 'test.csv',
          },
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      dataController.uploadData(mockReq, mockRes);

      expect(fs.createReadStream).toHaveBeenCalledWith('test.csv');
      expect(csv).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'CSV data uploaded successfully',
      });
    });

    it('should handle error during upload', () => {
      const mockReq = {
        files: {
          csvFile: {
            path: 'test.csv',
          },
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      fs.createReadStream.mockImplementationOnce(() => ({
        pipe: jest.fn().mockReturnThis(),
        on: jest.fn().mockImplementationOnce((event, callback) => {
          if (event === 'error') {
            callback(new Error('Upload error'));
          }
        }),
      }));

      dataController.uploadData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Error uploading CSV data',
      });
    });
  });

  describe('getPaginatedData', () => {
    it('should return paginated data', () => {
      const mockReq = {
        query: {
          page: '2',
          limit: '2',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      dataController.csvData = mockcsvData;
      dataController.getPaginatedData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([
        { name: 'Bob', age: '35', city: 'Paris' },
      ]);
    });
  });

  describe('searchData', () => {
    it('should return filtered data based on search term', () => {
      const mockReq = {
        query: {
          searchTerm: 'john',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      dataController.csvData = mockcsvData;
      dataController.searchData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([
        { name: 'John', age: '30', city: 'New York' },
      ]);
    });
  });
});