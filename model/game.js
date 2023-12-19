import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
     {
          game_type: {
               required: true,
               type: String,
               trim: true,
               required: [true, "game_type is required."],
               enum: ["LUDO", "SNAKE_LADDER"]
          },
          players: [
               {
                    score: {
                         type: Number,
                         default: 0
                    },
                    id: {
                         type: Number,
                         required: [true, "player.id is required."]
                    }
               }
          ],
          has_ended: {
               type: Boolean,
               default: false
          },
          winner_player_id: {
               type: Number
          }
     },
     { minimize: false, timestamps: true }
);

const gameModel = mongoose.model("game", gameSchema);

export default gameModel;
