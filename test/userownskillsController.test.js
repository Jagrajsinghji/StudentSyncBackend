const userownskillsController = require('../controllers/userownskillsController');
const Userownskills = require('../models/userownskills');
const Skills = require('../models/skills');

jest.mock('../models/userownskills'); // Mock the Userownskills model
jest.mock('../models/skills'); // Mock the Skills model

describe('userownskillsController', () => {
  describe('getAUserOwnSkills', () => {
    it('should return user own skills when a valid user ID is provided', async () => {
      const mockUserId = 'validUserId';
      const mockUserOwnSkills = {
        userId: mockUserId,
        ownSkills: [{ name: 'Skill1' }, { name: 'Skill2' }],
      };

      // Mock the findOne method of Userownskills model
      Userownskills.findOne.mockResolvedValue(mockUserOwnSkills);

      const req = { params: { id: mockUserId } };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await userownskillsController.getAUserOwnSkills(req, res);

    });

    it('should return 404 when the user does not have any own skills', async () => {
      const mockUserId = 'nonExistentUserId';

      // Mock the findOne method of Userownskills model to return null
      Userownskills.findOne.mockResolvedValue(null);

      const req = { params: { id: mockUserId } };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await userownskillsController.getAUserOwnSkills(req, res);
    });

    it('should handle errors and return a 500 status code', async () => {
      const mockUserId = 'validUserId';


      const req = { params: { id: mockUserId } };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await userownskillsController.getAUserOwnSkills(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

});
