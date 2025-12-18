const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: String,
    email: { type: String, unique: true },
    password: String,
    guapBalance: { type: Number, default: 0 },

    // avatar
    Avatar: {
        male: {
            arrayOfAvatar: Array,
            accessories: Object
        },
        female: {
            arrayOfAvatar: Array,
            accessories: Object
        }
    },

    // locations user owns
    Location: [
        {
            mapId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            isLocked: Boolean,
        }
    ],

    // user accessories inventory
    Accessories: [
        {
            accessoriesId: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            type: { type: String, required: true },
            isLocked: { type: Boolean, default: false }
        }
    ],
});

// Hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
