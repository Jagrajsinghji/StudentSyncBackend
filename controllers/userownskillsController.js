const Userownskills = require('../models/userownskills');
const Skills = require('../models/skills');

// GET /userownskills/:id
exports.getAUserOwnSkills = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the Userownskills document that matches the specified userId
    const userownskills = await Userownskills.findOne({ userId })
      .populate({ path: 'ownSkills', model: Skills, select: 'name' })
      .exec();

    if (!userownskills) {
      return res.status(404).send('User does not have any own skills.');
    }

    // Extract the desired fields (userId and name)
    const result = {
      userId: userownskills.userId,
      ownSkills: userownskills.ownSkills.map(skill => skill?.name),
    };

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Post /userownskills/add/:id
exports.addAUserOwnSkills = async (req, res) => {
    try {
        const userId = req.params.id;
        const skillId = req.body.ownSkills;

        // Check if a userownskills document exists for the given userId
        const userownskills = await Userownskills.findOne({ userId });

        if (userownskills) {
            console.log("user exist !");
            // If userownskills document exists, check if the skillId is already in the ownSkills array
            console.log(skillId);
            console.log(userownskills);
            if (userownskills.ownSkills.includes(skillId)) {
                // Skill already exists, return an error
                return res.status(400).json({ message: 'Skill already exists in userownskills.' });
            } else {
                // Skill doesn't exist, add it to the ownSkills array
                console.log(skillId);
                userownskills.ownSkills.push(skillId);
                console.log(userownskills);
                await userownskills.save();
                res.status(200).json({ message: 'Skill added to userownskills.' });
            }
        } else {
            // If userownskills document doesn't exist, create a new one with the provided userId and skill
            const newUserownskills = new Userownskills({
                userId,
                ownSkills: [skillId],
            });

            await newUserownskills.save();
            res.status(201).json({ message: 'Userownskills created with the skill.' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};