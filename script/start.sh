echo "开始进入部署"
echo "开始安装依赖"

yarn dep:install

echo "依赖安装完毕, 开始打包"
yarn build

echo "打包完毕, 开启服务"
yarn start