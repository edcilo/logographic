'use client';

import { Footer, Header } from "@/Components";
import { AppShell } from "@mantine/core";
import styles from './styles.module.css';

type Props = {
    children: React.ReactNode
}

export function Layout({
    children
}: Readonly<Props>) {
    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 40 }}
            className={styles.layout}
            withBorder={false}
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Main>
                <div className={styles.line} />
                {children}
            </AppShell.Main>

            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    )
}
