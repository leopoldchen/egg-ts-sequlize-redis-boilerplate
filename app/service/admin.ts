import { Service } from 'egg';
import { v4 as uuid } from 'uuid';

const ADMIN_PREFIX = 'admin-token:';

export default class AdminService extends Service {
  async login(username: string, password: string) {
    const {
      ctx,
      service,
    } = this;
    const admin = await ctx.model.Admin.findOne({
      where: {
        username: username,
      },
    });
    if (!admin) {
      ctx.throw(404, 'admin not found');
      return;
    }

    const isValid = await ctx.compare(password, admin.password);
    if (!isValid) {
      ctx.throw(404, 'wrong password');
      return;
    }
    return await service.admin.applyToken(admin.id);
  }

  async applyToken(id) {
    const token: string = uuid().split('-').join('');
    const expire: number = 3600 * 24 * 10; // second
    const expireAt = Date.now() + expire * 1000 /* ms */;
    await this.ctx.app.redis.hset(ADMIN_PREFIX + token, 'id', id);
    await this.ctx.app.redis.hset(ADMIN_PREFIX + token, 'expireAt', expireAt);
    await this.ctx.app.redis.expire(ADMIN_PREFIX + token, expire);
    return { token, expireAt };
  }

  async refreshToken() {
    const {
      ctx,
    } = this;
    const admin = await ctx.service.admin.current();
    if (admin) {
      return ctx.service.admin.applyToken(admin.id);
    }
  }

  async logout() {
    const {
      ctx,
    } = this;
    const token = ctx.headers.token;
    await ctx.app.redis.hdel(ADMIN_PREFIX + token);
    return true;
  }

  async resetPassword(values) {
    const {
      ctx,
    } = this;
    const admin = await ctx.service.admin.current();
    if (admin) {
      const verifyPsw = await ctx.compare(values.oldPassword, admin.password);
      if (!verifyPsw) {
        ctx.throw(404, 'admin password error');
      } else {
        admin.update(values, {individualHooks: true});
      }
    }
  }

  async resetUserInfo(values) {
    const {
      ctx,
    } = this;
    const admin = await ctx.service.admin.current();
    if (admin) return admin.update(values, {individualHooks: true});
  }

  async current() {
    const {
      ctx,
    } = this;
    const token: string = ctx.headers.token;
    if(!token) {
      ctx.throw(404, 'Missing user token');
    }
    const _id = await ctx.app.redis.hget(ADMIN_PREFIX + token, 'id');
    if (!_id) {
      ctx.throw(404, 'invalid token');
    }
    const admin = await ctx.model.Admin.findOne({
      where: {
        id: _id,
      },
    });
    if (!admin) {
      ctx.throw(404, 'admin is not found');
    } else {
      admin.password = undefined;
      return admin;
    }
  }
}
