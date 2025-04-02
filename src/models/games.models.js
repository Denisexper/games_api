import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
    image: {
        type: String,
        required: false,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        enum: ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes', 'Carreras', 'Puzzle', 'Shooter'],
      },
    platform: {
        type: [String], // Permite varias plataformas
        required: true,
        enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'],
      },
    releaseDate: {
        type: Date,
        required: true,
      },
    developer: {
        type: String,
        required: true,
        trim: true,
      },
    publisher: {
        type: String,
        trim: true,
      },
    price: {
        type: Number,
        required: true,
        min: 0,
      },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
      },
    multiplayer: {
        type: Boolean,
        default: false,
      },
    description: {
        type: String,
        trim: true,
      },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const game = mongoose.model("game", gamesSchema)
export default game;