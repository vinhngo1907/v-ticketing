const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    email: { type: String, unique: true, required: true, },
    fullname: { type: String, trim: true, maxLength: 25 },
    password: { type: String, required: true, },
    salt: String,
    phone: String,
    address: [{ type: Schema.Types.ObjectId, ref: 'address', require: true }],
    role: { type: String, default: 'member' }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
})

module.exports = mongoose.model("customer", CustomerSchema)