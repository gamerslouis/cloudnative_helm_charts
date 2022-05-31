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
 - account: admin
 - password: decoded password you get in previous instruction.

## Create app

1. Press `NEW APP` button
2. Press `EDIT AS YAML` button
3. add setting

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: tsmc
spec:
  destination:
    name: ''
    namespace: default
    server: 'https://kubernetes.default.svc'
  source:
    path: tsmc
    repoURL: 'https://github.com/gamerslouis/cloudnative_helm_charts.git'
    targetRevision: HEAD
  project: default
  syncPolicy:
    automated:
      prune: false
      selfHeal: false

 ```

4. Done. (You can check your k8s)


## Login to Grafana

1. Get `password`

  ```bash
  kubectl get secret tsmc-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
  ```

2. port forward

  ```bash
  kubectl port-forward service/tsmc-grafana 3000:80
  ```

3. Login with admin and `password`
