import * as bcrypt from 'bcryptjs';
import * as Sequelize from 'sequelize';
import { Application } from 'egg';

const { BIGINT, STRING, DATE } = Sequelize;

interface IAdmin {
  id?: number;
  username?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IAdminInstance extends IAdmin, Sequelize.Instance<IAdmin> {
}

const schema = {
  id: {
    type: BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: STRING(64),
    unique: true,
    allowNull: false,
  },

  password: {
    type: STRING(64),
    allowNull: false,
  },

  createdAt: {
    type: DATE,
    allowNull: false,
  },

  updatedAt: {
    type: DATE,
    allowNull: false,
  }
};

const schemaOption = {
  underscored: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_bin',
}

export default (app: Application) => {
  const Model = app.model.define<IAdminInstance, IAdmin>(
    'admins',
    schema,
    schemaOption
  );

  Model.hook('beforeCreate', admin => {
    if (admin.password) {
      admin.password = bcrypt.hashSync(admin.password);
    }
  });

  Model.hook('beforeUpdate', admin => {
    if (admin.password) {
      admin.password = bcrypt.hashSync(admin.password);
    }
  });

  return Model;
};
