package com.pvphud.client;

import net.fabricmc.fabric.api.client.event.lifecycle.v1.ClientTickEvents;
import net.fabricmc.fabric.api.client.keybinding.v1.KeyBindingHelper;
import net.minecraft.client.option.KeyBinding;
import net.minecraft.client.util.InputUtil;
import org.lwjgl.glfw.GLFW;
import com.pvphud.screen.HudConfigScreen;

/**
 * 按键绑定管理
 */
public class KeyBindings {
    public static final KeyBinding OPEN_HUD_MENU = KeyBindingHelper.registerKeyBinding(
        new KeyBinding(
            "key.pvphud.open_menu",
            InputUtil.Type.KEYSYM,
            GLFW.GLFW_KEY_LEFT_SHIFT,
            "category.pvphud.keybindings"
        )
    );
    
    public static void register() {
        ClientTickEvents.END_CLIENT_TICK.register(client -> {
            while (OPEN_HUD_MENU.wasPressed()) {
                if (client.player != null && client.currentScreen == null) {
                    client.setScreen(new HudConfigScreen(null));
                }
            }
        });
    }
}
