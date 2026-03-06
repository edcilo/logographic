"use client";

import { Select, Tooltip } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

const locales = [
    {
        value: 'es',
        label: '🇪🇸',
    },
    {
        value: 'en',
        label: '🇬🇧',
    },
]

export function LocaleControl() {
    const t = useTranslations("controls");
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const changeHandler = (locale: string | null) => {
        if (locale) {
            router.replace(pathname, { locale });
        }
    }

    return (
        <Tooltip label={t('localeTooltip')} position="right">
            <Select
                w={50}
                size="xs"
                data={locales}
                defaultValue={currentLocale}
                allowDeselect={false}
                withCheckIcon={false}
                onChange={changeHandler}
            />
        </Tooltip>
    );
}
