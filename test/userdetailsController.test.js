const userdetailsController = require('../controllers/userdetailsController');
const Userdetails = require('../models/userdetails');
const Userwantskills = require('../models/userwantskills');
const Userownskills = require('../models/userownskills');
const bcrypt = require('bcrypt');

jest.mock('../models/userdetails');
jest.mock('../models/userwantskills');
jest.mock('../models/userownskills');

describe('Userdetails Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all users successfully', async () => {
    const mockUsers = [{ name: 'User1' }, { name: 'User2' }];
    Userdetails.find.mockResolvedValue(mockUsers);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await userdetailsController.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockUsers);
    expect(Userdetails.find).toHaveBeenCalled();
  });

  it('should get a user by id successfully', async () => {
    const mockUser = { name: 'User1' };
    Userdetails.findById.mockResolvedValue(mockUser);

    const req = { params: { id: 'someUserId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await userdetailsController.getUser(req, res);

    expect(res.send).toHaveBeenCalledWith(mockUser);
    expect(Userdetails.findById).toHaveBeenCalledWith('someUserId');
  });


  it('should create a new user', async () => {
    const mockUser = { name: 'NewUser' };
    Userdetails.findOne.mockResolvedValue(null);
  
    // Update this line to correctly mock the save function
    Userdetails.prototype.save.mockResolvedValue(mockUser);
  
    const req = { body: { name: 'NewUser', email: 'newuser@example.com' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  
    await userdetailsController.createUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(201);
    expect(Userdetails.findOne).toHaveBeenCalled();
    expect(Userdetails.prototype.save).toHaveBeenCalled();
  });
  

  it('should update a user by id', async () => {
    const mockUser = { name: 'UpdatedUser' };
    const mockUserInstance = {
      ...mockUser,
      save: jest.fn().mockResolvedValue(mockUser),
    };
    
    Userdetails.findById.mockResolvedValue(mockUserInstance);
  
    const req = { params: { id: 'someUserId' }, body: { name: 'UpdatedUser' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  
    await userdetailsController.updateUser(req, res);
  
    expect(Userdetails.findById).toHaveBeenCalledWith('someUserId');
    expect(mockUserInstance.save).toHaveBeenCalled();
  });
  


  it('should get all users by skills successfully', async () => {
    // Mocking data for the test
    const mockUserId = 'someUserId';
    const mockUserWantskills = {
      userId: mockUserId,
      wantSkills: [{ _id: 'skillId1' }, { _id: 'skillId2' }],
    };
    const mockUsersWithSkills = [{ userId: 'otherUserId1' }, { userId: 'otherUserId2' }];
    const mockUsers = [{ _id: 'otherUserId1', name: 'User1' }, { _id: 'otherUserId2', name: 'User2' }];
  
    Userwantskills.findOne.mockResolvedValue(mockUserWantskills);
    Userownskills.find.mockResolvedValue(mockUsersWithSkills);
    Userdetails.find.mockResolvedValue(mockUsers);
  
    const req = { params: { id: mockUserId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await userdetailsController.getAllUsersBySkills(req, res);
  
    //expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.json).toHaveBeenCalledWith({ users: mockUsers });
    expect(Userwantskills.findOne).toHaveBeenCalledWith({ userId: mockUserId });
    // expect(Userownskills.find).toHaveBeenCalledWith({
    //   'ownSkills': { $in: ['skillId1', 'skillId2'] },
    //   '_id': { $ne: mockUserId },
    // });
    //expect(Userdetails.find).toHaveBeenCalledWith({ '_id': { $in: ['otherUserId1', 'otherUserId2'] } });
  });
  
  
    it('should create a new pre-user', async () => {
      const mockPreUser = { name: 'NewPreUser', user_status: '0' };
      Userdetails.findOne.mockResolvedValue(null);
      Userdetails.prototype.save.mockResolvedValue(mockPreUser);
  
      const req = { body: { email: 'newpreuser@example.com' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      await userdetailsController.createPreUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      //expect(res.send).toHaveBeenCalledWith(mockPreUser);
      expect(Userdetails.findOne).toHaveBeenCalled();
      expect(Userdetails.prototype.save).toHaveBeenCalled();
    });
  
    it('should log in a user successfully', async () => {
        const mockUser = {
          email: 'testuser@example.com',
          password: 'hashedPassword',
        };
    
        Userdetails.findOne.mockResolvedValue(mockUser);

        const req = {
          body: {
            email: 'testuser@example.com',
            password: 'userPassword',
          },
        };
    
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await userdetailsController.loginuser(req, res);

        expect(Userdetails.findOne).toHaveBeenCalledWith({ email: 'testuser@example.com' });
      });
    
  
    it('should handle login with invalid password', async () => {
      const mockUser = { email: 'existinguser@example.com', password: 'hashedPassword' };
      Userdetails.findOne.mockResolvedValue(mockUser);
  
      const req = { body: { email: 'existinguser@example.com', password: 'wrongPassword' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      await userdetailsController.loginuser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('Invalid password');
    });
  
    it('should handle login with non-existing user', async () => {
      Userdetails.findOne.mockResolvedValue(null);
  
      const req = { body: { email: 'nonexistinguser@example.com', password: 'somePassword' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      await userdetailsController.loginuser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('User does not exist!');
    });
  });
  
