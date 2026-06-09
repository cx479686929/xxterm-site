#!/bin/bash
set -e

# ===== 配置 =====
CONTAINER_CLI="${CONTAINER_CLI:-nerdctl}"   # 容器 CLI: nerdctl（推荐）或 docker
REGISTRY="${REGISTRY:-}"                    # 镜像仓库地址，留空则仅构建本地镜像
IMAGE_NAME="xxterm-site"
TAG="${TAG:-v1.0.0}"
FULL_IMAGE="${REGISTRY:+$REGISTRY/}${IMAGE_NAME}:${TAG}"
NAMESPACE="xxterm"
DEPLOYMENT="xxterm-site"
NODE_PORT=30080                             # NodePort 端口，与 service-nodeport.yaml 一致

echo "=== 构建镜像: ${FULL_IMAGE} (使用 ${CONTAINER_CLI}) ==="
# 同时打 latest 标签，确保与 deployment.yaml 中的 image 引用一致
if [ "$CONTAINER_CLI" = "nerdctl" ]; then
  ${CONTAINER_CLI} -n k8s.io build -t "${IMAGE_NAME}:${TAG}" -t "${IMAGE_NAME}:latest" -t "${FULL_IMAGE}" -f Dockerfile .
else
  ${CONTAINER_CLI} build -t "${IMAGE_NAME}:${TAG}" -t "${IMAGE_NAME}:latest" -t "${FULL_IMAGE}" -f Dockerfile .
fi

if [ -n "$REGISTRY" ]; then
  echo "=== 推送镜像 ==="
  if [ "$CONTAINER_CLI" = "nerdctl" ]; then
    ${CONTAINER_CLI} -n k8s.io push "${FULL_IMAGE}"
  else
    ${CONTAINER_CLI} push "${FULL_IMAGE}"
  fi
fi

echo "=== 更新 K8s 部署镜像 ==="
if [ -n "$REGISTRY" ]; then
  sed -i.bak "s|xxterm-site:latest|${FULL_IMAGE}|g" k8s/deployment.yaml
fi

echo "=== 应用 K8s 资源 ==="
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
# 使用 NodePort 方式暴露服务，配合宿主机 Nginx 反向代理
kubectl apply -f k8s/service-nodeport.yaml

echo "=== 等待 Pod 就绪 ==="
kubectl rollout status deployment/${DEPLOYMENT} -n ${NAMESPACE} --timeout=120s

echo "=== 部署完成 ==="
kubectl get pods,svc -n ${NAMESPACE}
echo ""
echo "访问地址: http://xxterm.haohanxingchen.cn (宿主机 Nginx → 127.0.0.1:${NODE_PORT})"

# 恢复 deployment.yaml
if [ -n "$REGISTRY" ]; then
  mv k8s/deployment.yaml.bak k8s/deployment.yaml
fi
