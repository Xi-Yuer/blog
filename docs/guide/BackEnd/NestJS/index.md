# Nest.js 构建可扩展的Node.js应用程序
Nest.js是一个基于Node.js的渐进式框架，用于构建可扩展、高效且可维护的服务器端应用程序。它结合了Express.js的灵活性和Angular的可组件化架构，提供了一种现代化的方式来构建后端应用。

## 1. 安装Nest.js CLI
Nest.js CLI是一个命令行工具，用于生成和管理Nest.js应用程序。你可以使用以下命令全局安装Nest.js CLI：

``` bash
npm install -g @nestjs/cli
```
## 2. 创建新的Nest.js应用程序
使用Nest.js CLI可以轻松地创建一个新的Nest.js应用程序。在终端中，进入你想要创建项目的目录，并运行以下命令：

``` bash
nest new my-app
```
上述命令将创建一个名为my-app的新Nest.js应用程序，并自动安装所需的依赖项。

## 3. 编写控制器和服务
Nest.js的核心概念是控制器（Controllers）和服务（Services）。控制器负责处理HTTP请求和路由，而服务则处理业务逻辑。你可以使用Nest.js提供的装饰器和注解来定义控制器和服务。

以下是一个简单的示例：

``` typescript
// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest.js!';
  }
}
```
上述示例中，AppController是一个控制器，定义了一个GET路由处理器，该处理器调用AppService中的方法来返回响应。

## 4. 启动应用程序
使用Nest.js CLI提供的命令，你可以轻松地启动应用程序。在终端中，进入你的项目目录，并运行以下命令：

```bash
cd my-app
npm run start
```