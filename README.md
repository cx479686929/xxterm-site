# XxTerm Site

XxTerm 官方产品落地页，基于 React + Vite 构建，展示跨平台 SSH 终端工具的核心功能和精美主题。

## 技术栈

- **React 18** + TypeScript
- **Vite 5** 构建
- **Framer Motion** 动画
- **Lucide React** 图标

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产包
npm run build

# 预览生产包
npm run preview
```

## CRI 容器部署（服务器环境）

> 服务器使用 `crictl` + `containerd` 管理容器，通过 `buildah` 构建镜像（无需 Docker 守护进程）。

### 1. 构建镜像（buildah）

```bash
# 在构建机上构建镜像
buildah bud -t xxterm-site:latest .

# 推送到镜像仓库
buildah push xxterm-site:latest docker://registry.example.com/xxterm-site:latest

# 或导出为 tar 包，手动传输到服务器
buildah push xxterm-site:latest docker-archive:xxterm-site.tar
scp xxterm-site.tar user@server:~/
```

### 2. 服务器加载镜像

```bash
# 从仓库拉取
crictl pull registry.example.com/xxterm-site:latest

# 或从 tar 包导入（使用 ctr）
ctr -n k8s.io images import xxterm-site.tar
```

### 3. 运行容器

`crictl` 基于 CRI 模型，需要先创建 Pod 再创建容器：

```bash
# 创建 Pod
crictl runp container/pod-config.json

# 在 Pod 内创建容器（替换 <POD_ID> 为上一步返回的 ID）
crictl create <POD_ID> container/container-config.json container/pod-config.json

# 启动容器
crictl start <CONTAINER_ID>
```

### 4. 常用 crictl 操作

```bash
# 查看所有 Pod
crictl pods

# 查看运行中的容器
crictl ps

# 查看所有容器（含已停止）
crictl ps -a

# 查看容器日志
crictl logs -f <CONTAINER_ID>

# 进入容器调试
crictl exec -it <CONTAINER_ID> sh

# 查看容器详情
crictl inspect <CONTAINER_ID>

# 停止容器
crictl stop <CONTAINER_ID>

# 删除容器
crictl rm <CONTAINER_ID>

# 停止 Pod
crictl stopp <POD_ID>

# 删除 Pod
crictl rmp <POD_ID>

# 查看镜像列表
crictl images

# 删除镜像
crictl rmi registry.example.com/xxterm-site:latest
```

### 5. 更新部署

```bash
# 拉取新镜像
crictl pull registry.example.com/xxterm-site:latest

# 停止并删除旧容器和 Pod
crictl stop <CONTAINER_ID> && crictl rm <CONTAINER_ID>
crictl stopp <POD_ID> && crictl rmp <POD_ID>

# 重新创建 Pod 和容器
crictl runp container/pod-config.json
crictl create <NEW_POD_ID> container/container-config.json container/pod-config.json
crictl start <NEW_CONTAINER_ID>
```

---

## Docker 部署

```bash
# 构建镜像
docker build -t xxterm-site:latest .

# 运行容器
docker run -d --name xxterm-site -p 8080:80 --restart=always xxterm-site:latest
```

### Docker Compose 部署

```bash
# 启动服务
docker compose up -d

# 查看日志
docker compose logs -f

# 停止并移除
docker compose down

# 重新构建并启动
docker compose up -d --build
```

## Kubernetes 部署

```bash
# 一键部署
kubectl apply -f k8s/
```

部署清单：

| 文件 | 资源 | 说明 |
|------|------|------|
| `k8s/namespace.yaml` | Namespace | `xxterm` 命名空间 |
| `k8s/deployment.yaml` | Deployment | 2 副本，资源限制 + 健康检查 |
| `k8s/service.yaml` | Service | ClusterIP :80 |
| `k8s/ingress.yaml` | Ingress | Nginx Ingress + TLS |

> 部署前需替换 `deployment.yaml` 中的镜像地址和 `ingress.yaml` 中的域名。

## 项目结构

```
├── Dockerfile           # 多阶段构建 (Node → Nginx)
├── docker-compose.yml   # Docker Compose 编排
├── nginx.conf           # SPA 路由回退 + gzip + 缓存策略
├── container/           # crictl 容器配置
│   ├── pod-config.json          # Pod 配置
│   └── container-config.json    # 容器配置
├── k8s/                 # Kubernetes 部署清单
├── public/              # 静态资源
├── src/
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 入口
│   └── index.css        # 全局样式
├── index.html           # HTML 模板
└── vite.config.ts       # Vite 配置（代码分割）
```

## License

MIT
