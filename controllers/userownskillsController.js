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

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Post /userownskills/add/:id
// exports.addAUserOwnSkills = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const skillId = req.body.ownSkills;

//         // Check if a userownskills document exists for the given userId
//         const userownskills = await Userownskills.findOne({ userId });

//         if (userownskills) {
//             console.log("user exist !");
//             // If userownskills document exists, check if the skillId is already in the ownSkills array
//             console.log(skillId);
//             console.log(userownskills);
//             if (userownskills.ownSkills.includes(skillId)) {
//                 // Skill already exists, return an error
//                 return res.status(400).json({ message: 'Skill already exists in userownskills.' });
//             } else {
//                 // Skill doesn't exist, add it to the ownSkills array
//                 console.log(skillId);
//                 userownskills.ownSkills.push(skillId);
//                 console.log(userownskills);
//                 await userownskills.save();
//                 res.status(200).json({ message: 'Skill added to userownskills.' });
//             }
//         } else {
//             // If userownskills document doesn't exist, create a new one with the provided userId and skill
//             const newUserownskills = new Userownskills({
//                 userId,
//                 ownSkills: [skillId],
//             });

//             await newUserownskills.save();
//             res.status(201).json({ message: 'Userownskills created with the skill.' });
//         }
//     } catch (error) {
//       if (error.name === 'CastError') {
//         return res.status(400).send('Invalid format. Check your request Id value. ');
//       }
//         res.status(500).send(error);
//     }
// };
exports.addAUserOwnSkills = async (req, res) => {
  try {
    const userId = req.params.id;
    const ownSkills = req.body.ownSkills;

    //check whether user exits
    const existingUserownskills = await Userownskills.findOne({userId});
    if(!existingUserownskills){
      //create new record
      // Convert string ownSkills to ObjectId instances
      const objectIdSkills = ownSkills.map(skill => skill);
      const existingUserownskills = new Userownskills({
          userId,
          ownSkills: objectIdSkills,
      });
      await existingUserownskills.save();
      return res.status(200).json({ message: 'Userownskills created with the skill.' });
    }

    // Use findOneAndUpdate with the upsert option
    const result = await Userownskills.findOneAndUpdate(
      { userId },
      { $set: { ownSkills }  },
      { upsert: true, new: true } // upsert: true enables insert if the document doesn't exist, new: true returns the modified document
    );

    return res.status(201).json({ message: 'Userownskills updated with the skill.' });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send('Invalid format. Check your request Id value. ');
    }
    return res.status(500).send(error);
  }
};