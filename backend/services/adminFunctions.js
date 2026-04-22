const UserModel = require("../models/user");
const tool = require("./tool");

const trainerRegister = async (req, res, next) => {
    const _id = req.body._id || null;
    if (req.user.type === 'ADMIN') {
        req.check('name', `Invalid name`).notEmpty();
        if (_id == null) {
            req.check('password', 'Invalid password').isLength({ min: 5, max: 100 });
            req.check('emailid', ` Invalid email address`).isEmail().notEmpty();
        }
        req.check('contact', 'Invalid contact number').isLength({ min: 13, max: 13 }).isNumeric({ no_symbols: false });
        const errors = req.validationErrors();
        if (errors) {
            return res.json({
                success: false,
                message: 'Invalid inputs: ' + errors.map(e => e.msg).join(', '),
                errors: errors
            });
        }

        const { name, password, emailid, contact } = req.body;

        try {
            if (_id != null) {
                await UserModel.findOneAndUpdate(
                    { _id: _id, status: 1 },
                    { name: name, contact: contact }
                );
                return res.json({
                    success: true,
                    message: `Trainer's Profile updated successfully!`
                });
            } else {
                const existingUser = await UserModel.findOne({ 'emailid': emailid, status: 1 });
                if (existingUser) {
                    return res.json({
                        success: false,
                        message: `This id already exists!`
                    });
                }

                const hash = await tool.hashPassword(password);
                const tempdata = new UserModel({
                    name: name,
                    password: hash,
                    emailid: emailid,
                    contact: contact,
                    createdBy: req.user._id
                });
                await tempdata.save();
                return res.json({
                    success: true,
                    message: `Trainer's Profile created successfully!`
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: _id != null ? "Unable to update Trainer's Profile" : "Unable to create Trainer's Profile"
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        });
    }
};

const removeTrainer = async (req, res, next) => {
    if (req.user.type === 'ADMIN') {
        const _id = req.body._id;
        try {
            await UserModel.findOneAndUpdate({ _id: _id }, { status: 0 });
            return res.json({
                success: true,
                message: "Account has been removed"
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Unable to remove account"
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        });
    }
};

const getAllTrainers = async (req, res, next) => {
    if (req.user.type === 'ADMIN') {
        try {
            const info = await UserModel.find(
                { type: 'TRAINER', status: 1 },
                { password: 0, type: 0, createdBy: 0, status: 0 }
            );
            return res.json({
                success: true,
                message: `Success`,
                data: info
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Unable to fetch data"
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        });
    }
};

const getSingleTrainer = async (req, res, next) => {
    if (req.user.type === 'ADMIN') {
        const _id = req.params._id;
        try {
            const info = await UserModel.find(
                { _id: _id, status: 1 },
                { password: 0, type: 0, createdBy: 0, status: 0 }
            );
            if (info.length === 0) {
                return res.json({
                    success: false,
                    message: `This account doesn't exist!`,
                });
            }
            return res.json({
                success: true,
                message: `Success`,
                data: info
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Unable to fetch data"
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        });
    }
};

module.exports = { trainerRegister, getAllTrainers, getSingleTrainer, removeTrainer };