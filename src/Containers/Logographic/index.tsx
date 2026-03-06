"use client";

import { Player } from "@/Components";
import { Button, Card, Checkbox, Chip, Container, Flex, Modal, Select, Space, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrain, IconDeselect, IconPlayerSkipForward, IconRotate2 } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { alphabets } from "./alphabets";
import './styles.css';
import styles from './styles.module.css';

const alphabetsOptions = [
    // { group: 'Chinese', items: ['Hanzi'] },
    { group: 'Japanese', items: ['Hiragana'] }, // 'Kanji', 'Katakana'
];

type Char = {
    char: string;
    file?: string;
} | null;

export function Logographic() {
    const defaultAlphabet = "Hiragana";
    const t = useTranslations();
    const [language, setLanguage] = useState<string>(defaultAlphabet);
    const [chars, setChars] = useState<Char[][] | null>(alphabets["Hiragana"]);
    const [selected, setSelected] = useState<Char[]>([]);
    const [currentChar, setCurrentChar] = useState<Char | null>(null);
    const [memorized, setMemorized] = useState<Char[]>([]);
    const [randomOrder, setRandomOrder] = useState<boolean>(true);
    const [opened, {open, close}] = useDisclosure(false);

    const languageChangeHandler = (value: string | null) => {
        setLanguage(value || defaultAlphabet);
        setChars(alphabets[value as keyof typeof alphabets]);
    }

    const charChangeHandler = (value: Char, checked: boolean) => {
        if (checked) {
            setSelected([...selected, value]);
        } else {
            setSelected(selected.filter((char) => char !== value));
        }
    }

    const deselectClickHandler = () => {
        setSelected([]);
    }

    const randomChangeHandler = (value: boolean) => {
        setRandomOrder(value);
    }

    const startClickHandler = () => {
        setMemorized([]);
        if (randomOrder) {
            getNextChar(null, selected, [], false, true);
        } else {
            setCurrentChar(selected[0] ?? null);
        }
        open();
    }

    const restartClickHandler = () => {
        setMemorized([]);
        if (randomOrder) {
            getNextChar(null, selected, [], false, true);
        } else {
            setCurrentChar(selected[0] ?? null);
        }
    }

    const getNextChar = (current: Char | null, chars: Char[], memorized: Char[], skip: boolean = false, random: boolean = true) => {
        const newMemorized = current && current.char.length > 0 && !skip
            ? [...memorized, current]
            : memorized;

        if (!skip) {
            setMemorized(newMemorized);
        }

        const remaining = chars.filter(char => !newMemorized.includes(char));

        if (remaining.length === 0) {
            setCurrentChar(null);
            return;
        }

        if (random) {
            const nextChar = remaining[Math.floor(Math.random() * remaining.length)];
            setCurrentChar(nextChar);
        } else {
            const currentIndex = current ? chars.indexOf(current) : -1;
            let nextChar: Char | null = null;

            for (let i = 1; i <= chars.length; i++) {
                const candidateIndex = (currentIndex + i) % chars.length;
                const candidate = chars[candidateIndex];
                if (!newMemorized.includes(candidate)) {
                    nextChar = candidate;
                    break;
                }
            }

            setCurrentChar(nextChar);
        }
    }

    return (
        <Container size="xs">
            <Card mt="xl" withBorder shadow="xs">
                <Select
                    size="md"
                    defaultValue={defaultAlphabet}
                    data={alphabetsOptions}
                    label={t("controls.alphabetSelectorLabel")}
                    allowDeselect={false}
                    multiple
                    onChange={languageChangeHandler}
                />
            </Card>

            <Space h="lg" />

            <Card withBorder shadow="xs">
                {chars && chars.length > 0 ? (
                    <>
                        <Table.ScrollContainer minWidth={300}>
                            <Table>
                                <Table.Tbody>
                                    {chars?.map((row, i) => (
                                        <Table.Tr key={i}>
                                            {row.map((char, j) => (
                                                <Table.Td key={j} align="center">
                                                    {char && (
                                                        <Chip
                                                            checked={selected.includes(char)}
                                                            color="red.8"
                                                            size="sm"
                                                            onChange={(checked: boolean) => charChangeHandler(char, checked)}
                                                        >
                                                            {char.char}
                                                        </Chip>
                                                    )}
                                                </Table.Td>
                                            ))}
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Table.ScrollContainer>

                        <Space h="md" />

                        <Checkbox
                            checked={randomOrder}
                            color="red.8"
                            label={t("controls.randomOrder")}
                            onChange={(event) => randomChangeHandler(event.currentTarget.checked)}
                        />

                        <Space h="md" />

                        <Flex gap="sm" justify="space-between">
                            <Button
                                color="red.8"
                                disabled={selected.length === 0}
                                onClick={startClickHandler}
                            >
                                <Text tt="capitalize" span>
                                    {t("dictionary.start")}
                                </Text>
                            </Button>

                            <Button
                                color="red.8"
                                disabled={selected.length === 0}
                                leftSection={<IconDeselect size={16} />}
                                variant="outline"
                                onClick={deselectClickHandler}
                            >
                                <Text tt="capitalize" span>
                                    {t("dictionary.deselectAll")}
                                </Text>
                            </Button>
                        </Flex>
                    </>
                ) : (
                    <Flex justify="center">
                        <Text span c="dimmed">
                            {t("controls.charsSelectorEmpty")}
                        </Text>
                    </Flex>
                )}
            </Card>

            <Modal
                centered
                opened={opened}
                onClose={close}
                title={language}
                overlayProps={{
                    color: 'var(--mantine-color-dark-4)',
                    blur: 5,
                }}
            >
                <Card>
                    <Flex justify="center">
                        {memorized.length === selected.length ? (
                            <Text size="60px" tt="capitalize" c="dimmed" span>
                                {t('dictionary.done')}
                            </Text>
                        ) : (
                            <>
                                {currentChar?.file && (
                                    <Player className={styles.player} src={currentChar?.file} />
                                )}
                                <Text size="100px" span>
                                    {currentChar?.char}
                                </Text>
                            </>
                        )}
                    </Flex>
                </Card>

                <Space h="md" />

                <Flex justify="space-between">
                    <Button
                        color="gray.7"
                        disabled={memorized.length === selected.length}
                        leftSection={<IconPlayerSkipForward size={16} />}
                        onClick={() => getNextChar(currentChar, selected, memorized, true, randomOrder)}
                    >
                        <Text tt="capitalize" size="sm" span>
                            {t("dictionary.skip")}
                        </Text>
                    </Button>

                    {memorized.length === selected.length ? (
                        <Button
                            color="green"
                            leftSection={<IconRotate2 size={16} />}
                            onClick={restartClickHandler}
                        >
                            <Text tt="capitalize" size="sm" span>
                                {t("dictionary.restart")}
                            </Text>
                        </Button>
                    ) : (
                        <Button
                            color="red.8"
                            leftSection={<IconBrain size={16} />}
                            onClick={() => getNextChar(currentChar, selected, memorized, false, randomOrder)}
                        >
                            <Text tt="capitalize" size="sm" span>
                                {t("dictionary.memorized")}
                            </Text>
                        </Button>
                    )}
                </Flex>
            </Modal>
        </Container>
    )
}
