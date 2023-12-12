import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_DATABASE, // database name
    process.env.DB_USER, // username
    process.env.DB_PASSWD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
)


export { sequelize }