# Docker Containers
# Docker容器

Each folder here contains a Dockerfile, and a config.sh describing how to build
the images and where to push them. These images are built and pushed in GitHub Actions
by the `ghcr.yml` workflow.

这里的每个文件夹都包含一个Dockerfile和一个config.sh文件，用于描述如何构建镜像以及将它们推送到何处。这些镜像由GitHub Actions中的`ghcr.yml`工作流程构建和推送。

## Building Manually
## 手动构建
```bash
docker build -f containers/app/Dockerfile -t openhands .
docker build -f containers/sandbox/Dockerfile -t sandbox .
```
