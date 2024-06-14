const { DataTypes } = require('sequelize');
const sequelize = require('../../db'); // Configuração do Sequelize

const QuizQuestion = sequelize.define('quiz_question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  option_a: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  option_b: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  option_c: {
    type: DataTypes.TEXT
  },
  option_d: {
    type: DataTypes.TEXT
  },
  correct_option: {
    type: DataTypes.STRING(1),
    allowNull: false
  }
});

module.exports = QuizQuestion;
