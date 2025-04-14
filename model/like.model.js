// models/like.model.ts
const {Schema,model,mongoose} = require('mongoose')

const likeSchema = new Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

likeSchema.index({ blogId: 1, userId: 1 }, { unique: true }); // Prevent duplicate likes

const Like = model('Like', likeSchema);

module.exports = Like;