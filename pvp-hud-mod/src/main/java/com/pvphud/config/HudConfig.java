package com.pvphud.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import net.minecraft.client.MinecraftClient;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

/**
 * HUD 配置管理类
 */
public class HudConfig {
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private static final String CONFIG_FILE = "config/pvphud.json";
    
    public boolean showHealthBar = true;
    public boolean showArmorBar = true;
    public boolean showHungerBar = true;
    public boolean showTargetInfo = true;
    public int healthBarX = 10;
    public int healthBarY = 10;
    public int armorBarX = 10;
    public int armorBarY = 30;
    public int hungerBarX = 10;
    public int hungerBarY = 50;
    
    private static HudConfig instance;
    
    public static HudConfig getInstance() {
        if (instance == null) {
            instance = load();
        }
        return instance;
    }
    
    /**
     * 加载配置文件
     */
    public static HudConfig load() {
        File configFile = new File(CONFIG_FILE);
        
        if (configFile.exists()) {
            try (FileReader reader = new FileReader(configFile)) {
                return GSON.fromJson(reader, HudConfig.class);
            } catch (IOException e) {
                e.printStackTrace();
                return new HudConfig();
            }
        }
        
        HudConfig config = new HudConfig();
        config.save();
        return config;
    }
    
    /**
     * 保存配置文件
     */
    public void save() {
        try {
            File configFile = new File(CONFIG_FILE);
            configFile.getParentFile().mkdirs();
            
            try (FileWriter writer = new FileWriter(configFile)) {
                GSON.toJson(this, writer);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
