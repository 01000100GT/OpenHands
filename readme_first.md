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
./.openhands/microagents/ # private microagents
./containers/
./dev_config/ # lint相关
./docs/ # 官方文档
./evaluation/ # 模型评估(有个云并行评估的概念，参考：https://www.all-hands.dev/blog/evaluation-of-llms-as-coding-agents-on-swe-bench-at-30x-speed)
./frontend/ # 前端代码
./logs/ # 生成的日志所在目录
./microagents/ # public microagents
./openhands/ # 服务端
./openhands/resolver # 通过ai去解决issue(好像需要在openhandsCloud开通权限才能用)
./openhands/runtime/ # 运行时，可使用本地的(docker)，也可使用远程的(并发性和可扩展性更好，比如并行评估，参考：https://docs.all-hands.dev/zh-Hans/modules/usage/runtimes)
./openhands/runtime/utils/runtime_templates/Dockerfile.j2 # docker镜像构建模板(agent运行时使用的沙盒环境)
./tests/ # 测试用例
./workspace/ # 运行时用到的工作目录
.config.template.toml # CLI和无头模式使用的配置文件
./Development.md # 开发者文档
./Makefile # 项目相关命令（编译、运行等）
./README.md # 项目说明
```

## ./openhands/resolver 补充说明
``` shell
1. 作用：只要用户在github上提交指定格式的issue，github仓库的action就会触发通过 cicd 启动openhands去用ai处理github上的issue，然后创建pr然后push到代码仓库，然后这个openhands的仓库 应该会在cicd那里配置模型的key等一些参数
2. .github/workflows/openhands-resolver.yml这个就是cicd的代码，里面会执行python -m openhands.resolver.resolve_issue和python -m openhands.resolver.send_pull_request
```

## 评估 补充说明
``` shell
https://docs.all-hands.dev/zh-Hans/modules/usage/how-to/evaluation-harness
https://www.all-hands.dev/blog/evaluation-of-llms-as-coding-agents-on-swe-bench-at-30x-speed
```

## 源码运行（阅读Development.md）
``` shell
# 按照Development.md说明安装运行环境依赖库

# vocde调试
https://docs.all-hands.dev/zh-Hans/modules/usage/how-to/debugging
```

## pyproject.toml依赖库说明
``` shell
litellm # litellm是一个用于与OpenAI API交互的Python库，它提供了一种简单的方式来使用OpenAI API。
uvicorn # uvicorn是一个用于构建ASGI（异步服务器网关接口）应用程序的Python工具。

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

# 开启Agent执行日志
export LOG_ALL_EVENTS=true
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

## 日志
``` shell
# agent执行过程的日志记录
./logs/openhands_2025-03-12.log # 控制台日志
./logs/llm/
./logs/llm/25-03-12_11-12/   # 按日期时间分文件夹：yy-MM-dd_mm:hh
./logs/llm/25-03-12_11-12/prompt_001.log # prompt日志
./logs/llm/25-03-12_11-12/response_001.log # Function call日志
```
![alt 日志](/md_resource/logs.png "日志")

## 控制台错误日志
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

## make docker-dev 添加镜像源
``` shell
# 修改./containers/dev/Dockerfile 108行位置，添加镜像源
RUN \
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && \
poetry config repositories.thu https://pypi.tuna.tsinghua.edu.cn/simple
```

## posthog 三方分析平台
``` shell
# 配置key
./openhands/server/config/server_config.py
```

## Docusaurus 官方文档
``` shell
# ./docs目录下是官方文档

# Docusaurus文档
https://docusaurus.io/zh-CN/docs

```
