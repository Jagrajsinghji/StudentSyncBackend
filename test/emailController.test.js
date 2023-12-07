// const userdetailsController = require('../controllers/userdetailsController');
// const Userdetails = require('../models/userdetails');
// const bcrypt = require('bcrypt');

// jest.mock('../models/userdetails');
// jest.mock('bcrypt');

// describe('Userdetails Controller Tests', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should log in a user successfully', async () => {
//     const mockUser = {
//       email: 'testuser@example.com',
//       password: 'hashedPassword',
//     };

//     Userdetails.findOne.mockResolvedValue(mockUser);
//     bcrypt.compare.mockResolvedValue(true); // Simulating a successful password comparison

//     const req = {
//       body: {
//         email: 'testuser@example.com',
//         password: 'userPassword',
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };

//     await userdetailsController.loginuser(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.send).toHaveBeenCalledWith(mockUser);
//     expect(Userdetails.findOne).toHaveBeenCalledWith({ email: 'testuser@example.com' });
//     expect(bcrypt.compare).toHaveBeenCalledWith('userPassword', 'hashedPassword');
//   });

//   it('should handle login with invalid password', async () => {
//     const mockUser = {
//       email: 'testuser@example.com',
//       password: 'hashedPassword',
//     };

//     Userdetails.findOne.mockResolvedValue(mockUser);
//     bcrypt.compare.mockResolvedValue(false); // Simulating an unsuccessful password comparison

//     const req = {
//       body: {
//         email: 'testuser@example.com',
//         password: 'wrongPassword',
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };

//     await userdetailsController.loginuser(req, res);

//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.send).toHaveBeenCalledWith('Invalid password');
//   });

//   it('should handle login with non-existing user', async () => {
//     Userdetails.findOne.mockResolvedValue(null);

//     const req = {
//       body: {
//         email: 'nonexistinguser@example.com',
//         password: 'somePassword',
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };

//     await userdetailsController.loginuser(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.send).toHaveBeenCalledWith('User does not exist!');
//   });

//   it('should handle error during login', async () => {
//     const errorMessage = 'Some error during login';
//     Userdetails.findOne.mockRejectedValue(new Error(errorMessage));

//     const req = {
//       body: {
//         email: 'testuser@example.com',
//         password: 'userPassword',
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };

//     await userdetailsController.loginuser(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
    
//   });
// });
