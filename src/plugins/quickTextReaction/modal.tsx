/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { sleep } from "@utils/misc";
import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot } from "@utils/modal";
import { Alerts, Button, Forms, React, TextInput } from "@webpack/common";

import { settingsStoreType } from "./settings";

const letterToUrlEncodedMap: Record<string, string> = {
    "A": "%F0%9F%87%A6",
    "B": "%F0%9F%87%A7",
    "C": "%F0%9F%87%A8",
    "D": "%F0%9F%87%A9",
    "E": "%F0%9F%87%AA",
    "F": "%F0%9F%87%AB",
    "G": "%F0%9F%87%AC",
    "H": "%F0%9F%87%AD",
    "I": "%F0%9F%87%AE",
    "J": "%F0%9F%87%AF",
    "K": "%F0%9F%87%B0",
    "L": "%F0%9F%87%B1",
    "M": "%F0%9F%87%B2",
    "N": "%F0%9F%87%B3",
    "O": "%F0%9F%87%B4",
    "P": "%F0%9F%87%B5",
    "Q": "%F0%9F%87%B6",
    "R": "%F0%9F%87%B7",
    "S": "%F0%9F%87%B8",
    "T": "%F0%9F%87%B9",
    "U": "%F0%9F%87%BA",
    "V": "%F0%9F%87%BB",
    "W": "%F0%9F%87%BC",
    "X": "%F0%9F%87%BD",
    "Y": "%F0%9F%87%BE",
    "Z": "%F0%9F%87%BF",
};

export function Modal({ props, message, settingsStore }: { props: ModalProps; message: { channel_id: string, id: string; }; settingsStore: settingsStoreType; }) {
    const [value, setValue] = React.useState<string>("");
    async function onConfirm() {
        const trimmedValue = value.trim();
        if (spaceRegex.test(trimmedValue)) {
            Alerts.show({ title: "No spaces allowed!", "body": "Please remove all spaces from the text!" });
        } else {
            props.onClose();
            for (const letter of trimmedValue) {
                fetch(`https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}/reactions/${letterToUrlEncodedMap[letter.toUpperCase()]}/%40me?location=Message%20Hover%20Bar&type=0`, { method: "put", headers: { Authorization: settingsStore.userToken! } });
                await sleep(settingsStore.delayBetweenLetters || 400);
            }
        }
    }
    const spaceRegex = /\s+/;
    return (
        <ModalRoot {...props}>
            <ModalHeader>
                <Forms.FormTitle tag="h4">Text to Message Reaction</Forms.FormTitle>
            </ModalHeader>
            <ModalContent>
                <TextInput
                    style={{ marginTop: "10px" }}
                    onChange={setValue}
                />
            </ModalContent>
            <ModalFooter>
                <Button color={Button.Colors.BRAND} onClick={() => onConfirm()}>
                    Confirm
                </Button>
            </ModalFooter>
        </ModalRoot>
    );
}
