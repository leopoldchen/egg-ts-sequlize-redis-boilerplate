// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/service/admin';

declare module 'egg' {
  interface IService {
    admin: ExportAdmin;
  }
}
