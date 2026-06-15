package com.pvphud.screen;

import net.minecraft.client.gui.screen.Screen;
import net.minecraft.client.gui.widget.ButtonWidget;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.text.Text;
import com.pvphud.config.HudConfig;

/**
 * HUD 配置菜单屏幕
 */
public class HudConfigScreen extends Screen {
    private final Screen parent;
    private final HudConfig config;
    
    private ButtonWidget healthBarToggle;
    private ButtonWidget armorBarToggle;
    private ButtonWidget hungerBarToggle;
    private ButtonWidget targetInfoToggle;
    private ButtonWidget saveButton;
    private ButtonWidget backButton;
    
    public HudConfigScreen(Screen parent) {
        super(Text.literal("PvP HUD 配置"));
        this.parent = parent;
        this.config = HudConfig.getInstance();
    }
    
    @Override
    protected void init() {
        int centerX = this.width / 2;
        int centerY = this.height / 2;
        int buttonWidth = 150;
        int buttonHeight = 20;
        int spacing = 30;
        
        // 生命值条切换
        this.healthBarToggle = ButtonWidget.builder(
            Text.literal("生命值条: " + (config.showHealthBar ? "ON" : "OFF")),
            button -> {
                config.showHealthBar = !config.showHealthBar;
                updateButtonText();
            }
        ).dimensions(centerX - buttonWidth / 2, centerY - 60, buttonWidth, buttonHeight).build();
        this.addDrawableChild(this.healthBarToggle);
        
        // 护甲条切换
        this.armorBarToggle = ButtonWidget.builder(
            Text.literal("护甲条: " + (config.showArmorBar ? "ON" : "OFF")),
            button -> {
                config.showArmorBar = !config.showArmorBar;
                updateButtonText();
            }
        ).dimensions(centerX - buttonWidth / 2, centerY - 30, buttonWidth, buttonHeight).build();
        this.addDrawableChild(this.armorBarToggle);
        
        // 饥饿条切换
        this.hungerBarToggle = ButtonWidget.builder(
            Text.literal("饥饿条: " + (config.showHungerBar ? "ON" : "OFF")),
            button -> {
                config.showHungerBar = !config.showHungerBar;
                updateButtonText();
            }
        ).dimensions(centerX - buttonWidth / 2, centerY, buttonWidth, buttonHeight).build();
        this.addDrawableChild(this.hungerBarToggle);
        
        // 目标信息切换
        this.targetInfoToggle = ButtonWidget.builder(
            Text.literal("目标信息: " + (config.showTargetInfo ? "ON" : "OFF")),
            button -> {
                config.showTargetInfo = !config.showTargetInfo;
                updateButtonText();
            }
        ).dimensions(centerX - buttonWidth / 2, centerY + 30, buttonWidth, buttonHeight).build();
        this.addDrawableChild(this.targetInfoToggle);
        
        // 保存按钮
        this.saveButton = ButtonWidget.builder(
            Text.literal("保存"),
            button -> {
                config.save();
                this.client.setScreen(parent);
            }
        ).dimensions(centerX - 75, centerY + 70, 70, buttonHeight).build();
        this.addDrawableChild(this.saveButton);
        
        // 返回按钮
        this.backButton = ButtonWidget.builder(
            Text.literal("返回"),
            button -> this.client.setScreen(parent)
        ).dimensions(centerX + 5, centerY + 70, 70, buttonHeight).build();
        this.addDrawableChild(this.backButton);
    }
    
    private void updateButtonText() {
        this.healthBarToggle.setMessage(Text.literal("生命值条: " + (config.showHealthBar ? "ON" : "OFF")));
        this.armorBarToggle.setMessage(Text.literal("护甲条: " + (config.showArmorBar ? "ON" : "OFF")));
        this.hungerBarToggle.setMessage(Text.literal("饥饿条: " + (config.showHungerBar ? "ON" : "OFF")));
        this.targetInfoToggle.setMessage(Text.literal("目标信息: " + (config.showTargetInfo ? "ON" : "OFF")));
    }
    
    @Override
    public void render(DrawContext drawContext, int mouseX, int mouseY, float delta) {
        this.renderBackground(drawContext);
        drawContext.drawCenteredTextWithShadow(this.textRenderer, this.title, this.width / 2, 20, 0xFFFFFF);
        drawContext.drawCenteredTextWithShadow(this.textRenderer, Text.literal("按 SHIFT 关闭菜单"), this.width / 2, this.height - 20, 0xAAAAAA);
        super.render(drawContext, mouseX, mouseY, delta);
    }
    
    @Override
    public boolean keyPressed(int keyCode, int scanCode, int modifiers) {
        // Shift 键关闭菜单
        if (keyCode == 340) { // Shift 键代码
            this.client.setScreen(parent);
            return true;
        }
        return super.keyPressed(keyCode, scanCode, modifiers);
    }
    
    @Override
    public void close() {
        this.client.setScreen(parent);
    }
}
