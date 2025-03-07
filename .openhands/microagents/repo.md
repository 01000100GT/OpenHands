---
name: repo
type: repo
agent: CodeActAgent
---
This repository contains the code for OpenHands, an automated AI software engineer. It has a Python backend
(in the `openhands` directory) and React frontend (in the `frontend` directory).

此代码库包含OpenHands（一个自动化AI软件工程师）的代码。它包含Python后端（在`openhands`目录中）和React前端（在`frontend`目录中）。

## General Setup:
## 基本设置：
To set up the entire repo, including frontend and backend, run `make build`.
You don't need to do this unless the user asks you to, or if you're trying to run the entire application.

要设置整个代码库（包括前端和后端），运行`make build`。
除非用户要求或您想运行整个应用程序，否则不需要执行此操作。

Before pushing any changes, you should ensure that any lint errors or simple test errors have been fixed.

在推送任何更改之前，您应确保已修复所有lint错误或简单的测试错误。

* If you've made changes to the backend, you should run `pre-commit run --all-files --config ./dev_config/python/.pre-commit-config.yaml`
* If you've made changes to the frontend, you should run `cd frontend && npm run lint:fix && npm run build ; cd ..`

* 如果您对后端进行了更改，应运行 `pre-commit run --all-files --config ./dev_config/python/.pre-commit-config.yaml`
* 如果您对前端进行了更改，应运行 `cd frontend && npm run lint:fix && npm run build ; cd ..`

If either command fails, it may have automatically fixed some issues. You should fix any issues that weren't automatically fixed,
then re-run the command to ensure it passes.

如果任一命令失败，它可能已自动修复了一些问题。您应该修复所有未自动修复的问题，然后重新运行命令以确保通过。

## Repository Structure
## 代码库结构
Backend:
后端：
- Located in the `openhands` directory
- 位于`openhands`目录中
- Testing:
- 测试：
  - All tests are in `tests/unit/test_*.py`
  - 所有测试都在`tests/unit/test_*.py`中
  - To test new code, run `poetry run pytest tests/unit/test_xxx.py` where `xxx` is the appropriate file for the current functionality
  - 要测试新代码，运行`poetry run pytest tests/unit/test_xxx.py`，其中`xxx`是当前功能的相应文件
  - Write all tests with pytest
  - 使用pytest编写所有测试

Frontend:
前端：
- Located in the `frontend` directory
- 位于`frontend`目录中
- Prerequisites: A recent version of NodeJS / NPM
- 前提条件：较新版本的NodeJS / NPM
- Setup: Run `npm install` in the frontend directory
- 设置：在frontend目录中运行`npm install`
- Testing:
- 测试：
  - Run tests: `npm run test`
  - 运行测试：`npm run test`
  - To run specific tests: `npm run test -- -t "TestName"`
  - 运行特定测试：`npm run test -- -t "TestName"`
- Building:
- 构建：
  - Build for production: `npm run build`
  - 生产环境构建：`npm run build`
- Environment Variables:
- 环境变量：
  - Set in `frontend/.env` or as environment variables
  - 在`frontend/.env`中设置或作为环境变量
  - Available variables: VITE_BACKEND_HOST, VITE_USE_TLS, VITE_INSECURE_SKIP_VERIFY, VITE_FRONTEND_PORT
  - 可用变量：VITE_BACKEND_HOST, VITE_USE_TLS, VITE_INSECURE_SKIP_VERIFY, VITE_FRONTEND_PORT
- Internationalization:
- 国际化：
  - Generate i18n declaration file: `npm run make-i18n`
  - 生成i18n声明文件：`npm run make-i18n`
