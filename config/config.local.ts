import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};

    // change to your own sequelize configurations
    config.sequelize = {
        dialect: 'mysql',
        database: 'demo_dev',
    };

    config.redis = {
        client: {
            host: '127.0.0.1',
            port: 6379,
            password: '',
            db: 0,
        },
        agent: true,
    };

    return config;
};
