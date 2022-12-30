const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');

const getAllUsersController = async (req, res) => {
    try {
        const usersFounded = await models.user.findAll();

        if (!usersFounded) {
            res.status(404).json({ message: 'Users not found' });
            return;
        }

        usersFounded.forEach(user => {
            user.password = '-hidden-'
        });

        res.status(200).json({ message: 'Users founded', data: usersFounded });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

const toggleAdminRoleController = async (req, res) => {
    try {
        const { userId } = req.body;

        const userFounded = await models.user.findByPk(userId);

        if (!userFounded) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (userFounded.rolId === 1) {
            await userFounded.update({
                rolId: 2
            });
            res.status(200).json({ message: `${userFounded.email} demoted to USER rol` });
            return;
        } else {
            await userFounded.update({
                rolId: 1
            });
            res.status(200).json({ message: `${userFounded.email} promoted to ADMIN rol` });
            return;
        }


    } catch (error) {
        res.status(500).json({ message: "Something went wrong: ", error });
    }
};

module.exports = {
    toggleAdminRoleController,
    getAllUsersController
}