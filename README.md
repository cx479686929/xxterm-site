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

### 常用容器操作

```bash
# 查看运行中的容器
docker ps

# 查看容器日志
docker logs -f xxterm-site

# 进入容器调试
docker exec -it xxterm-site sh

# 重启容器
docker restart xxterm-site

# 停止并删除容器
docker stop xxterm-site && docker rm xxterm-site

# 更新部署：拉取新镜像 → 停旧容器 → 启新容器
docker pull xxterm-site:latest
docker stop xxterm-site && docker rm xxterm-site
docker run -d --name xxterm-site -p 8080:80 --restart=always xxterm-site:latest
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
