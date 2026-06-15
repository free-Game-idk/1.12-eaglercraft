/**
 * Eaglercraft PvP HUD 模组 - 改进版
 * 修复了按键检测和菜单显示问题
 */

(function() {
    'use strict';
    
    console.log('[PvP HUD] 模组开始加载...');
    
    // 模组配置
    const HudModConfig = {
        enabled: localStorage.getItem('pvphud_enabled') !== 'false',
        showHealthBar: localStorage.getItem('pvphud_health') !== 'false',
        showArmorBar: localStorage.getItem('pvphud_armor') !== 'false',
        showHungerBar: localStorage.getItem('pvphud_hunger') !== 'false',
        showTargetInfo: localStorage.getItem('pvphud_target') !== 'false'
    };
    
    // 菜单状态
    let menuOpen = false;
    let keysPressed = {};
    
    console.log('[PvP HUD] 配置已加载:', HudModConfig);
    
    // 创建 HUD 菜单 UI
    function createMenuUI() {
        const menuId = 'pvphud-menu-container';
        let menu = document.getElementById(menuId);
        
        if (menu) {
            console.log('[PvP HUD] 菜单已存在');
            return menu;
        }
        
        menu = document.createElement('div');
        menu.id = menuId;
        menu.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 450px;
            background: rgba(0, 0, 0, 0.95);
            border: 4px solid #00FF00;
            border-radius: 15px;
            padding: 30px;
            color: white;
            font-family: Arial, sans-serif;
            z-index: 999999;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.7), inset 0 0 20px rgba(0, 255, 0, 0.2);
            display: none;
            user-select: none;
            -webkit-user-select: none;
        `;
        
        menu.innerHTML = `
            <div style="text-align: center; margin-bottom: 25px;">
                <h2 style="color: #00FF00; margin: 0; font-size: 28px; text-shadow: 0 0 10px #00FF00;">⚔️ PvP HUD 模组</h2>
                <p style="color: #00AA00; margin: 8px 0 0 0; font-size: 13px;">⚠️ 按 ESC 或 Shift 关闭</p>
            </div>
            
            <div style="margin-bottom: 20px; border-bottom: 2px solid #00FF00; padding-bottom: 15px;">
                <div style="margin-bottom: 12px;">
                    <label style="display: flex; align-items: center; cursor: pointer; padding: 8px; border-radius: 5px;">
                        <input type="checkbox" id="pvphud-toggle-main" style="width: 22px; height: 22px; margin-right: 12px; cursor: pointer;" ${HudModConfig.enabled ? 'checked' : ''}>
                        <span style="font-size: 15px; font-weight: bold; color: #00FF00;">🔧 启用整个模组</span>
                    </label>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <p style="color: #00AA00; font-size: 12px; margin: 0 0 10px 0; text-transform: uppercase;">HUD 显示项目:</p>
                
                <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer; padding: 8px; border-radius: 5px;">
                    <input type="checkbox" id="pvphud-toggle-health" style="width: 20px; height: 20px; margin-right: 10px; cursor: pointer;" ${HudModConfig.showHealthBar ? 'checked' : ''} ${HudModConfig.enabled ? '' : 'disabled'}>
                    <span style="font-size: 14px;">❤️ 生命值条</span>
                </label>
                
                <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer; padding: 8px; border-radius: 5px;">
                    <input type="checkbox" id="pvphud-toggle-armor" style="width: 20px; height: 20px; margin-right: 10px; cursor: pointer;" ${HudModConfig.showArmorBar ? 'checked' : ''} ${HudModConfig.enabled ? '' : 'disabled'}>
                    <span style="font-size: 14px;">🛡️ 护甲条</span>
                </label>
                
                <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer; padding: 8px; border-radius: 5px;">
                    <input type="checkbox" id="pvphud-toggle-hunger" style="width: 20px; height: 20px; margin-right: 10px; cursor: pointer;" ${HudModConfig.showHungerBar ? 'checked' : ''} ${HudModConfig.enabled ? '' : 'disabled'}>
                    <span style="font-size: 14px;">🍖 饥饿条</span>
                </label>
                
                <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer; padding: 8px; border-radius: 5px;">
                    <input type="checkbox" id="pvphud-toggle-target" style="width: 20px; height: 20px; margin-right: 10px; cursor: pointer;" ${HudModConfig.showTargetInfo ? 'checked' : ''} ${HudModConfig.enabled ? '' : 'disabled'}>
                    <span style="font-size: 14px;">👁️ 目标信息</span>
                </label>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 25px;">
                <button id="pvphud-save-btn" style="flex: 1; padding: 12px; background: #00FF00; color: #000; border: 2px solid #00AA00; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 15px; transition: all 0.2s; box-shadow: 0 0 10px rgba(0,255,0,0.3);">
                    ✅ 保存
                </button>
                <button id="pvphud-close-btn" style="flex: 1; padding: 12px; background: #FF3333; color: #fff; border: 2px solid #CC0000; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 15px; transition: all 0.2s; box-shadow: 0 0 10px rgba(255,0,0,0.3);">
                    ❌ 关闭
                </button>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #00FF00; text-align: center;">
                <p style="color: #666; font-size: 11px; margin: 0;">v1.1 | 按 SHIFT 打开菜单</p>
            </div>
        `;
        
        // 保证菜单始终低于游戏界面
        menu.addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
        
        document.body.appendChild(menu);
        console.log('[PvP HUD] 菜单已创建');
        return menu;
    }
    
    // 打开菜单
    function openMenu() {
        if (menuOpen) return;
        menuOpen = true;
        console.log('[PvP HUD] 打开菜单');
        
        const menu = createMenuUI();
        menu.style.display = 'block';
        
        // 事件绑定
        const mainToggle = document.getElementById('pvphud-toggle-main');
        if (mainToggle) {
            mainToggle.addEventListener('change', function() {
                const isEnabled = this.checked;
                document.getElementById('pvphud-toggle-health').disabled = !isEnabled;
                document.getElementById('pvphud-toggle-armor').disabled = !isEnabled;
                document.getElementById('pvphud-toggle-hunger').disabled = !isEnabled;
                document.getElementById('pvphud-toggle-target').disabled = !isEnabled;
            });
        }
        
        const saveBtn = document.getElementById('pvphud-save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveSettings);
        }
        
        const closeBtn = document.getElementById('pvphud-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }
    }
    
    // 关闭菜单
    function closeMenu() {
        menuOpen = false;
        console.log('[PvP HUD] 关闭菜单');
        const menu = document.getElementById('pvphud-menu-container');
        if (menu) {
            menu.style.display = 'none';
        }
    }
    
    // 保存设置
    function saveSettings() {
        HudModConfig.enabled = document.getElementById('pvphud-toggle-main').checked;
        HudModConfig.showHealthBar = document.getElementById('pvphud-toggle-health').checked;
        HudModConfig.showArmorBar = document.getElementById('pvphud-toggle-armor').checked;
        HudModConfig.showHungerBar = document.getElementById('pvphud-toggle-hunger').checked;
        HudModConfig.showTargetInfo = document.getElementById('pvphud-toggle-target').checked;
        
        localStorage.setItem('pvphud_enabled', HudModConfig.enabled);
        localStorage.setItem('pvphud_health', HudModConfig.showHealthBar);
        localStorage.setItem('pvphud_armor', HudModConfig.showArmorBar);
        localStorage.setItem('pvphud_hunger', HudModConfig.showHungerBar);
        localStorage.setItem('pvphud_target', HudModConfig.showTargetInfo);
        
        console.log('[PvP HUD] 设置已保存:', HudModConfig);
        closeMenu();
    }
    
    // 改进的键盘事件监听
    document.addEventListener('keydown', function(e) {
        keysPressed[e.code] = true;
        
        // 检测 Shift 键
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
            console.log('[PvP HUD] 检测到 Shift 按下');
            if (!menuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
            e.preventDefault();
            e.stopPropagation();
        }
        
        // ESC 键关闭菜单
        if (e.code === 'Escape' && menuOpen) {
            closeMenu();
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
    
    document.addEventListener('keyup', function(e) {
        keysPressed[e.code] = false;
    }, true);
    
    // 创建 HUD 画布
    function createHudCanvas() {
        const canvasId = 'pvphud-canvas-display';
        if (document.getElementById(canvasId)) {
            console.log('[PvP HUD] 画布已存在');
            return;
        }
        
        const canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9998;
            pointer-events: none;
        `;
        
        document.body.appendChild(canvas);
        console.log('[PvP HUD] 画布已创建');
        
        resizeHudCanvas();
        window.addEventListener('resize', resizeHudCanvas);
        
        // 开始渲染 HUD
        renderHud();
    }
    
    // 调整 HUD 画布大小
    function resizeHudCanvas() {
        const canvas = document.getElementById('pvphud-canvas-display');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    
    // 渲染 HUD
    function renderHud() {
        const canvas = document.getElementById('pvphud-canvas-display');
        if (!canvas) {
            requestAnimationFrame(renderHud);
            return;
        }
        
        if (!HudModConfig.enabled) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(renderHud);
            return;
        }
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const x = 20;
        let y = 20;
        
        // 绘制模组状态标签
        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 18px Arial';
        ctx.fillText('[PvP HUD 模组已启用]', x, y);
        ctx.fillStyle = '#00AA00';
        ctx.font = '12px Arial';
        ctx.fillText('👁️ 按 SHIFT 打开菜单', x, y + 20);
        
        if (HudModConfig.showHealthBar) {
            y += 50;
            drawHealthBar(ctx, x, y);
        }
        
        if (HudModConfig.showArmorBar) {
            y += 40;
            drawArmorBar(ctx, x, y);
        }
        
        if (HudModConfig.showHungerBar) {
            y += 40;
            drawHungerBar(ctx, x, y);
        }
        
        requestAnimationFrame(renderHud);
    }
    
    // 绘制生命值条
    function drawHealthBar(ctx, x, y) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(x - 2, y - 2, 160, 22);
        
        ctx.fillStyle = '#333333';
        ctx.fillRect(x, y, 150, 18);
        
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(x, y, 75, 18);
        
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 150, 18);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px Arial';
        ctx.fillText('❤️ 10/20 HP', x + 5, y + 13);
    }
    
    // 绘制护甲条
    function drawArmorBar(ctx, x, y) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(x - 2, y - 2, 160, 22);
        
        ctx.fillStyle = '#333333';
        ctx.fillRect(x, y, 150, 18);
        
        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(x, y, 100, 18);
        
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 150, 18);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px Arial';
        ctx.fillText('🛡️ 20 护甲', x + 5, y + 13);
    }
    
    // 绘制饥饿条
    function drawHungerBar(ctx, x, y) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(x - 2, y - 2, 160, 22);
        
        ctx.fillStyle = '#333333';
        ctx.fillRect(x, y, 150, 18);
        
        ctx.fillStyle = '#FFAA00';
        ctx.fillRect(x, y, 150, 18);
        
        ctx.strokeStyle = '#FFAA00';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 150, 18);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px Arial';
        ctx.fillText('🍖 20/20 饥饿', x + 5, y + 13);
    }
    
    // 初始化模组
    function initMod() {
        console.log('[PvP HUD] 初始化模组...');
        createMenuUI();
        createHudCanvas();
        console.log('[PvP HUD] 模组初始化完成！按 Shift 打开菜单');
    }
    
    // 尽早加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMod);
    } else {
        initMod();
    }
    
    // 也在窗口加载事件时启动
    window.addEventListener('load', initMod);
})();
