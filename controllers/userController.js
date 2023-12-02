const {user} = require('../models');
const userController = {

    async getAllUsers(req, res) {
        try {
            const userData = await user.find();
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async getUserById(req, res) {   
        try {
            const userData = await user.findById(req.params.userId);
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const userData = await user.create(req.body);
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {

        try {
            const userData = await user.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const userData = await user.findByIdAndDelete(req.params.userId);
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const userData = await user.findByIdAndUpdate(req.params.userId, { $push: { friends: req.params.friendId } }, { new: true });
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const userData = await user.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

};

module.exports = userController;