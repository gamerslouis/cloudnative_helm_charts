# helm chart

## Install Argo CD

```shell=
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

## Download Argo CD CLI

```bash=
brew install argocd
```

## Access The Argo CD API Server

```bash=****
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
```

## Port Fowarding

```bash=
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

## Get Password

```bash=
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```

## Login

Open your UI on 127.0.0.1:8080, and type:
account: admin
password: decoded password you get in previous instruction.
