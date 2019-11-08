import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;

    router.get('/', controller.home.index);

    router.post('/admin/login', controller.admin.session.sighIn);
    router.post('/admin/logout', controller.admin.session.sighOut);
    router.get('/admin/current', controller.admin.session.current);

    router.post('/admin/:resources/search', controller.admin.resource.search);
    router.delete('/admin/:resources/destroyAll', controller.admin.resource.destroyAll);
    router.resources('/admin/:resources', '/admin/:resources', controller.admin.resource);
};
