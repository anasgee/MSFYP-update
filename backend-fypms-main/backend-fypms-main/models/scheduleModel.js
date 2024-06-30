// const mongoose = require('mongoose');

// const scheduleSchema = new mongoose.Schema({
//     teacher: {
//         type: String,
//         required: true
//     },
//     availability: {
//         type: Map,
//         of: Boolean,
//         default: {
//             "Monday": false,
//             "Tuesday": false,
//             "Wednesday": false,
//             "Thursday": false,
//             "Friday": false,
//             "Saturday": false,
//             "Sunday": false
//         }
//     }
// });

// const Schedule = mongoose.model('Schedule', scheduleSchema);

// module.exports = Schedule;


// const mongoose = require('mongoose');

// const scheduleSchema = new mongoose.Schema({
//     teacher: {
//         type: String,
//         required: true
//     },
//     availability: {
//         type: Object,
//         required: true
//     }
// });

// const Schedule = mongoose.model('Schedule', scheduleSchema);

// module.exports = Schedule;


const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    startTime: String,
    endTime: String,
    available: Boolean
});

const scheduleSchema = new mongoose.Schema({
    teacher: { type: String, required: true },
    availability: {
        Monday: availabilitySchema,
        Tuesday: availabilitySchema,
        Wednesday: availabilitySchema,
        Thursday: availabilitySchema,
        Friday: availabilitySchema,
        Saturday: availabilitySchema,
        Sunday: availabilitySchema
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
