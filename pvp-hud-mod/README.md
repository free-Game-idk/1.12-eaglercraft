# PvP HUD Mod 🎮

一个现代的 Minecraft 1.21 PvP HUD 显示模组，提供实时的血条、护甲和饥饿显示。

## 功能特性 ✨

- **生命值条** - 实时显示玩家生命值，颜色根据健康度变化
- **护甲条** - 显示当前护甲值
- **饥饿条** - 显示饥饿值
- **目标信息** - 显示准星指向的玩家信息（名字、生命值、距离）
- **现代 UI** - 简洁的 HUD 设计，不会影响游戏体验

## 颜色代码 🎨

- **生命值条**
  - 🟢 绿色：健康度 > 75%
  - 🟡 黄色：50% < 健康度 ≤ 75%
  - 🟠 橙色：25% < 健康度 ≤ 50%
  - 🔴 红色：健康度 ≤ 25%

- **护甲条** - 青蓝色 (Cyan)
- **饥饿条** - 橙色 (Orange)

## 安装 📥

1. 确保已安装 [Fabric Loader](https://fabricmc.net/use/installer/)
2. 下载 mod jar 文件
3. 将 jar 文件放入 `mods` 文件夹
4. 启动游戏

## 编译 🔨

```bash
cd pvp-hud-mod
./gradlew build
```

编译好的 jar 文件会在 `build/libs/` 目录中。

## 需求 📋

- Java 21+
- Minecraft 1.21.0
- Fabric Loader 0.15.0+
- Fabric API 0.97.0+

## 项目结构 📁

```
pvp-hud-mod/
├── src/main/java/com/pvphud/
│   ├── PvPHudMod.java           # 主模组类
│   ├── client/
│   │   ├── PvPHudClient.java    # 客户端初始化
│   │   └── PvPHudRenderer.java  # HUD 渲染逻辑
│   └── mixin/
│       └── ClientPlayerEntityMixin.java
├── src/main/resources/
│   ├── fabric.mod.json          # 模组元数据
│   └── pvphud.mixins.json       # Mixin 配置
├── build.gradle                 # Gradle 构建配置
└── README.md
```

## 许可证 📜

MIT License

## 作者 👨‍💻

free-Game-idk

## 贡献 🤝

欢迎提交 Issue 和 Pull Request！
