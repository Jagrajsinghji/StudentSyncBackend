// const { getAllInstitutions } = require('../controllers/institutionController');
// const Institution = require('../models/institutions');

// jest.mock('../models/institutions');

// describe('GET /instututions', () => {
//   it('should get all institutions', async () => {
//     // Mock the Institution.find() method
//     Institution.find.mockResolvedValue(['Institution1', 'Institution2']);

//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };

//     // Call the function
//     await getAllInstitutions(req, res);

//     // Assertions
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.send).toHaveBeenCalledWith(['Institution1', 'Institution2']);
//   });

//   it('should handle errors and return 500 status', async () => {
//     // Mock the Institution.find() method to throw an error
//     Institution.find.mockRejectedValue(new Error('Mocked error'));

//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };

//     // Call the function
//     await getAllInstitutions(req, res);

//     // Assertions
//     expect(res.status).toHaveBeenCalledWith(500);
//     // Add more specific assertions based on your error handling logic
//   });
// });
