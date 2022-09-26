const bcrypt = require('bcryptjs')
require('dotenv').config()

const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    auth: async (req, res) => {
        const {username, firstName, lastName, password} = req.body

        const [[user]] = await sequelize.query(`
            SELECT * FROM users
            WHERE username = '${username}'
        `)
        console.log(user)

        if(user){
            // console.log("it's a login")

            const authenticated = bcrypt.compareSync(password, user.password)
            if(authenticated){
                const userInfo = {username: user.username, firstName: user.first_name, lastName: user.lastName, userId: user.user_id}
                req.session.user = userInfo
                console.log(req.session.userInfo)
                res.status(200).send(userInfo)

            } else {
                res.status(401).send('wrong password')
            }
        } else if(!user && firstName && lastName){

            // console.log("it's a register")
            const salt = bcrypt.genSaltSync(5)
            const passHash = bcrypt.hashSync(password, salt)

            const [[newUser]] = await sequelize.query(`
            INSERT INTO users ( username, first_name, last_name, password ) 
            VALUES ( '${username}', '${firstName}', '${lastName}', '${passHash}' )
            RETURNING user_id, username, first_name, last_name;
            `)

            // console.log(newUser)
            req.session.user = newUser
            console.log('register', req.session.userInfo)
            res.status(200).send(newUser)
        } else {
            res.status(500).send('please use the register page to create an account')
        }
    },
    deleteUser: async (req, res) => {
        const {id} = req.params

        await sequelize.query(`
            DELETE FROM users
            WHERE user_id = '${id}'
        `)

        res.status(200).send('user deleted successfully. ')
    },
    checkUser: (req, res) => {
        console.log("check user", req.session)
        if(req.session.user){
            res.status(200).send(req.session.user)
        } 
        res.sendStatus(200)
    },
}