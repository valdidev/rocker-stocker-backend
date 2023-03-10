const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');

// only admin or user involved
const getUserProfileByIdController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);

    let userBody = req.body;

    try {
        const { userId } = req.params;

        const userFounded = await models.user.findOne({
            where: {
                id: userId
            }
        });

        if (!userFounded) {
            res.status(404).json({ message: 'User not found', success: false });
            return;
        }

        if (userFounded.email !== payload.email && payload.rolId !== 1) {
            res.status(401).json({ message: "You cannot see other profiles", success: false });
            return;
        }

        res.status(200).json({ message: `User founded`, data: userFounded, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

const modifyUserProfileController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);

    let userBody = req.body;

    if (userBody.email !== payload.email && payload.rolId !== 1) {
        res.status(401).json({ message: "You cannot modify other profiles", success: false });
        return;
    }

    try {

        await models.user.update({
            name: userBody.name,
            surname: userBody.surname,
            phone: userBody.phone
        }, { where: { email: userBody.email } });

        const secret = process.env.JWT_SECRET || '';

        if (secret.length < 10) {
            throw new Error("JWT_SECRET is not set");
        }

        res.status(200).json({ message: "Data modified successfully", success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};
////////////

// only admin
const getAllUsersController = async (req, res) => {
    try {
        const usersFounded = await models.user.findAll();

        if (!usersFounded) {
            res.status(404).json({ message: 'Users not found', success: false });
            return;
        }

        usersFounded.forEach(user => {
            user.password = '-hidden-'
        });

        res.status(200).json({ message: 'Users founded', data: usersFounded, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
}

const toggleAdminRoleController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    try {
        const { userId } = req.body;

        const userFounded = await models.user.findByPk(userId);

        if (!userFounded) {
            res.status(404).json({ message: 'User not found', success: false });
            return;
        }

        if (userFounded.id === payload.userId) {
            res.status(401).json({ message: 'You cannot alter your role yourself', success: false });
            return;
        }

        if (userFounded.rolId === 1) {
            await userFounded.update({
                rolId: 2
            });
            res.status(200).json({ message: `${userFounded.email} demoted to USER role`, success: true });
            return;
        } else {
            await userFounded.update({
                rolId: 1
            });
            res.status(200).json({ message: `${userFounded.email} promoted to ADMIN role`, success: true });
            return;
        }


    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

const toggleUserActiveController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);

    try {
        const { userId } = req.params;

        const userFounded = await models.user.findByPk(userId);

        if (!userFounded) {
            res.status(404).json({ message: 'User not found', success: false });
            return;
        }

        if (userFounded.id === payload.userId) {
            res.status(401).json({ message: 'You cannot inactivate yourself', success: false });
            return;
        }

        await userFounded.update({
            isActive: !userFounded.isActive
        });

        let activityStatus = (userFounded.isActive) ? "active" : "inactive";

        res.status(200).json({ message: `User ${userFounded.email} modified to ${activityStatus}`, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

const deleteUserController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);

    try {
        const { userId } = req.params;

        const userFounded = await models.user.findByPk(userId);

        if (!userFounded) {
            res.status(404).json({ message: 'User not found', success: false });
            return;
        }

        if (userFounded.id === payload.userId) {
            res.status(401).json({ message: 'You cannot delete yourself', success: false });
            return;
        }

        await userFounded.destroy();

        res.status(200).json({ message: `User ${userFounded.email} deleted successfully`, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};
////////////


module.exports = {
    toggleAdminRoleController,
    getAllUsersController,
    modifyUserProfileController,
    toggleUserActiveController,
    deleteUserController,
    getUserProfileByIdController
};