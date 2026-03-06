"use client";

import { Anchor, Badge, Card, Container, Flex, Space, Text } from "@mantine/core";
import { IconCode, IconExternalLink, IconInfoCircle } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

const links = [
    { label: 'Tofugu — "Learn Hiragana: The Ultimate Guide"', href: "https://www.tofugu.com/japanese/learn-hiragana/" },
    { label: 'YouTube — "How to Read and Write Hiragana Alphabet"', href: "https://www.youtube.com/watch?v=wD3FJgij79c" },
    { label: 'YouTube — "Japón Go"', href: "https://www.youtube.com/@japongo418" },
    { label: 'YouTube — "Japonés con Lily"', href: "https://www.youtube.com/@japonesconlily" },
    { label: 'YouTube (Marshallyin) — "Learn ALL Hiragana in 1 Hour"', href: "https://www.youtube.com/watch?v=6p9Il_j0zjc" },
    { label: 'RealKana — "Hiragana & Katakana Practice"', href: "https://realkana.com/" },
    { label: 'Wikimedia Commons — "Hiragana Stroke Order"', href: "https://commons.wikimedia.org/wiki/Category:Hiragana" },
];

const technologies = [
    "Next.js 16",
    "React 19",
    "TypeScript 5",
    "Mantine 7",
    "Tailwind CSS 3",
    "next-intl 4",
    "Tabler Icons",
];

export function About() {
    const t = useTranslations();

    return (
        <Container size="xs">
            <Card mt="xl" withBorder shadow="xs">
                <Flex align="center" gap="xs">
                    <IconInfoCircle size={20} />
                    <Text fw={600} size="lg">
                        {t("about.purposeTitle")}
                    </Text>
                </Flex>
                <Space h="sm" />
                <Text c="dimmed">
                    {t("about.purposeDescription")}
                </Text>
            </Card>

            <Card mt="lg" withBorder shadow="xs">
                <Flex align="center" gap="xs">
                    <IconExternalLink size={20} />
                    <Text fw={600} size="lg">
                        {t("about.linksTitle")}
                    </Text>
                </Flex>
                <Text c="dimmed">
                    {t("about.linksDescription")}
                </Text>
                <Space h="sm" />
                <Flex direction="column" gap="xs">
                    {links.map((link) => (
                        <Anchor
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            c="red.8"
                            underline="hover"
                        >
                            {link.label}
                        </Anchor>
                    ))}
                </Flex>
            </Card>

            <Card mt="lg" withBorder shadow="xs">
                <Flex align="center" gap="xs">
                    <IconCode size={20} />
                    <Text fw={600} size="lg">
                        {t("about.techTitle")}
                    </Text>
                </Flex>
                <Space h="sm" />
                <Flex wrap="wrap" gap="sm">
                    {technologies.map((tech) => (
                        <Badge key={tech} variant="light" color="red.8" size="lg">
                            {tech}
                        </Badge>
                    ))}
                </Flex>
            </Card>
        </Container>
    );
}
