// This file is created by egg-ts-helper@1.25.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/Test';
import ExportAdmin from '../../../app/service/admin';

declare module 'egg' {
  interface IService {
    test: ExportTest;
    admin: ExportAdmin;
  }
}
