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

const modifyUserProfileController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);


    if (req.body.email !== payload.email) {
        res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        let data = req.body;

        await models.user.update({
            name: data.name,
            surname: data.surname,
            phone: data.phone
        }, { where: { email: data.email } });

        const secret = process.env.JWT_SECRET || '';

        if (secret.length < 10) {
            throw new Error("JWT_SECRET is not set");
        }


        res.status(200).json({ message: "Data modified successfully" });


    } catch (error) {
        res.send(error)
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
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (userFounded.id === payload.userId) {
            res.status(401).json({ message: 'You cannot inactivate yourself' });
            return;
        }

        await userFounded.update({
            isActive: !userFounded.isActive
        });

        let activityStatus = (userFounded.isActive) ? "active" : "inactive";

        res.status(200).json({ message: `User ${userFounded.email} modified to ${activityStatus}` });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong: ", error });
    }
};

const deleteUserController = async (req, res) => {
    res.send('delete usser')
};



module.exports = {
    toggleAdminRoleController,
    getAllUsersController,
    modifyUserProfileController,
    toggleUserActiveController,
    deleteUserController
}