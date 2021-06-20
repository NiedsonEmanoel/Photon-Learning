const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    idCoursesRegistered: {
        type: Array,
        default: []
    },
    idCoursesAdmin: {
        type: Array,
        default: []
    },
    address: {
        street: {
            type: String,
            required: true
        },
        complement: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
    },
}, {
    timestamps: true
});

TeacherSchema.pre('save', function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

TeacherSchema.pre('findOneAndUpdate', function (next) {
    var passworda = this.getUpdate().password + '';
    if (passworda.length < 55) {
        this.getUpdate().password = bcrypt.hashSync(passworda, 10);
    }
    next();
});

TeacherSchema.methods.isCorrectPassword = function (passworda, callback) {
    bcrypt.compare(passworda, this.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    })
}

module.exports = TeacherSchema;