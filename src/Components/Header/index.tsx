import { Container, Flex } from "@mantine/core";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { LocaleControl } from "../LocaleControl";
import { ThemeControl } from "../ThemeControl";

export function Header() {
    const logoPath = "https://storage.edcilo.com/edcilo-logo-red.svg";

    return (
        <Container size="xs">
            <Flex justify="space-between" gap="xs" py="sm">
                <Link href="/">
                    <Image
                        src={logoPath}
                        alt="edcilo"
                        decoding="async"
                        priority
                        width={100}
                        height={32}
                    />
                </Link>

                <Flex gap="xs">
                    <LocaleControl />
                    <ThemeControl />
                </Flex>
            </Flex>
        </Container>
    )
}
