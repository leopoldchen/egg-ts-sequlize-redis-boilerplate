// This file is created by egg-ts-helper@1.25.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportAdminSession from '../../../app/controller/admin/session';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    admin: {
      session: ExportAdminSession;
    }
  }
}