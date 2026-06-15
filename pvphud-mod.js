/**
 * Eaglercraft PvP HUD 模组
 * 按 Shift 打开菜单，选择是否启用模组
 */

(function() {
    'use strict';
    
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
    let shiftPressed = false;
    
    // 创建 HUD 菜单 UI
    function createMenuUI() {
        const menuId = 'pvphud-menu';
        if (document.getElementById(menuId)) {
            return document.getElementById(menuId);
        }
        
        const menu = document.createElement('div');
        menu.id = menuId;
        menu.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            background: rgba(0, 0, 0, 0.9);
            border: 3px solid #00FF00;
            border-radius: 10px;
            padding: 20px;
            color: white;
            font-family: Arial, sans-serif;
            z-index: 10000;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
            display: none;
        `;
        
        menu.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #00FF00; margin: 0; font-size: 24px;">PvP HUD 模组</h2>
                <p style="color: #888; margin: 5px 0 0 0; font-size: 12px;">按 ESC 关闭菜单</p>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="pvphud-toggle-main" style="width: 20px; height: 20px; margin-right: 10px;" ${HudModConfig.enabled ? 'checked' : ''}>
                    <span style="font-size: 14px;">启用模组</span>
                </label>
                <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="pvphud-toggle-health" style="width: 20px; height: 20px; margin-right: 10px;" ${HudModConfig.showHealthBar ? 'checked' : ''} ${HudModConfig.enabled ? '' : 'disabled'}>
                    <span style="font-size: 14px;">❤ 生命值条</span>
                </label>
                <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="pvphud-toggle-armor" style="width: 20px; height: 20px; margin-right: 10px;" ${HudModConfig.showArmorBar ? 'checked' : ''} ${HudModConfig.enabled ? '' : 'disabled'}>
                    <span style="font-size: 14px;">🛡️ 护甲条</span>
                </label>
                <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="pvphud-toggle-hunger" style="width: 20px; height: 20px; margin-right: 10px;" ${HudModConfig.showHungerBar ? 'checked' : ''} ${HudModConfig.enabled ? '' : 'disabled'}>
                    <span style="font-size: 14px;">🍖 饥饿条</span>
                </label>
                <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="pvphud-toggle-target" style="width: 20px; height: 20px; margin-right: 10px;" ${HudModConfig.showTargetInfo ? 'checked' : ''} ${HudModConfig.enabled ? '' : 'disabled'}>
                    <span style="font-size: 14px;">👁️ 目标信息</span>
                </label>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button id="pvphud-save-btn" style="flex: 1; padding: 10px; background: #00FF00; color: black; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; font-size: 14px;">
                    保存
                </button>
                <button id="pvphud-close-btn" style="flex: 1; padding: 10px; background: #FF0000; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; font-size: 14px;">
                    关闭
                </button>
            </div>
        `;
        
        document.body.appendChild(menu);
        return menu;
    }
    
    // 打开菜单
    function openMenu() {
        if (menuOpen) return;
        menuOpen = true;
        const menu = createMenuUI();
        menu.style.display = 'block';
        
        // 事件绑定
        document.getElementById('pvphud-toggle-main').addEventListener('change', function() {
            const isEnabled = this.checked;
            document.getElementById('pvphud-toggle-health').disabled = !isEnabled;
            document.getElementById('pvphud-toggle-armor').disabled = !isEnabled;
            document.getElementById('pvphud-toggle-hunger').disabled = !isEnabled;
            document.getElementById('pvphud-toggle-target').disabled = !isEnabled;
        });
        
        document.getElementById('pvphud-save-btn').addEventListener('click', saveSettings);
        document.getElementById('pvphud-close-btn').addEventListener('click', closeMenu);
    }
    
    // 关闭菜单
    function closeMenu() {
        menuOpen = false;
        const menu = document.getElementById('pvphud-menu');
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
        
        closeMenu();
        alert('设置已保存！');
    }
    
    // 键盘事件监听
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Shift') {
            if (!shiftPressed) {
                shiftPressed = true;
                openMenu();
            }
        }
        if (e.key === 'Escape' && menuOpen) {
            closeMenu();
        }
    });
    
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Shift') {
            shiftPressed = false;
        }
    });
    
    // 创建 HUD 画布
    function createHudCanvas() {
        const canvasId = 'pvphud-canvas';
        if (document.getElementById(canvasId)) {
            return;
        }
        
        const canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(canvas);
        resizeHudCanvas();
        
        // 监听窗口大小变化
        window.addEventListener('resize', resizeHudCanvas);
        
        // 开始绘制 HUD
        renderHud();
    }
    
    // 调整 HUD 画布大小
    function resizeHudCanvas() {
        const canvas = document.getElementById('pvphud-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    
    // 获取玩家信息（从 Eaglercraft 游戏对象）
    function getPlayerInfo() {
        // 这是一个示例实现，实际需要根据 Eaglercraft 的 API 调整
        try {
            if (typeof window.eaglercraftX !== 'undefined' && window.eaglercraftX.player) {
                return window.eaglercraftX.player;
            }
        } catch(e) {}
        return null;
    }
    
    // 渲染 HUD
    function renderHud() {
        if (!HudModConfig.enabled) {
            requestAnimationFrame(renderHud);
            return;
        }
        
        const canvas = document.getElementById('pvphud-canvas');
        if (!canvas) {
            requestAnimationFrame(renderHud);
            return;
        }
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const x = 10;
        let y = 10;
        
        // 示例：绘制一个简单的 HUD 信息
        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('[PvP HUD 已启用]', x, y);
        
        if (HudModConfig.showHealthBar) {
            y += 25;
            drawHealthBar(ctx, x, y);
        }
        
        if (HudModConfig.showArmorBar) {
            y += 30;
            drawArmorBar(ctx, x, y);
        }
        
        if (HudModConfig.showHungerBar) {
            y += 30;
            drawHungerBar(ctx, x, y);
        }
        
        requestAnimationFrame(renderHud);
    }
    
    // 绘制生命值条
    function drawHealthBar(ctx, x, y) {
        ctx.fillStyle = '#333333';
        ctx.fillRect(x, y, 150, 15);
        
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(x, y, 75, 15);
        
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, 150, 15);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('❤ 10/20', x + 60, y + 11);
    }
    
    // 绘制护甲条
    function drawArmorBar(ctx, x, y) {
        ctx.fillStyle = '#333333';
        ctx.fillRect(x, y, 150, 15);
        
        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(x, y, 100, 15);
        
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, 150, 15);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('🛡️ 20', x + 60, y + 11);
    }
    
    // 绘制饥饿条
    function drawHungerBar(ctx, x, y) {
        ctx.fillStyle = '#333333';
        ctx.fillRect(x, y, 150, 15);
        
        ctx.fillStyle = '#FFAA00';
        ctx.fillRect(x, y, 150, 15);
        
        ctx.strokeStyle = '#FFAA00';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, 150, 15);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('🍖 20/20', x + 50, y + 11);
    }
    
    // 初始化模组
    function initMod() {
        console.log('[PvP HUD] 模组已加载');
        createHudCanvas();
    }
    
    // 等待游戏加载完成后初始化
    window.addEventListener('load', function() {
        setTimeout(initMod, 2000);
    });
    
    // 如果游戏已经加载，直接初始化
    if (document.readyState === 'complete') {
        setTimeout(initMod, 500);
    }
})();
