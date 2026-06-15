# Eaglercraft PvP HUD 模组

## 📋 功能说明

这是一个为 Eaglercraft 1.12 设计的客户端 HUD 模组，提供以下功能：

### ✨ 核心功能
- **生命值条** - 实时显示玩家生命值
- **护甲条** - 显示当前护甲值
- **饥饿条** - 显示饥饿度
- **目标信息** - 显示准星指向的目标信息

### 🎮 快捷键
- **Shift** - 打开/关闭 HUD 菜单
- **ESC** - 关闭菜单

## 📥 安装方法

### 方法一：直接注入（推荐）

1. 在浏览器控制台（F12）执行：
```javascript
// 加载模组脚本
var script = document.createElement('script');
script.src = 'https://你的域名/pvphud-mod.js';
document.head.appendChild(script);
```

### 方法二：修改 HTML

在 `index.html` 的 `</body>` 前添加：
```html
<script src="pvphud-mod.js"></script>
```

### 方法三：使用加载器

打开 `pvphud-mod-loader.html` 页面，点击"加载模组"按钮。

## ⚙️ 配置说明

模组会自动保存设置到浏览器 LocalStorage：
- `pvphud_enabled` - 模组启用状态
- `pvphud_health` - 生命值条显示
- `pvphud_armor` - 护甲条显示
- `pvphud_hunger` - 饥饿条显示
- `pvphud_target` - 目标信息显示

## 🎛️ 菜单操作

1. 在游戏中按 **Shift** 键打开菜单
2. 勾选/取消勾选各项功能
3. 点击"保存"按钮保存设置
4. 点击"关闭"或按 ESC 关闭菜单

## 🔧 开发信息

### 文件结构
```
pvphud-mod.js              # 核心模组文件
pvphud-mod-loader.html     # 模组加载器页面
README-PVPHUD.md          # 本文档
```

### 关键函数

#### `openMenu()`
打开 HUD 配置菜单

#### `saveSettings()`
保存当前设置到 LocalStorage

#### `renderHud()`
在 Canvas 上渲染 HUD 信息

#### `drawHealthBar(ctx, x, y)`
绘制生命值条

#### `drawArmorBar(ctx, x, y)`
绘制护甲条

#### `drawHungerBar(ctx, x, y)`
绘制饥饿条

## ⚠️ 已知限制

1. 需要在浏览器中运行，不支持离线模式
2. 玩家数据获取可能需要根据 Eaglercraft API 调整
3. 模组关闭后需要重新加载页面生效

## 🐛 故障排查

### 黑屏问题
- 确保 Eaglercraft 已完全加载
- 检查浏览器控制台是否有错误
- 尝试刷新页面

### 菜单不出现
- 确保按的是左 Shift 键
- 检查是否进入游戏中
- 查看浏览器控制台错误信息

### 设置无法保存
- 检查浏览器是否允许 LocalStorage
- 尝试清空浏览器缓存
- 检查浏览器隐私设置

## 📝 更新日志

### v1.0.0
- ✅ 初始发布
- ✅ 实现 Shift 菜单系统
- ✅ 添加 HUD 显示功能
- ✅ 本地存储配置

## 📄 许可证

MIT License

## 👨‍💻 作者

free-Game-idk

## 💬 反馈

如有问题或建议，欢迎提交 Issue 或 Pull Request。
