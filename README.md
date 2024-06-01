# Docker Workflow

1. Run: `docker build -t webdevforest/vas-fe:react-v1.0.2 .` (change tag everytime run build)
2. Run: `docker push webdevforest/vas-fe:react-v1.0.2` (change tag everytime run push)
3. Login to server to update tag `ssh administrator@10.90.24.200 -p 9909` pass: server9@9@
4. Run: `docker service update --image webdevforest/vas-fe:react-v1.0.4 --with-registry-auth vas-fe` (change tag everytime run it)
