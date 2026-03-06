import { Anchor, Container, Flex, Text } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <Container size="xs">
            <Flex justify="space-between">
                <Anchor
                    c="red.8"
                    component={Link}
                    href="https://edcilo.com"
                >
                    edcilo.com
                </Anchor>

                <Text tt="capitalize" span>
                    <Anchor
                        c="red.8"
                        component={Link}
                        href={`/${locale}/about`}
                    >
                        {t('footer.about')}
                    </Anchor>
                </Text>
            </Flex>
        </Container>
    )
}
