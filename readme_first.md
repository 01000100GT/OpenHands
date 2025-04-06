# 源码分析

## docker环境搭建
``` shell
# docker安装完成后，需要给普通用户赋予执行docker的权限，否则代码运行时会报无权限执行docker
sudo groupadd docker
sudo usermod -aG docker $USER

#docker配置proxy
docker info | grep -i proxy
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo vim /etc/systemd/system/docker.service.d/http-proxy.conf

[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890/"
Environment="HTTPS_PROXY=http://127.0.0.1:7890/"
Environment="NO_PROXY=localhost,127.0.0.0/8,::1"

sudo systemctl daemon-reload
sudo systemctl restart docker

```

## 翻墙环境搭建
``` shell
# 省略
```

## docker运行（阅读README.md）
``` shell
# 首次使用，也可先指定环境变量，再运行docker时使用这些环境变量；或使用docker的-e参数指定
export WORKSPACE_BASE=$(pwd)/workspace
export LLM_MODEL="anthropic/claude-3-5-sonnet-20241022"
export LLM_API_KEY="sk_test_12345"
```

## 源码目录说明
``` shell
./.github/
./.github/wokflows/ # github的workflows(CI/DI)
./.github/wokflows/clean-up.yml # 该工作流用于清理过时和陈旧的工作流程，以防止出现磁盘空间不足的问题（触发：手动）
./.github/wokflows/deploy-docs.yml # 发布文档
./.github/wokflows/dummy-agent-test.yml # 测试dummy agent（可能是使用dummy agent冒烟测试下环境能否跑通）
./.github/wokflows/eval-runner.yml # 运行SWE-Bench评估
./.github/wokflows/fe-unit-tests.yml # 前端单元测试
./.github/wokflows/ghcr-build.yml # 构建docker镜像（app镜像和runtime镜像） （触发：手动或PR）
./.github/wokflows/integration-runner.yml # 好像是评估deepseek和claude3.5 haiku模型能力
./.github/wokflows/lint-fix.yml # app项目的lint-fix
./.github/wokflows/lint.yml # app项目的lint
./.github/wokflows/openhands-resolver.yml # 自动处理issue（触发：issue提交）
./.github/wokflows/py-unit-tests.yml # 后端单元测试
./.github/wokflows/pypi-release.yml # 发布到pypi
./.github/wokflows/run-eval.yml # 触发remote评估（未找到create-branch.yml脚本）
./.github/wokflows/stale.yml # 工作流程将30天内没有活动的问题和PR标记为“停滞”，并在7天后关闭
./.github/.codecov.yml # 代码覆盖率报告
./.openhands/microagents/ # 专业领域的增强agent(private microagents)
./.openhands/microagents/glossary.md # 相关名词解释
./.openhands/microagents/repo.md # 私有repo仓库的microagents例子
./containers/ # 镜像构建脚本
./containers/app/ # app镜像构建
./containers/runtime/ # runtime镜像构建
./dev_config/ # 后端python代码lint相关
./docs/ # 官方文档
./evaluation/ # 评估工作流（可指定不同的agent进行评估，可自定义评估脚本）
./frontend/ # 前端代码
./frontend/src/components/features/chat/chat-interface.tsx # 左侧聊天对话页面
./frontend/src/components/shared/modals/settings/model-selector.tsx # 选择模型供应商和模型组件
./frontend/src/context/ws-client-provider.tsx # 前端socket客户端，监听后端发送的oh_event事件，交由frontend/src/services/actions.ts处理
./frontend/src/hooks/query/use-active-host.ts # 获取运行时使用的主机
./frontend/src/hooks/query/use-ai-config-options.ts # 获取所有模型和所有agent和所有安全检测器
./frontend/src/routes/_oh/route.tsx # 首页(输入任务)
./frontend/src/routes/_oh.app/route.tsx # app聊天对话和生成代码页面
./frontend/src/routes/account-settings.tsx # 用户设置页面
./frontend/src/routes/settings.tsx # 设置页面
./frontend/src/routes.ts # 前端路由配置
./frontend/src/services/observations.ts # ObservationType.RUN类型的消息有5000长度的限制(写死在代码中)
./frontend/src/types/action-type.tsx # action枚举定义(用户和agent全部的)
./frontend/src/types/agent-state.tsx # agent状态枚举定义
./frontend/src/types/message.tsx # action消息分为用户消息和agent消息; Observation消息
./frontend/src/types/observation-type.tsx # ObservationType枚举定义
./frontend/src/types/settings.ts # 设置页面的默认参数值
./frontend/src/types/tab-option.tsx # app聊天对话 右侧顶部的tab枚举类型
./frontend/src/utils/suggestions/ # 首页随机推荐的问题(分有代码仓库和无代码仓库2种)
./frontend/src/utils/amount-is-valid.ts # 金额限制 10-25000
./frontend/src/utils/beep.tsx # 提示音
./frontend/src/utils/error-handler.ts # 错误处理(会上报posthog)
./frontend/src/utils/generate-github-auth-url.ts # 感觉是生成openhands自家的github的授权url
./frontend/src/utils/verified-models.ts # openhands自己验证过可在此项目稳定使用的提供商和模型名单
./logs/ # 生成的日志所在目录
./microagents/ # 专业领域的增强agent(public microagents)
./openhands/ # 后端python服务端
./openhands/controller/agent_controller.py # **重要**：agent控制类(既可以作为主控制类，又可以作为代理子控制类)，_step函数为真正执行task的方法，受限于max_iterations(迭代次数)和max_budget_per_task(最大花费)和stuck(卡住)
./openhands/controller/state/state.py # 缓存agent状态(缓存到本地)
./openhands/core/config/utils.py # 命令行参数解析和所有配置参数加载
./openhands/llm/llm.py # 大模型交互类(litellm)
./openhands/resolver # 通过ai去解决issue(好像需要在openhandsCloud开通权限才能用)
./openhands/runtime/ # 运行时，可使用本地的(docker)，也可使用远程的(并发性和可扩展性更好，比如并行评估，参考：https://docs.all-hands.dev/zh-Hans/modules/usage/runtimes)
./openhands/runtime/impl/ # **重要**：所有沙箱环境相关类
./openhands/runtime/impl/docke/dokcer_runtime.py # **重要**：docker沙箱环境
./openhands/runtime/utils/runtime_templates/Dockerfile.j2 # docker镜像构建模板(agent运行时使用的沙盒环境)
./openhands/security/ # agent执行event的安全分析器，可扩展自定义分析器(参考README.md)
./openhands/security/invariant/analyzer.py # invariant安全分析器(会启动docker容器，包含浏览器安全)[Invariant Analyzer](https://github.com/invariantlabs-ai/invariant)
./openhands/server/conversation_manager/standalone_conversation_manager.py # 2. 创建session并create_task
./openhands/server/routes/manage_conversations.py # 1. 任务开始的入口，启动agent_loop
./openhands/server/routes/public.py # 大模型列表、agent列表、安全分析器列表
./openhands/server/session/agent_session.py # 4. 负责初始化security_analyzer、runtime和agent_controller和EventStream(订阅者数组和事件队列，将添加进队列的事件按顺序发送给订阅者)
./openhands/server/session/session.py # 3. 负责初始化agent_session，并根据配置初始化agent，然后启动agent_session.start；订阅agent_session的SERVER类型的event事件；对前端发送socket的oh_event事件
./openhands/server/app.py # 后端服务监听的接口
./openhands/server/listen.py # 后端服务入口，引入listen_socket、middleware和./openhands/server/app.py
./openhands/server/listen_socket.py # 监听前端通过socket发送过来的oh_action事件，然后转发给standalone_conversation_manager.py的send_to_event_stream函数->session.py的dispatch函数
./tests/ # 测试用例
./workspace/ # 运行时用到的工作目录
.config.template.toml # CLI和无头模式使用的配置文件模板(可复制一份.config.toml进行配置)
./Development.md # 开发者开发环境配置文档
./Makefile # 项目相关命令（编译、运行等）
./README.md # 项目说明（docker方式启动命令）

#提示词相关
./openhands/agenthub/codeact_agent/prompts、
./openhands/utils/prompt.py
```

## microagents 补充说明
``` shell
1. 提示词增强，提供领域特定知识、仓库特定上下文和任务特定工作流
2. 分public和private，在openhands项目下的"./microagents/"目录下的是公共的，在"./.openhands/microagents/"这个目录下的是自己私有的

```

## ./openhands/resolver 补充说明
``` shell
1. 作用：只要用户在github上提交指定格式的issue，github仓库的action就会触发通过 cicd 启动openhands去用ai处理github上的issue，然后创建pr然后push到代码仓库，然后这个openhands的仓库 应该会在cicd那里配置模型的key等一些参数
2. .github/workflows/openhands-resolver.yml这个就是cicd的代码，里面会执行python -m openhands.resolver.resolve_issue和python -m openhands.resolver.send_pull_request
```

## evaluation评估工作流 补充说明
``` shell
# 云并行评估的概念（包括远程评估）：
https://www.all-hands.dev/blog/evaluation-of-llms-as-coding-agents-on-swe-bench-at-30x-speed
# 评估工作流官方说明文档
https://docs.all-hands.dev/zh-Hans/modules/usage/how-to/evaluation-harness
# 评估agent分类(每个agent都有run_infer.py)
./evaluation/README.md
# 人工干预函数
user_response_fn
```

## 源码运行（请阅读Development.md）
``` shell
# 按照Development.md说明安装运行环境依赖库

# vocde调试
https://docs.all-hands.dev/zh-Hans/modules/usage/how-to/debugging
```
## 前端依赖库说明(./frontend/package.json)
``` shell
@heroui/react # 前端UI库
@react-router/node # 为在 Node.js 服务器端渲染（SSR）场景下使用 React Router 提供了支持
@react-types/shared # 共享React类型定义(预定义的一些类型，可直接使用这些类型，或自定义类型时继承这些类型)
@stripe/react-stripe-js # Stripe 支付功能SDK
@tanstack/react-query # 状态管理库(重要，需要看懂用法，否则看不懂代码)
@xterm/xterm # web版Terminal终端
framer-motion # 动画库
isbot # 检测一个用户代理（User-Agent）是否为机器人
jose # JWT(JSON Web Token)库
monaco-editor # 微软web版代码编辑器(重要)
posthog-js # posthog分析用户行为的三方平台库
remark-gfm # remark插件，用于解析GitHub Flavored Markdown
sirv-cli # 静态文件服务
socket.io-client # 跨平台WebSocket库，跨前后端；前端使用时使用标准websocket接口；Node.js服务端使用时可依赖ws库
web-vitals # 是一个由 Google 开发的轻量级 JavaScript 库，用于在真实用户环境中测量和报告重要的网页性能指标。这些指标被称为 “Web Vitals”，它们对于评估网页的用户体验至关重要
clsx # css拼接类库
```
## 后端依赖库说明(./pyproject.toml)
``` shell
litellm # litellm是一个用于与OpenAI API交互的Python库，它提供了一种简单的方式来使用OpenAI API。
uvicorn # uvicorn是一个用于构建ASGI（异步服务器网关接口）应用程序的Python工具。
tenacity # 是一个用于 Python 的重试库，它能让你轻松地为函数或方法添加重试机制
modal # 是一个用于构建和部署执行云函数的库，有点像severless
browsergym # 模拟人类在浏览器中的各种操作，例如点击链接、输入文本、滚动页面等，应用场景：1.自动化网页测试 2.信息检索与挖掘

llama-index # RAG库（不过make时不安装）
chroma # Chroma是一个开源的向量数据库，用于存储和检索向量嵌入。
chroma-hnswlib

# 代码质量检查工具
ruff #Ruff 是一个快速而全面的Python代码检查工具，可以捕获常见的编程错误和风格问题
mypy #Mypy 是一个用于Python的静态类型检查器。它帮助开发者在运行代码之前检测潜在的类型错误
flake8 #Flake8 是一个用于 Python 代码检查的工具，它提供了许多检查，包括语法错误、PEP8 样式guide violations 和代码复杂度。
```

## 编译（宿主环境）
``` shell
#切换到python虚拟环境编译
make build
```

## 启动模式
1. GUI模式：
``` shell
make run

# 启动后可配置model和api_key

# 配置github令牌，参考官方文档：https://docs.all-hands.dev/zh-Hans/modules/usage/how-to/gui-mode
```
2. CLI模式（命令行启动交互式会话）：
``` shell
# 参考官方文档：https://docs.all-hands.dev/zh-Hans/modules/usage/how-to/cli-mode

# 需要先生成config.toml
make setup-config

# 宿主环境运行CLI模式
poetry run python -m openhands.core.cli

# 也可使用docker指定环境变量后执行openhands.core.cli
export WORKSPACE_BASE=$(pwd)/workspace
export LLM_MODEL="anthropic/claude-3-5-sonnet-20241022"
export LLM_API_KEY="sk_test_12345"
docker run -it \
    --pull=always \
    -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:0.27-nikolaik \
    -e SANDBOX_USER_ID=$(id -u) \
    -e WORKSPACE_MOUNT_PATH=$WORKSPACE_BASE \
    -e LLM_API_KEY=$LLM_API_KEY \
    -e LLM_MODEL=$LLM_MODEL \
    -v $WORKSPACE_BASE:/opt/workspace_base \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v ~/.openhands-state:/.openhands-state \
    --add-host host.docker.internal:host-gateway \
    --name openhands-app-$(date +%Y%m%d%H%M%S) \
    docker.all-hands.dev/all-hands-ai/openhands:0.27 \
    python -m openhands.core.cli
```
3. 无头模式：
``` shell
# 参考官方文档：https://docs.all-hands.dev/zh-Hans/modules/usage/how-to/headless-mode
# 和CLI的区别：CLI 模式是交互式的，更适合主动开发

# 宿主环境运行无头模式
poetry run python -m openhands.core.main -t "write a bash script that prints hi"

#docker环境运行无头模式
export WORKSPACE_BASE=$(pwd)/workspace
export LLM_MODEL="anthropic/claude-3-5-sonnet-20241022"
export LLM_API_KEY="sk_test_12345"
docker run -it \
    --pull=always \
    -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:0.28-nikolaik \
    -e SANDBOX_USER_ID=$(id -u) \
    -e WORKSPACE_MOUNT_PATH=$WORKSPACE_BASE \
    -e LLM_API_KEY=$LLM_API_KEY \
    -e LLM_MODEL=$LLM_MODEL \
    -e LOG_ALL_EVENTS=true \
    -v $WORKSPACE_BASE:/opt/workspace_base \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --add-host host.docker.internal:host-gateway \
    --name openhands-app-$(date +%Y%m%d%H%M%S) \
    docker.all-hands.dev/all-hands-ai/openhands:0.28 \
    python -m openhands.core.main -t "write a bash script that prints hi" --no-auto-continue

# 查看参数
python -m openhands.core.main --help

```

## config.toml配置文件(GUI模式无需配置，CLI和无头模式必需配置)
``` shell
#可配置LLM API密钥、LLM模型名称和工作空间目录，创建：
make setup-config
或
copy config.template.toml config.toml

# 官方配置文档
https://docs.all-hands.dev/zh-Hans/modules/usage/configuration-options
```

## openhands模型供应商对接文档
``` shell
# 官方文档
https://docs.all-hands.dev/zh-Hans/modules/usage/llms/openai-llms
# litellm文档
https://docs.litellm.ai/docs/providers
https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json
# openrouter文档
https://openrouter.ai/models
# 部分模型参数说明文档
https://docs.all-hands.dev/zh-Hans/modules/usage/llms
```

## 整体架构说明
``` shell
# 官方文档
https://docs.all-hands.dev/zh-Hans/modules/usage/architecture/backend
https://docs.all-hands.dev/zh-Hans/modules/usage/architecture/runtime
# python用到的库
https://docs.all-hands.dev/zh-Hans/modules/usage/about
```

## runtime 运行时容器(沙箱)
``` shell
# 容器构建模板路径(执行任务前会先构建openhands-runtime的docker镜像)
./openhands/runtime/utils/runtime_templates/Dockkerfile.j2

# docker images
ghcr.io/all-hands-ai/runtime                  oh_v0.27.0_eqomge1neu7gf6pk                    056efc4b5377   38 minutes ago   5.27GB
# docker ps -a
39c04af1d377   ghcr.io/all-hands-ai/runtime:oh_v0.27.0_eqomge1neu7gf6pk_3zfbuw12au6y4igc   "/openhands/micromam…"   26 minutes ago   Exited (252) 28 seconds ago                openhands-runtime-4a0bd440b6f74749a1277cf57b3fd5ea

# 也可以使用自定义沙箱
# 官方文档：
https://docs.all-hands.dev/zh-Hans/modules/usage/how-to/custom-sandbox-guide

# 常用docker 命令
# 停止名称以"openhands-runtime-"为前缀的任何容器
docker ps --filter name=openhands-runtime- --filter status=running -aq | xargs docker stop
# 删除名称以"openhands-runtime-"为前缀的任何容器
docker rmi $(docker images --filter name=openhands-runtime- -q --no-trunc)
# 清理容器/镜像
docker container prune -f && docker image prune -f
```

## 一些缓存目录
``` shell
# 默认配置文件保存路径
/tmp/openhands_file_store/settings.json
# 自定义模型的配置文件保存路径
 ~/.openhands-state/settings.json
# filestore的默认缓存路径（可在config.toml中修改）
~/.openhands-state
# event事件的缓存路径
~/.openhands-state/sessions/60f47ccf40bb41faa18c8202b2128c01/events/8.json
# agent_state缓存路径
~/.openhands-state/sessions/851ec2f6ba4b407d81a4916c889269f1/agent_state.pkl
# 长期记忆llama_index向量库缓存位置
./cache/sessions/{event_stream.sid}/memory
```

## 开启调试日志
``` shell
# 日志等级(默认:'INFO'，开启DEBUG模式后会变为'DEBUG', )
export LOG_LEVEL='INFO'
# 是否记录日志到文件中(默认False，开启DEBUG模式后会变为True)
export LOG_TO_FILE=1
# 开启Debug日志(默认:False，开启后)
export DEBUG=1
# 开启大模型日志(默认:False)
export DEBUG_LLM=1
# 开启Agent执行日志(开启DEBUG模式后会打印日志)
export LOG_ALL_EVENTS=1
# 开启runtime日志
export DEBUG_RUNTIME=1
```

## 日志缓存目录
``` shell
# agent执行过程的日志记录
./logs/openhands_2025-03-12.log # 控制台日志
./logs/llm/
./logs/llm/25-03-12_11-12/   # 按日期时间分文件夹：yy-MM-dd_mm:hh
./logs/llm/25-03-12_11-12/prompt_001.log # prompt日志
./logs/llm/25-03-12_11-12/response_001.log # Function call日志
```

## 遇到的控制台错误日志
``` shell

#模型不支持
BadRequestError: litellm.BadRequestError: LLM Provider NOT provided. Pass in the LLM provider you are trying to call. You passed model=Qwen/Qwen2.5-Coder-7B-Instruct Pass model as E.g. For 'Huggingface' inference endpoints pass in completion(model='huggingface/starcoder',..) Learn more: https://docs.litellm.ai/docs/providers

# 拉取不到镜像
11:15:44 - openhands:DEBUG: docker.py:295 - Image could not be pulled: 500 Server Error for http+docker://localhost/v1.48/images/create?tag=oh_v0.27.0_eqomge1neu7gf6pk&fromImage=ghcr.io%2Fall-hands-ai%2Fruntime: Internal Server Error ("manifest unknown")
# 拉取不到镜像
11:15:46 - openhands:DEBUG: docker.py:295 - Image could not be pulled: 500 Server Error for http+docker://localhost/v1.48/images/create?tag=oh_v0.27.0_nikolaik_s_python-nodejs_t_python3.12-nodejs22&fromImage=ghcr.io%2Fall-hands-ai%2Fruntime: Internal Server Error ("manifest unknown")

# deepseek不支持连续用户消息，必须用户消息和助手消息交替
litellm.llms.openai.common_utils.OpenAIError: {"error":{"message":"deepseek-reasoner does not support successive user or assistant messages (messages[5] and messages[6] in your input). You should interleave the user/assistant messages in the message sequence.","type":"invalid_request_error","param":null,"code":"invalid_request_error"}}
```

## make docker-dev 的环境下配置python镜像源
``` shell
# 修改./containers/dev/Dockerfile 108行位置，添加镜像源
RUN \
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && \
poetry config repositories.thu https://pypi.tuna.tsinghua.edu.cn/simple
```

## daytona （一个为运行AI生成的代码提供安全运行环境的开源平台，本项目可用作runtime沙箱环境）
``` shell
# 官方文档
https://www.daytona.io/
```

## Runloop （AI sandbox Devbox，，本项目可用作runtime沙箱环境）
``` shell
# 官方文档
https://docs.runloop.ai/overview/what-is-runloop
```


## posthog(三方分析平台，比如留存率，错误日志等)
``` shell
# 配置key
./openhands/server/config/server_config.py
```

## Docusaurus(Facebook开源的静态网站生成器) 官方文档
``` shell
# ./docs目录下是官方文档

# Docusaurus文档
https://docusaurus.io/zh-CN/docs

```
## 什么是github installations(安装程序)
``` shell
# 答：github可以 创建一个app，然后授权app使用仓库代码的权限，有私有和公有模式，github用户可以在市场安装公有模式的app， openhands应该是私有模式
# 官方文档：https://docs.github.com/en/apps
```
