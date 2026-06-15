package com.pvphud.client;

import net.fabricmc.api.ClientModInitializer;
import net.fabricmc.fabric.api.client.rendering.v1.HudRenderCallback;
import net.minecraft.client.MinecraftClient;
import net.minecraft.client.gui.DrawContext;

public class PvPHudClient implements ClientModInitializer {
    @Override
    public void onInitializeClient() {
        HudRenderCallback.EVENT.register(this::onHudRender);
    }

    private void onHudRender(DrawContext drawContext, float tickDelta) {
        MinecraftClient client = MinecraftClient.getInstance();
        if (client.player == null) return;

        // 获取屏幕宽度和高度
        int screenWidth = drawContext.getScaledWindowWidth();
        int screenHeight = drawContext.getScaledWindowHeight();

        // 在屏幕左上角绘制HUD
        PvPHudRenderer.renderHealthBar(drawContext, client.player, 10, 10);
        PvPHudRenderer.renderArmorBar(drawContext, client.player, 10, 30);
        PvPHudRenderer.renderHungerBar(drawContext, client.player, 10, 50);
        PvPHudRenderer.renderTargetInfo(drawContext, client, screenWidth, screenHeight);
    }
}
