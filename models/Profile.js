const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  avatar: {
    type: String,
  },
  band: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  instruments: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  experience: [
    {
      title: {
        type: String,
      },
      band: {
        type: String,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    spotify: {
      type: String,
    },
    instagram: {
      type: String,
    },
    soundcloud: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
