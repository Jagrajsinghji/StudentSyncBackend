const userwantskillsController = require('../controllers/userwantskillsController');
const Userwantskills = require('../models/userwantskills');
const Skills = require('../models/userwantskills');

jest.mock('../models/userwantskills'); // Mock the Userwantskills model
jest.mock('../models/skills'); // Mock the Skills model

describe('userwantskillsController', () => {
  describe('getAUserWantSkills', () => {
    it('should return user want skills when a valid user ID is provided', async () => {
      const mockUserId = 'validUserId';
      const mockUserWantSkills = {
        userId: mockUserId,
        wantSkills: [{ name: 'Skill1' }, { name: 'Skill2' }],
      };

      // Mock the findOne method of Userwantskills model
      Userwantskills.findOne.mockResolvedValue(mockUserWantSkills);

      const req = { params: { id: mockUserId } };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await userwantskillsController.getAUserWantSkills(req, res);
    });

    it('should return 404 when the user does not want to learn any skills', async () => {
      const mockUserId = 'nonExistentUserId';

      // Mock the findOne method of Userwantskills model to return null
      Userwantskills.findOne.mockResolvedValue(null);

      const req = { params: { id: mockUserId } };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await userwantskillsController.getAUserWantSkills(req, res);
    });

    it('should handle errors and return a 500 status code', async () => {
      const mockUserId = 'validUserId';


      const req = { params: { id: mockUserId } };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await userwantskillsController.getAUserWantSkills(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

});
