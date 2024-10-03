/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { sleep } from "@utils/misc";
import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot } from "@utils/modal";
import { Alerts, Button, Forms, React, TextInput } from "@webpack/common";

import { settings } from ".";

const characterToUrlEncodedMap: Record<string, string> = {
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
    "0": "0%EF%B8%8F%E2%83%A3",
    "1": "1%EF%B8%8F%E2%83%A3",
    "2": "2%EF%B8%8F%E2%83%A3",
    "3": "3%EF%B8%8F%E2%83%A3",
    "4": "4%EF%B8%8F%E2%83%A3",
    "5": "5%EF%B8%8F%E2%83%A3",
    "6": "6%EF%B8%8F%E2%83%A3",
    "7": "7%EF%B8%8F%E2%83%A3",
    "8": "8%EF%B8%8F%E2%83%A3",
    "9": "9%EF%B8%8F%E2%83%A3",
    "?": "%E2%9D%94",
    "!": "%E2%9D%95"
};

export function Modal({ props, message }: { props: ModalProps; message: { channel_id: string, id: string; }; }) {
    const [value, setValue] = React.useState<string>("");

    async function onConfirm() {
        const trimmedValue = value.trim();

        if (/\s+/.test(trimmedValue)) {
            Alerts.show({ title: "No spaces allowed!", "body": "Please remove all spaces from the text!" });
        } else {
            props.onClose();
            let progress = "";

            for (const letter of trimmedValue) {
                if (!progress.includes(letter)) {
                    progress += letter;

                    await fetch(`https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}/reactions/${characterToUrlEncodedMap[letter.toUpperCase()]}/%40me?location=Message%20Hover%20Bar&type=0`, { method: "PUT", headers: { Authorization: settings.store.userToken! } });
                    await sleep(settings.store.delayBetweenLetters || 400);
                }
            }
        }
    }

    return (
        <ModalRoot {...props}>
            <ModalHeader>
                <Forms.FormTitle tag="h4">React with Text</Forms.FormTitle>
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
