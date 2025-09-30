# ts-tutorial

这是一个使用 TypeScript、Node.js 和 Express 构建的 RESTful API 项目。

## 项目简介

本项目实现了用户相关的 API，包括用户的增删改查。项目结构清晰，适合学习和实践 TypeScript 后端开发。

## 目录结构

```
jest.config.js
nodemon.json
package.json
tsconfig.json
src/
  index.ts
  server.ts
  controllers/
    users.controller.ts
  routes/
    index.ts
    users.route.ts
  services/
    users.service.ts
  types/
    api-response.ts
    user.ts
test/
  controllers/
    users.test.ts
  services/
    users.service.test.ts
```

## 如何访问 API

1. 启动服务：

   ```bash
   npm run dev
   ```

   默认监听端口为 `3000`。

2. 主要用户相关接口：

   - 获取所有用户：
     ```http
     GET /api/users
     ```
   - 获取指定用户：
     ```http
     GET /api/users/:id
     ```
   - 创建用户：
     ```http
     POST /api/users
     Content-Type: application/json
     {
       "name": "用户名",
       "email": "邮箱"
     }
     ```
   - 更新用户：
     ```http
     PUT /api/users/:id
     Content-Type: application/json
     {
       "name": "新用户名",
       "email": "新邮箱"
     }
     ```
   - 删除用户：
     ```http
     DELETE /api/users/:id
     ```

3. 可使用 Postman、curl 或其他 HTTP 客户端进行接口测试。

## 如何测试 API

1. 运行测试：

   ```bash
   npm run test
   ```

   会自动执行 `test/` 目录下的所有单元测试。

2. 测试框架：

   - 使用 [Jest](https://jestjs.io/) 进行单元测试。
   - 测试文件位于 `test/controllers/` 和 `test/services/` 目录下。

3. 测试覆盖内容：
   - 用户服务和控制器的主要功能。

---

如有问题或建议，欢迎提 issue 或 PR。
