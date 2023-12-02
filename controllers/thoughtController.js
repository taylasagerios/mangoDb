const{ user, thought } = require('../models');
const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thoughtData = await Thought.findById(req.params.thoughtId);
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }

    },

    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thoughtData._id } }, { new: true });
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },


    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true, runValidators: true });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;