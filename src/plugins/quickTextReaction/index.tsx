/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addButton } from "@api/MessagePopover";
import { Devs } from "@utils/constants";
import { openModal } from "@utils/modal";
import definePlugin from "@utils/types";
import { ChannelStore } from "@webpack/common";

import { QuickTextReactionIcon } from "./icon";
import { Modal } from "./modal";
import { settings } from "./settings";

export default definePlugin({
    name: "quickTextReaction",
    description: "Quickly react to messages with letters emoji",
    authors: [Devs.Aryxst],
    settings,
    start() {
        addButton("text-reaction", message => {
            return {
                label: "React with Text",
                icon: QuickTextReactionIcon,
                message,
                channel: ChannelStore.getChannel(message.channel_id),
                onClick: async () => {
                    openModal(props => <Modal props={props} message={{ channel_id: message.channel_id, id: message.id }} settingsStore={settings.store} />);

                }

            };
        });
    }
});
