/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addButton, removeButton } from "@api/MessagePopover";
import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import { openModal } from "@utils/modal";
import definePlugin, { OptionType } from "@utils/types";
import { ChannelStore } from "@webpack/common";

import { Modal } from "./modal";

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

export default definePlugin({
    name: "QuickTextReaction",
    description: "Quickly react to messages with text emoji (Regional Indicators+more)",
    authors: [Devs.Aryxst],
    settings,
    start() {
        addButton("QuickTextReaction", message => {
            return {
                label: "React with Text",
                icon: () => <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 20h16M6 16l6-12 6 12M8 12h8" /></svg>,
                message,
                channel: ChannelStore.getChannel(message.channel_id),
                onClick: async () => {
                    openModal(props => <Modal props={props} message={{ channel_id: message.channel_id, id: message.id }} />);

                }

            };
        });
    },
    stop() {
        removeButton("QuickTextReaction");
    }
});
