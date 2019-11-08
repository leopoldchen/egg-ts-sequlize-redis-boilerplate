import * as Sequelize from 'sequelize';

export interface IAdmin extends Sequelize.Model {
    readonly id: number;
    username: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
