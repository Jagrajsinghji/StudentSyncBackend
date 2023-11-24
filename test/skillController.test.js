const request = require('supertest');
const express = require('express');
const app = express();

// Import the skill model and controller
const Skill = require('../models/skills');
const skillController = require('../controllers/skillController');

// Mocking the Skill model methods
jest.mock('../models/skills', () => ({
  find: jest.fn(),
}));

// Mocking the response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// Define your test
describe('Skill Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all skills successfully', async () => {
    // Mocking the data to be returned by the Skill model
    const mockSkills = [{ name: 'Skill1' }, { name: 'Skill2' }];
    Skill.find.mockResolvedValue(mockSkills);

    // Mocking the request and response objects
    const req = {};
    const res = mockResponse();

    // Calling the controller method
    await skillController.getAllSkills(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockSkills);
    expect(Skill.find).toHaveBeenCalled();
  });

  it('should handle errors when getting skills', async () => {
    // Mocking an error thrown by the Skill model
    const mockError = new Error('Database error');
    Skill.find.mockRejectedValue(mockError);

    // Mocking the request and response objects
    const req = {};
    const res = mockResponse();

    // Calling the controller method
    await skillController.getAllSkills(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(mockError);
    expect(Skill.find).toHaveBeenCalled();
  });
});

// Optional: If you want to test the route using supertest
describe('Skill Controller Integration Test', () => {
  it('should get all skills through the route', async () => {
    // Mocking the data to be returned by the Skill model
    const mockSkills = [{ name: 'Skill1' }, { name: 'Skill2' }];
    Skill.find.mockResolvedValue(mockSkills);

    // Define your route
    app.get('/skills', skillController.getAllSkills);

    // Make a request to the route using supertest
    const response = await request(app).get('/skills');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSkills);
  });
});