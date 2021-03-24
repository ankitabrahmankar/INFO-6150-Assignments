/** 
 * require mongoose
 */
import mongoose from 'mongoose';
/**
 * schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
const TodoSchema = new mongoose.Schema(
    {
        /**
         * Title of todo.
         */
        title: {
            type: String,
            required: "Title is a required property."
        },
        /**
         * Description of todo
         */
        description: {
            type: String
        },
        /**
         * Creation date of todo
         */
        createdDate: {
            type: Date,
            default: Date.now
        },
         /**
         * Last modified date of todo
         */
        lastModifiedDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
);

// Duplicate the id field as mongoose returns _id field instead of id.
TodoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

TodoSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('Todo', TodoSchema);

export default model;