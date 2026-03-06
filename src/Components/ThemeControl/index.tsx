"use client";

import { MantineColorScheme, Select, Tooltip, useMantineColorScheme } from '@mantine/core';
import { useTranslations } from 'next-intl';

const themes = [
    {
        value: "auto",
        label: "🖥️",
    },
    {
        value: "light",
        label: "🌞",
    },
    {
        value: "dark",
        label: "🌒",
    },
]

export function ThemeControl() {
    const t = useTranslations("controls");
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const changeHandler = (theme: string | null) => {
        setColorScheme(theme as MantineColorScheme || "auto");
    }

    return (
        <Tooltip label={t("themeTooltip")} position="right">
            <Select
                w={56}
                size="xs"
                data={themes}
                defaultValue={colorScheme}
                allowDeselect={false}
                withCheckIcon={false}
                onChange={changeHandler}
            />
        </Tooltip>
    );
}
