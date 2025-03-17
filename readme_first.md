# 源码分析

## docker环境
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

## config.toml配置文件(非必需)
``` shell
#可配置LLM API密钥、LLM模型名称和工作空间目录，创建：
make setup-config
或
copy config.template.toml config.toml
```

## 执行任务前会先构建openhands-runtime的docker镜像
``` shell
# 容器构建模板路径
./openhands/runtime/utils/runtime_templates/Dockkerfile.j2

# docker images
ghcr.io/all-hands-ai/runtime                  oh_v0.27.0_eqomge1neu7gf6pk                    056efc4b5377   38 minutes ago   5.27GB
# docker ps -a
39c04af1d377   ghcr.io/all-hands-ai/runtime:oh_v0.27.0_eqomge1neu7gf6pk_3zfbuw12au6y4igc   "/openhands/micromam…"   26 minutes ago   Exited (252) 28 seconds ago                openhands-runtime-4a0bd440b6f74749a1277cf57b3fd5ea
```

## 日志
``` shell

#日志相关代码
./openhands/cores/logger.py
#相关环境变量（默认都为false）
DEBUG
DEBUG_LLM
LOG_ALL_EVENTS
DEBUG_RUNTIME

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

## Daytona-开源开发环境管理器
``` shell
# 官网：https://www.daytona.io/
# https://app.daytona.io/
# 文档：https://www.daytona.io/docs/
# github: https://github.com/daytonaio/daytona
```

## Runloop 为Ai Agent提供开发环境
``` shell
https://docs.runloop.ai/overview/what-is-runloop
```

## posthog-三方分析平台
``` shell
# 配置key
./openhands/server/config/server_config.py
```
