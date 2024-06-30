// const express = require('express');
// const Schedule = require('../models/scheduleModel.js');
// const router = express.Router();

// class HttpError extends Error {
//     constructor(message, errorCode) {
//         super(message);
//         this.code = errorCode;
//     }
// }

// // Add or update schedule
// router.post('/schedule', async (req, res, next) => {
//     try {
//         const { teacher, availability } = req.body;

//         let schedule = await Schedule.findOne({ teacher });
//         if (schedule) {
//             schedule.availability = availability;
//             await schedule.save();
//         } else {
//             schedule = new Schedule({ teacher, availability });
//             await schedule.save();
//         }

//         res.send(schedule);
//     } catch (error) {
//         next(new HttpError('Error adding or updating schedule', 500));
//     }
// });

// // Get schedule
// router.get('/schedule/:teacher', async (req, res, next) => {
//     try {
//         const teacher = req.params.teacher;
//         const schedule = await Schedule.findOne({ teacher });

//         if (!schedule) {
//             throw new HttpError('Schedule not found', 404);
//         }

//         res.send(schedule);
//     } catch (error) {
//         next(error);
//     }
// });

// // Update schedule
// router.put('/schedule/:teacher', async (req, res, next) => {
//     try {
//         const { teacher, availability } = req.body;

//         let schedule = await Schedule.findOne({ teacher });
//         if (!schedule) {
//             throw new HttpError('Schedule not found', 404);
//         }

//         schedule.availability = availability;
//         await schedule.save();
//         res.send(schedule);
//     } catch (error) {
//         next(error);
//     }
// });

// // Delete schedule
// router.delete('/schedule/:teacher', async (req, res, next) => {
//     try {
//         const teacher = req.params.teacher;
//         const schedule = await Schedule.findOneAndDelete({ teacher });

//         if (!schedule) {
//             throw new HttpError('Schedule not found', 404);
//         }

//         res.send({ message: 'Schedule deleted' });
//     } catch (error) {
//         next(error);
//     }
// });

// // Error handling middleware
// router.use((error, req, res, next) => {
//     if (res.headersSent) {
//         return next(error);
//     }
//     res.status(error.code || 500).send({ message: error.message || 'An unknown error occurred' });
// });

// module.exports = router;



const express = require('express');
const Schedule = require('../models/scheduleModel.js');
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js")

class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}

// Add or update schedule
router.post('/schedule', async (req, res, next) => {
    try {
        const { teacher, availability } = req.body;

        let schedule = await Schedule.findOne({ teacher });
        if (schedule) {
            schedule.availability = availability;
            await schedule.save();
        } else {
            schedule = new Schedule({ teacher, availability });
            await schedule.save();
        }

        res.send(schedule);
    } catch (error) {
        next(new HttpError('Error adding or updating schedule', 500));
    }
});

// Get schedule
router.get('/schedule/:teacher', async (req, res, next) => {
    try {
        const teacher = req.params.teacher;
        const schedule = await Schedule.findOne({ teacher });

        if (!schedule) {
            throw new HttpError('Schedule not found', 404);
        }

        res.send(schedule);
    } catch (error) {
        next(error);
    }
});
// router.put('/schedule/:userId', verifyToken, async (req, res, next) => {
//     try {
//         const teacherIdFromToken = req.user.id; // Assuming the user ID is stored in req.user
//         const requestedTeacherId = req.params.teacherId;

//         // Ensure the logged-in user is a teacher
//         if (req.user.role !== 'teacher') {
//             return res.status(403).json({ message: 'Forbidden. Only teachers can update availability.' });
//         }

//         // Ensure the logged-in teacher is updating their own availability
//         if (teacherIdFromToken !== requestedTeacherId) {
//             return res.status(403).json({ message: 'Forbidden. You can only update your own availability.' });
//         }

//         // Proceed with updating availability
//         // Your logic to update availability goes here

//         res.json({ message: 'Availability updated successfully.' });
//     } catch (error) {
//         next(error);
//     }
// });

// Update schedule
router.put('/schedule/:teacher', async (req, res, next) => {
    try {
        const { teacher, availability } = req.body;

        let schedule = await Schedule.findOne({ teacher });
        if (!schedule) {
            throw new HttpError('Schedule not found', 404);
        }

        schedule.availability = availability;
        await schedule.save();
        res.send(schedule);
    } catch (error) {
        next(error);
    }
});

// Delete schedule
router.delete('/schedule/:teacher', async (req, res, next) => {
    try {
        const teacher = req.params.teacher;
        const schedule = await Schedule.findOneAndDelete({ teacher });

        if (!schedule) {
            throw new HttpError('Schedule not found', 404);
        }

        res.send({ message: 'Schedule deleted' });
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
router.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500).send({ message: error.message || 'An unknown error occurred' });
});

module.exports = router;
