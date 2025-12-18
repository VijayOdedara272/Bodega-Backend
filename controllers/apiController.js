//const GameSave = require('../models/GameSave');
const { success, error } = require('../utils/response');

// GET /api/profile
exports.profile = async (req, res) => {
  try {
    const user = req.currentUser;
    return success(res, { user }, 'Profile fetched', 200);
  } catch (err) {
    console.error(err);
    return error(res, 'Failed to get profile', 500);
  }
};

// POST /api/game/save
// body: { key: "slot_1", payload: {...} }
// exports.saveGame = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { key, payload } = req.body;
//     if (!key) return error(res, 'key is required', 400);

//     const doc = await GameSave.findOneAndUpdate(
//       { user: userId, key },
//       { payload, updatedAt: new Date() },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     return success(res, { save: doc }, 'Saved', 200);
//   } catch (err) {
//     console.error(err);
//     return error(res, 'Failed to save', 500);
//   }
// };

// // GET /api/game/load?key=slot_1
// exports.loadGame = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const key = req.query.key;
//     if (!key) return error(res, 'key is required', 400);

//     const doc = await GameSave.findOne({ user: userId, key });
//     return success(res, { save: doc ? doc.payload : null }, 'Loaded', 200);
//   } catch (err) {
//     console.error(err);
//     return error(res, 'Failed to load', 500);
//   }
// };
