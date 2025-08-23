# How to build custom E2B sandbox for OpenHands
# 如何构建OpenHands的自定义E2B沙箱

[E2B](https://e2b.dev) is an [open-source](https://github.com/e2b-dev/e2b) secure cloud environment (sandbox) made for running AI-generated code and agents. E2B offers [Python](https://pypi.org/project/e2b/) and [JS/TS](https://www.npmjs.com/package/e2b) SDK to spawn and control these sandboxes.

[E2B](https://e2b.dev)是一个[开源](https://github.com/e2b-dev/e2b)的安全云环境（沙箱），用于运行AI生成的代码和代理。E2B提供[Python](https://pypi.org/project/e2b/)和[JS/TS](https://www.npmjs.com/package/e2b) SDK来生成和控制这些沙箱。

1. Install the CLI with NPM.
1. 使用NPM安装CLI。
    ```sh
    npm install -g @e2b/cli@latest
    ```
    Full CLI API is [here](https://e2b.dev/docs/cli/installation).
    完整的CLI API在[这里](https://e2b.dev/docs/cli/installation)。

1. Build the sandbox
1. 构建沙箱
  ```sh
  e2b template build --dockerfile ./Dockerfile --name "openhands"
  ```
