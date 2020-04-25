import { factory } from 'factory-girl';
import { Application } from 'egg';

export default (app: Application) => {
    app.factory = factory;
};
