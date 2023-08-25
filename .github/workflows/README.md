This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node

For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

## ssh 配置步骤：

1. 生成密钥：ssh-keygen -t rsa -b 4096 -C "ymblender@gmail.com", 输入名称为 github-actioner
2. 拷贝 SSH_PRIVATE_KEY 的 公钥需要添加到目标服务器，并且添加到 .ssh/authorized_keys 中，操作如下 rsync -av github-actions.pub ubuntu@111.111.111.111:~/.ssh cat github-actions.pub >> authorized_keys
3. 在 github/项目/setting/Actions secrets 中，添加 SSH_PRIVATE_KEY, 从 Begin 复制到 End, 例子: -----BEGIN OPENSSH PRIVATE KEY----- xxxxx -----END OPENSSH PRIVATE KEY-----
4. 在 github/项目/setting/Actions secrets 中，添加 SSH_URL, 例子：ubuntu@111.111.111.111
