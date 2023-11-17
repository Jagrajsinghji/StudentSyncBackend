const Userwantskills = require('../models/userwantskills');
const Skills = require('../models/skills');

// GET /userwantskills/:id
exports.getAUserWantSkills = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the Userwantskills document that matches the specified userId
    const userwantskills = await Userwantskills.findOne({ userId })
      .populate({ path: 'wantSkills', model: Skills, select: 'name' })
      .exec();

    if (!userwantskills) {
      return res.status(404).send('User does not want to learn any skills.');
    }

    // Extract the desired fields (userId and name)
    const result = {
      userId: userwantskills.userId,
      wantSkills: userwantskills.wantSkills.map(skill => skill?.name),
    };

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Post /userwantskills/add/:id
exports.addAUserWantSkills = async (req, res) => {
    try {
        const userId = req.params.id;
        const skillIds = req.body.wantSkills;

        // Check if a userwantskills document exists for the given userId
        const userwantskills = await Userwantskills.findOne({ userId });

        if (userwantskills && skillIds && skillIds.length > 0) {
            // If userwantskills document exists and there is at least one skill in the request payload, 
            //check if the skillId is already in the wantSkills array
                
            // Convert string skillIds to ObjectId instances
            const objectIdSkills = skillIds.map(skill => skill);

            // Check if any of the objectIdSkills are already in wantSkills
            const skillExists = objectIdSkills.some(skill => userwantskills.wantSkills.includes(skill));

            if (skillExists) {
              return res.status(400).json({ message: 'One or more skills are already in userwantskills.' });
            }

            // All skill doesn't exist, add all skills to the wantSkills array 
            userwantskills.wantSkills = userwantskills.wantSkills.concat(objectIdSkills);
            await userwantskills.save();
            res.status(200).json({ message: 'Skill added to userwantskills.' });
        } else {
            // If userwantskills document doesn't exist, create a new one with the provided userId and skill
            const newUserwantskills = new Userwantskills({
                userId,
                wantSkills: [skillIds],
            });

            await newUserwantskills.save();
            res.status(201).json({ message: 'Userwantskills created with the skill.' });
        }
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).send('Invalid format. Check your request Id value. ');
      }
        res.status(500).send(error);
    }
};

// Delete /userwantskills/remove/:id
exports.deleteAUserWantSkills = async (req, res) => {
  try {
      const userId = req.params.id;
      const skillId = req.body.wantSkills;

      // Check if a userwantskills document exists for the given userId
      const userwantskills = await Userwantskills.findOne({ userId });

      if (userwantskills) {
          // If userwantskills document exists, check if the skillId is already in the wantSkills array
          const skillToRemoveIndex = userwantskills.wantSkills.findIndex(skill => skill.toString() === skillId[0].toString());

          if(skillToRemoveIndex !== -1){ //exist
            userwantskills.wantSkills.splice(skillToRemoveIndex, 1);

            await userwantskills.save();
            res.status(200).json({ message: 'Skill removed from userwantskills.' });
          }
          else{ //skill not exist
            return res.status(400).json({ message: 'Skill does not exist in userwantskills.' });
          }
          
      } else {
          return res.status(400).json({ message: 'User does not exist in userwantskills.' });
      }
  } catch (error) {
      res.status(500).send(error);
  }
};