package com.pvphud;

import net.fabricmc.api.ModInitializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PvPHudMod implements ModInitializer {
    public static final String MOD_ID = "pvphudmod";
    public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

    @Override
    public void onInitialize() {
        LOGGER.info("PvP HUD Mod initialized!");
    }
}
