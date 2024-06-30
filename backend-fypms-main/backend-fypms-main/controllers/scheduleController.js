const Schedule = require('../models/scheduleModel');

// Create Schedule
exports.createSchedule = async (req, res) => {
    try {
        const { teacher, availability } = req.body;
        const newSchedule = await Schedule.create({ teacher, availability });
        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Schedule
exports.updateSchedule = async (req, res) => {
    try {
        const { teacher } = req.params;
        const { availability } = req.body;
        const updatedSchedule = await Schedule.findOneAndUpdate({ teacher }, { availability }, { new: true });
        res.json(updatedSchedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Schedule
exports.deleteSchedule = async (req, res) => {
    try {
        const { teacher } = req.params;
        await Schedule.findOneAndDelete({ teacher });
        res.json({ message: 'Schedule deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
