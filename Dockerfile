# ── 镜像源配置（国内服务器无法访问 docker.io，使用 DaoCloud 镜像加速站） ──
ARG REGISTRY_PREFIX=docker.m.daocloud.io

# ── Stage 1: Build ────────────────────────────────────────────
FROM ${REGISTRY_PREFIX}/node:20-alpine AS builder

WORKDIR /app

# [国内加速] 使用 npmmirror 替代默认 npm 源
RUN npm config set registry https://registry.npmmirror.com

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────────
FROM ${REGISTRY_PREFIX}/nginx:1.27-alpine

# 移除默认配置
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
