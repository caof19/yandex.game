import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    DB_HOSTNAME,
} = process.env;

const SequelizeDB: () => { getInstance: () => Sequelize } = () => {
    let instance: Sequelize;
    const sequelizeOptions: SequelizeOptions = {
        host: DB_HOSTNAME,
        port: Number(POSTGRES_PORT),
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        dialect: "postgres",
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = new Sequelize(sequelizeOptions);
            }
            return instance;
        },
    };
};

export const sequelize = SequelizeDB().getInstance();
