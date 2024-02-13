const mongoose = require("mongoose");

const OneToOneMessageSchema = new mongoose.Schema(
    {
        participants: [{
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("OneToOneMessage", OneToOneMessageSchema);