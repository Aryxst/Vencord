/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    userToken: {
        type: OptionType.STRING,
        description: "Your current user token",

    },
    delayBetweenLetters: {
        type: OptionType.NUMBER,
        description: "The delay in milliseconds between each emoji reaction API request",
        default: 400
    }
});

export type settingsStoreType = typeof settings.store;
