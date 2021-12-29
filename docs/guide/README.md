
# 起步

ELCube 是一个轻量级的企业应用开发模型，才用后端Java前端Vue的前后端分离模式开发，
因此安装ELCube需要满足下述安装环境要求，并同时部署服务端程序及WEB端资源文件，并通过反向代理向外提供服务。

## 安装环境

|环境|要求|说明|
|--|--|--|
|JAVA|jdk1.8+|推荐使用Oracle JDK|
|RDBMS|MySQL5.6、Oracle9、10、11等|支持各大主流关系型数据库|
|Redis|v2.0+|推荐分配内容2G以上|
|ElasticSearch|v7.7.1,v7.9.3|推荐7.9.3版本，集群3个节点以上|
|Nginx|v1.14.0+||


## 开发环境

|环境|要求|说明|
|--|--|--|
|git|v2.23+|版本管理|
|maven|v2.0+|服务端使用Maven构建，推荐使用Maven3|
|node.js|v14.8.0+|WEB端使用node环境构建|
|npm|v6.0+|WEB端包管理器|

## 源码下载

ELCube 通过Gitee进行代码托管，您可以从下述地址check代码

* Java服务端
[https://gitee.com/newcorenet/elcube-backend](https://gitee.com/newcorenet/elcube-backend)

* Vue前端
[https://gitee.com/newcorenet/elcube-front](https://gitee.com/newcorenet/elcube-front)

## 运行

### 配置服务端

`elcube-backend/application` 模块是ELCube的入口模块

在`application-dev.yml`中配置您的资源连接

```yaml
nk:
  # env-key 不是必须的，它允许您在同一个ElasticSearch应用下启动多个ELCube程序，并作为索引名的前缀
  env-key: elcube_rd
  # env-name 不是必须的，它会在主界面显示，可用于区分不同的应用环境，如dev、poc等，生产环境下推荐为空
  env-name: 研发环境2.0
  # 文件上传的存储路径，如不使用外部文件存储服务，则必须设置
  file-root-path: /home/user/files
  compress:
    enabled: false
  # 需要扫描的脚本对象所在的java package
  component-base-packages:
    - cn.nkpro.elcube.components
  # 是否禁用在线编码，验证阶段，推荐true
  component-disable-online-editing: true
  # 是否优先从classpath加载脚本对象，验证阶段，推荐true
  component-reload-class-path: true
  doc:
    indices:
      - demo-index: cn.nkpro.elcube.docengine.model.es.DocExtES
spring:
  # 数据库连接部分
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/elcube
    username: root
    password: password
    driver-class-name: com.mysql.jdbc.Driver
  # Redis连接部分
  redis:
    host: 127.0.0.1
    port: 6379
    password: password
  # ElasticSearch连接部分
  elasticsearch:
    rest:
      uris: ["http://127.0.0.1:9200"]
      username: elastic
      password: password
  # 自动创建数据库表
  liquibase:
    enabled: true
```

### 运行服务端

* 通过SpringBoot入口类`ELCubeApplication`启动应用

* 第一次启动时，`ELCube`会根据`yml`配置自动创建数据库表及ElasticSearch的索引结构

* 初始化管理员账号为 `admin` / `admin`

* Java服务的默认端口配置为 `9200`，当然你也可以通过yml配置修改

### 运行WEB端

```shell script
# 安装依赖项
npm install
# 启动前端服务
npm run dev
```

* WEB端默认端口号为`7200`

点击这里[http://localhost:7200](http://localhost:7200)试着登陆体验

## 服务器部署


### 硬件配置

* 服务器支持 Linux、Windows Server 2008+ 等操作系统
* 推荐使用Linux部署，支持Centos、Ubuntu等主流Linux发行版，支持Docker方式部署

|环境|最低配置|推荐配置|
|--|--|--|
|演示部署|4c8g 存储500G<br>所有服务安装在一台服务器上，作为演示部署|4c8g 存储500G 2台<br>数据库与应用独立部署|
|生产部署|4c8g 存储500G 2台<br>数据库与应用独立部署，应用服务器兼顾数据备份|根据实际业务压力部署|

### 部署

* 通过maven命令打包服务端程序

```shell script
mvn clean compile package
```

* 通过node命令打包WEB端程序
```shell script
npm run build
```

* 分别将服务端jar文件`elcube-application.jar`及WEB端`dist`文件夹 上传到服务器

* 配置nginx代理

```
server {
        listen       80;
        server_name  demo.youdomain.cn;

        gzip on;
        gzip_min_length 1k;
        gzip_comp_level 1;
        gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript;
        gzip_vary on;
        gzip_buffers 2 4k;
        gzip_http_version 1.1;

        location / {
                root /nk/applications/resources/dist;
                index index.html;
        }

        location /api/ {
                proxy_pass              http://localhost:9200/;
                proxy_set_header        Host                    $host;
                proxy_set_header        X-Real-IP               $remote_addr;
                proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;
                proxy_set_header        X-Forwarded-Proto       $scheme;
        }

}
```

* 在服务器端启动程序

```shell script
java -jar elcube-application.jar
```