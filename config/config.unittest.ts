import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};

    // change to your own sequelize configurations
    config.sequelize = {
        dialect: 'mysql',
        database: 'demo_test',
    };

    return config;
};
