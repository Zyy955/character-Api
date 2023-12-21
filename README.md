## 使用方法

1. 克隆本仓
```
git clone --depth=1 https://github.com/Zyy955/character-Api.git
```

2. 进入主目录
```
cd character-Api
```

3. 克隆咕咕牛图仓
```
git clone --depth=1 https://github.com/GuGuNiu/Miao-Plugin-MBT.git ./data
```

4. 安装pnpm ，已安装的可以跳过
```
npm --registry=https://registry.npmmirror.com install pnpm -g
```

5. 安装依赖
```
pnpm install
```

6. 运行

```
node app
```

7. 修改喵喵

- 打开 `./plugins/miao-plugin/resources/character/profile-detail.html`
- 修改第18行 `<div class="main-pic" style="background-image:url({{_res_path}}{{costumeSplash||imgs?.splash}})"></div>` 为以下

```
<div class="main-pic" style="background-image:url(http://127.0.0.1:3000/api/miao?name={{data.name}})"></div>
```

8. 开始享受