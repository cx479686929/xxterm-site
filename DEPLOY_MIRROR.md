# 服务器镜像加速配置

国内服务器无法直接访问 `docker.io`，需要配置 containerd 镜像加速站。

## 方式一：配置 containerd 镜像加速（推荐）

修改 containerd 配置后，Dockerfile 中可直接使用 `node:20-alpine` / `nginx:1.27-alpine` 原始镜像名。

```bash
# 编辑 containerd 配置
sudo vim /etc/containerd/config.toml
```

在 `[plugins."io.containerd.grpc.v1.cri".registry]` 下添加 mirror 配置：

```toml
[plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
  endpoint = ["https://docker.m.daocloud.io"]
```

重启 containerd 生效：

```bash
sudo systemctl restart containerd
```

配置完成后，Dockerfile 中可去掉 `REGISTRY_PREFIX`，使用官方镜像名：

```dockerfile
FROM node:20-alpine AS builder
FROM nginx:1.27-alpine
```

## 方式二：Dockerfile 内指定加速源（当前方案）

不修改服务器配置，在构建时通过 `REGISTRY_PREFIX` 指定加速站：

```bash
# 默认使用 DaoCloud 加速站
nerdctl -n k8s.io build -t xxterm-site:v1.0.0 .

# 自定义加速站
nerdctl -n k8s.io build --build-arg REGISTRY_PREFIX=dockerhub.icu -t xxterm-site:v1.0.0 .
```

## 可用加速站列表

| 加速站 | 地址 | 备注 |
|--------|------|------|
| DaoCloud | `docker.m.daocloud.io` | 稳定，推荐 |
| 南京大学 | `ghcr.nju.edu.cn` | 仅 ghcr.io |
| 自建 | 按需配置 | 最可控 |
