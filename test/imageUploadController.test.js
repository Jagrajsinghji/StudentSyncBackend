const request = require('supertest');
const { uploadImage } = require('../utils/cloudinaryUtil');
const receiveImage = require('../middlewares/multerMiddleware');

jest.mock('../utils/cloudinaryUtil');
jest.mock('../middlewares/multerMiddleware');

const { uploadProfile, uploadStudentid } = require('../controllers/imageUploadController');

describe('Image Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadProfile', () => {
    it('should upload a profile image successfully', async () => {
      // Mocking multerMiddleware
      const req = { file: { buffer: Buffer.from('mockImageData') } };
      const res = { json: jest.fn() };
      const next = jest.fn();

      receiveImage.mockImplementation((req, res, next) => {
        next();
      });

      // Mocking cloudinaryUtil
      const uploadResult = { url: 'mockImageUrl' };
      uploadImage.mockResolvedValue(uploadResult);

      await uploadProfile(req, res);

      expect(receiveImage).toHaveBeenCalled();
      expect(uploadImage).toHaveBeenCalledWith(req.file.buffer, expect.any(String), 'profile');
      expect(res.json).toHaveBeenCalledWith({ url: 'mockImageUrl' });
    });

    it('should handle errors during profile image upload', async () => {
      const req = { file: { buffer: Buffer.from('mockImageData') } };
      const res = { json: jest.fn() };

      receiveImage.mockImplementation((req, res, next) => {
        throw new Error('Mock Multer Error');
      });

      await uploadProfile(req, res);
    });
  });

  describe('uploadStudentid', () => {
    it('should upload a student ID image successfully', async () => {
      // Mocking multerMiddleware
      const req = { file: { buffer: Buffer.from('mockImageData') } };
      const res = { json: jest.fn() };
      const next = jest.fn();

      receiveImage.mockImplementation((req, res, next) => {
        next();
      });

      // Mocking cloudinaryUtil
      const uploadResult = { url: 'mockImageUrl' };
      uploadImage.mockResolvedValue(uploadResult);

      await uploadProfile(req, res);

      expect(receiveImage).toHaveBeenCalled();
      expect(uploadImage).toHaveBeenCalledWith(req.file.buffer, expect.any(String), 'profile');
      expect(res.json).toHaveBeenCalledWith({ url: 'mockImageUrl' });
    });

    it('should handle errors during student ID image upload', async () => {
        const req = { file: { buffer: Buffer.from('mockImageData') } };
        const res = { json: jest.fn() };
  
        receiveImage.mockImplementation((req, res, next) => {
          throw new Error('Mock Multer Error');
        });
  
        await uploadProfile(req, res);
    });
  });
});
