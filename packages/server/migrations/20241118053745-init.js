export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable("Topics", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING,
        },
        text: {
            type: Sequelize.STRING,
        },
        author: {
            type: Sequelize.STRING,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    });
    await queryInterface.createTable("Comments", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        text: {
            type: Sequelize.STRING,
        },
        author: {
            type: Sequelize.STRING,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        topic_id: {
            type: Sequelize.INTEGER,
            references: { model: "Topics", key: "id" },
        },
    });
    await queryInterface.createTable("Replies", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        text: {
            type: Sequelize.STRING,
        },
        author: {
            type: Sequelize.STRING,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        topic_id: {
            type: Sequelize.INTEGER,
            references: { model: "Topics", key: "id" },
        },
        comment_id: {
            type: Sequelize.INTEGER,
            references: { model: "Comments", key: "id" },
        },
    });
}
export async function down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("Replies");
    await queryInterface.dropTable("Comments");
    await queryInterface.dropTable("Topics");
}
