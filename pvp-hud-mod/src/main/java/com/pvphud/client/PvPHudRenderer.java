package com.pvphud.client;

import net.minecraft.client.MinecraftClient;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.client.util.math.MatrixStack;
import net.minecraft.entity.LivingEntity;
import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.util.hit.EntityHitResult;
import net.minecraft.util.hit.HitResult;
import com.pvphud.config.HudConfig;
import org.lwjgl.glfw.GLFW;

public class PvPHudRenderer {
    private static final int BAR_WIDTH = 100;
    private static final int BAR_HEIGHT = 10;
    private static final int BAR_PADDING = 5;

    /**
     * 绘制生命值条
     */
    public static void renderHealthBar(DrawContext drawContext, PlayerEntity player, int x, int y) {
        HudConfig config = HudConfig.getInstance();
        if (!config.showHealthBar) return;
        
        float health = player.getHealth();
        float maxHealth = player.getMaxHealth();
        float healthPercent = health / maxHealth;

        // 绘制背景
        drawContext.fill(x, y, x + BAR_WIDTH, y + BAR_HEIGHT, 0xFF000000);

        // 绘制生命值条
        int healthColor = getHealthColor(healthPercent);
        int filledWidth = (int) (BAR_WIDTH * healthPercent);
        drawContext.fill(x, y, x + filledWidth, y + BAR_HEIGHT, healthColor);

        // 绘制边框
        drawContext.fill(x, y, x + BAR_WIDTH, y + 1, 0xFFFFFFFF);
        drawContext.fill(x, y + BAR_HEIGHT - 1, x + BAR_WIDTH, y + BAR_HEIGHT, 0xFFFFFFFF);
        drawContext.fill(x, y, x + 1, y + BAR_HEIGHT, 0xFFFFFFFF);
        drawContext.fill(x + BAR_WIDTH - 1, y, x + BAR_WIDTH, y + BAR_HEIGHT, 0xFFFFFFFF);

        // 绘制文本
        String healthText = String.format("❤ %.1f/%.1f", health, maxHealth);
        drawContext.drawText(MinecraftClient.getInstance().textRenderer, healthText, x + BAR_PADDING, y + 2, 0xFFFFFF, true);
    }

    /**
     * 绘制护甲条
     */
    public static void renderArmorBar(DrawContext drawContext, PlayerEntity player, int x, int y) {
        HudConfig config = HudConfig.getInstance();
        if (!config.showArmorBar) return;
        
        int armor = player.getArmor();
        int maxArmor = 20;
        float armorPercent = (float) armor / maxArmor;

        // 绘制背景
        drawContext.fill(x, y, x + BAR_WIDTH, y + BAR_HEIGHT, 0xFF000000);

        // 绘制护甲条
        int filledWidth = (int) (BAR_WIDTH * armorPercent);
        drawContext.fill(x, y, x + filledWidth, y + BAR_HEIGHT, 0xFF00FFFF);

        // 绘制边框
        drawContext.fill(x, y, x + BAR_WIDTH, y + 1, 0xFFFFFFFF);
        drawContext.fill(x, y + BAR_HEIGHT - 1, x + BAR_WIDTH, y + BAR_HEIGHT, 0xFFFFFFFF);
        drawContext.fill(x, y, x + 1, y + BAR_HEIGHT, 0xFFFFFFFF);
        drawContext.fill(x + BAR_WIDTH - 1, y, x + BAR_WIDTH, y + BAR_HEIGHT, 0xFFFFFFFF);

        // 绘制文本
        String armorText = String.format("🛡 %d", armor);
        drawContext.drawText(MinecraftClient.getInstance().textRenderer, armorText, x + BAR_PADDING, y + 2, 0x00FFFF, true);
    }

    /**
     * 绘制饥饿条
     */
    public static void renderHungerBar(DrawContext drawContext, PlayerEntity player, int x, int y) {
        HudConfig config = HudConfig.getInstance();
        if (!config.showHungerBar) return;
        
        int hunger = player.getHungerManager().getFoodLevel();
        int maxHunger = 20;
        float hungerPercent = (float) hunger / maxHunger;

        // 绘制背景
        drawContext.fill(x, y, x + BAR_WIDTH, y + BAR_HEIGHT, 0xFF000000);

        // 绘制饥饿条
        int filledWidth = (int) (BAR_WIDTH * hungerPercent);
        drawContext.fill(x, y, x + filledWidth, y + BAR_HEIGHT, 0xFFFF8800);

        // 绘制边框
        drawContext.fill(x, y, x + BAR_WIDTH, y + 1, 0xFFFFFFFF);
        drawContext.fill(x, y + BAR_HEIGHT - 1, x + BAR_WIDTH, y + BAR_HEIGHT, 0xFFFFFFFF);
        drawContext.fill(x, y, x + 1, y + BAR_HEIGHT, 0xFFFFFFFF);
        drawContext.fill(x + BAR_WIDTH - 1, y, x + BAR_WIDTH, y + BAR_HEIGHT, 0xFFFFFFFF);

        // 绘制文本
        String hungerText = String.format("🍗 %d", hunger);
        drawContext.drawText(MinecraftClient.getInstance().textRenderer, hungerText, x + BAR_PADDING, y + 2, 0xFFFF88, true);
    }

    /**
     * 绘制目标信息（准星指向的实体）
     */
    public static void renderTargetInfo(DrawContext drawContext, MinecraftClient client, int screenWidth, int screenHeight) {
        HudConfig config = HudConfig.getInstance();
        if (!config.showTargetInfo) return;
        
        if (client.crosshairTarget == null || client.crosshairTarget.getType() != HitResult.Type.ENTITY) {
            return;
        }

        EntityHitResult entityHitResult = (EntityHitResult) client.crosshairTarget;
        if (!(entityHitResult.getEntity() instanceof LivingEntity target)) {
            return;
        }

        // 在屏幕中心下方显示目标信息
        int centerX = screenWidth / 2;
        int centerY = screenHeight / 2 + 20;

        // 目标名称
        String targetName = target.getDisplayName().getString();
        drawContext.drawText(client.textRenderer, targetName, centerX - client.textRenderer.getWidth(targetName) / 2, centerY, 0xFFFF00, true);

        // 如果目标是玩家，显示生命值和距离
        if (target instanceof PlayerEntity targetPlayer) {
            float targetHealth = targetPlayer.getHealth();
            float targetMaxHealth = targetPlayer.getMaxHealth();
            String healthInfo = String.format("❤ %.1f/%.1f", targetHealth, targetMaxHealth);
            drawContext.drawText(client.textRenderer, healthInfo, centerX - client.textRenderer.getWidth(healthInfo) / 2, centerY + 10, 0xFF0000, true);

            double distance = client.player.distanceTo(targetPlayer);
            String distanceInfo = String.format("距离: %.1f", distance);
            drawContext.drawText(client.textRenderer, distanceInfo, centerX - client.textRenderer.getWidth(distanceInfo) / 2, centerY + 20, 0xFFFFFF, true);
        }
    }

    /**
     * 根据生命值百分比获取颜色
     */
    private static int getHealthColor(float healthPercent) {
        if (healthPercent > 0.75f) {
            return 0xFF00FF00; // 绿色
        } else if (healthPercent > 0.5f) {
            return 0xFFFFFF00; // 黄色
        } else if (healthPercent > 0.25f) {
            return 0xFFFF8800; // 橙色
        } else {
            return 0xFFFF0000; // 红色
        }
    }
}
