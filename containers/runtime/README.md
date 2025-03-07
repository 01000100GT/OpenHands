# Dynamically constructed Dockerfile
# 动态构建的Dockerfile

This folder builds a runtime image (sandbox), which will use a dynamically generated `Dockerfile`
that depends on the `base_image` **AND** a [Python source distribution](https://docs.python.org/3.10/distutils/sourcedist.html) that is based on the current commit of `openhands`.

该文件夹构建一个运行时镜像（沙箱），它将使用动态生成的`Dockerfile`，该Dockerfile依赖于`base_image`**和**基于`openhands`当前提交的[Python源代码分发包](https://docs.python.org/3.10/distutils/sourcedist.html)。

The following command will generate a `Dockerfile` file for `nikolaik/python-nodejs:python3.12-nodejs22` (the default base image), an updated `config.sh` and the runtime source distribution files/folders into `containers/runtime`:
以下命令将为`nikolaik/python-nodejs:python3.12-nodejs22`（默认基础镜像）生成一个`Dockerfile`文件，一个更新的`config.sh`以及运行时源代码分发文件/文件夹到`containers/runtime`中：
```bash
poetry run python3 openhands/runtime/utils/runtime_build.py \
    --base_image nikolaik/python-nodejs:python3.12-nodejs22 \
    --build_folder containers/runtime
```
