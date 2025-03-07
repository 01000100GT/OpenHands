# Develop in Docker
# 在Docker中开发

> [!WARNING]
> This is not officially supported and may not work.
> 这不是官方支持的功能，可能无法正常工作。

Install [Docker](https://docs.docker.com/engine/install/) on your host machine and run:
在您的主机上安装[Docker](https://docs.docker.com/engine/install/)并运行:
```bash
make docker-dev
# same as:
cd ./containers/dev
./dev.sh
```

It could take some time if you are running for the first time as Docker will pull all the  tools required for building OpenHands. The next time you run again, it should be instant.
如果您是第一次运行,由于Docker需要拉取构建OpenHands所需的所有工具,这可能需要一些时间。下次运行时应该会立即完成。


## Build and run
## 构建和运行

If everything goes well, you should be inside a container after Docker finishes building the `openhands:dev` image similar to the following:
如果一切顺利,当Docker完成构建`openhands:dev`镜像后,您应该会进入一个类似以下的容器:

```bash
Build and run in Docker ...
root@93fc0005fcd2:/app#
```

You may now proceed with the normal [build and run](../../Development.md) workflow as if you were on the host.
您现在可以像在主机上一样继续正常的[构建和运行](../../Development.md)工作流程。

## Make changes
## 修改代码

The source code on the host is mounted as `/app` inside docker. You may edit the files as usual either inside the Docker container or on your host with your favorite IDE/editors.
主机上的源代码被挂载为Docker容器内的`/app`。您可以像往常一样在Docker容器内或在主机上使用您喜欢的IDE/编辑器来编辑文件。

The following are also mapped as readonly from your host:
以下内容也以只读方式从您的主机映射:

```yaml
# host credentials
- $HOME/.git-credentials:/root/.git-credentials:ro
- $HOME/.gitconfig:/root/.gitconfig:ro
- $HOME/.npmrc:/root/.npmrc:ro
```

## VSCode

Alternatively, if you use VSCode, you could also [attach to the running container](https://code.visualstudio.com/docs/devcontainers/attach-container).
或者，如果您使用VSCode，您也可以[连接到正在运行的容器](https://code.visualstudio.com/docs/devcontainers/attach-container)。

See details for [developing in docker](https://code.visualstudio.com/docs/devcontainers/containers) or simply ask `OpenHands` ;-)
有关[在docker中开发](https://code.visualstudio.com/docs/devcontainers/containers)的详细信息，或者直接询问`OpenHands` ;-)

## Rebuild dev image
## 重建开发镜像

You could optionally pass additional options to the build script.
您可以选择向构建脚本传递额外的选项。

```bash
make docker-dev OPTIONS="--build"
# or
./containers/dev/dev.sh --build
```

See [docker compose run](https://docs.docker.com/reference/cli/docker/compose/run/) for more options.
更多选项请参见[docker compose run](https://docs.docker.com/reference/cli/docker/compose/run/)。
