export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Reactions", {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
      },
      emoji: {
          type: Sequelize.STRING,
      },
      author: {
          type: Sequelize.STRING,
      },
      topic_id: {
          type: Sequelize.INTEGER,
          references: { model: "Topics", key: "id" },
      }
  });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("Reactions");
}
