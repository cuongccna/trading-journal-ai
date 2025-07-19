import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Trade = sequelize.define('Trade', {
  symbol: DataTypes.STRING,
  side: DataTypes.STRING,
  quantity: DataTypes.FLOAT,
  entryPrice: DataTypes.FLOAT,
  exitPrice: DataTypes.FLOAT,
  entryTime: DataTypes.DATE,
  exitTime: DataTypes.DATE,
  userId: DataTypes.INTEGER,
});

export default Trade;