import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const SequelizeDB: () => { getInstance: () => Sequelize } = () => {
    const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
        process.env;

    let instance: Sequelize;
    const sequelizeOptions: SequelizeOptions = {
        host: "postgres",
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

export const sequelize = () => SequelizeDB().getInstance();
