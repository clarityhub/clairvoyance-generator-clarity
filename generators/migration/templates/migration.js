module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      '<%= tableName %>',
      {
        // XXX
      }
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('<%= tableName %>');
  },
};
