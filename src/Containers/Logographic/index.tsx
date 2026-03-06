"use client";

import { Player } from "@/Components";
import { Button, Card, Chip, Container, Flex, Modal, Select, Space, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrain, IconPlayerSkipForward, IconRotate2 } from "@tabler/icons-react";
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

    const startClickHandler = () => {
        setMemorized([]);
        getRandomChar(null, selected, []);
        open();
    }

    const restartClickHandler = () => {
        setMemorized([]);
        getRandomChar(null, selected, []);
    }

    const getRandomChar = (current: Char | null, chars: Char[], memorized: Char[], skip:boolean=false) => {
        const newMemorized = current && current.char.length > 0 ? [...memorized, current] : memorized;

        if (!skip) {
            setMemorized(newMemorized);
        }

        const difference = chars.filter(char => !newMemorized.includes(char));
        const currentChar = difference[Math.floor(Math.random() * difference.length)];

        setCurrentChar(currentChar);
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

                        <Button
                            color="red.8"
                            disabled={selected.length === 0}
                            onClick={startClickHandler}
                        >
                            <Text tt="capitalize" span>
                                {t("dictionary.start")}
                            </Text>
                        </Button>
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
                        onClick={() => getRandomChar(currentChar, selected, memorized, true)}
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
                            onClick={() => getRandomChar(currentChar, selected, memorized)}
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
