# 源码分析

## docker环境
``` shell
# docker安装完成后，需要给普通用户赋予执行docker的权限，否则代码运行时会报无权限执行docker
sudo groupadd docker
sudo usermod -aG docker $USER
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
# agent执行过程的日志记录
./logs/openhands_2025-03-12.log # 控制台日志
./logs/llm/
./logs/llm/25-03-12_11-12/   # 按日期时间分文件夹：yy-MM-dd_mm:hh
./logs/llm/25-03-12_11-12/prompt_001.log # prompt日志
./logs/llm/25-03-12_11-12/response_001.log # Function call日志
```
![alt 日志](/md_resource/logs.png "日志")

## posthog三方分析平台
``` shell
# 配置key
./openhands/server/config/server_config.py
```
