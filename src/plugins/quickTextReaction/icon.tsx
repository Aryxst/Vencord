/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function QuickTextReactionIcon({ height = 24, width = 24, }: { height?: number; width?: number; }) {
    return (<svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 20h16M6 16l6-12 6 12M8 12h8" /></svg>);
}
