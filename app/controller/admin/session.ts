import { Controller } from 'egg';

export default class AdminSession extends Controller {
  public async sighIn() {
    const { username, password } = this.ctx.params;
    this.ctx.body = await this.ctx.service.admin.login(username, password);
  }

  public async current() {
    this.ctx.body = await this.ctx.service.admin.current();
  }

  public async refreshToken() {
    this.ctx.body = await this.ctx.service.admin.refreshToken();
  }
}