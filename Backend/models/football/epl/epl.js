import mongoose from "mongoose";

const differentTeamSchema = new mongoose.Schema({
  awayName: String,
  homeName: String,
  shotsOnTargetHome: Number,
  shotsOnTargetAway: Number,
  goalHome: Number,
  goalAway: Number,
  cornorHome: Number,
  cornorAway: Number,
});

const eplSchema = new mongoose.Schema({
  league: { type: String },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  teamID: { type: Number, required: true },

  matches: [differentTeamSchema],
});

const eplModel = mongoose.model("EPL", eplSchema);

export default eplModel;
