import { ActionIcon } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
    className?: string;
    src: string;
}

export function Player({
    src,
    ...props
}: Readonly<Props>) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const newAudio = new Audio(src);
        audioRef.current = newAudio;

        const handleEnded = () => setIsPlaying(false);
        newAudio.addEventListener('ended', handleEnded);

        return () => {
            newAudio.removeEventListener('ended', handleEnded);
            newAudio.pause();
            setIsPlaying(false);
        };
    }, [src]);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(() => {
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    }, [isPlaying]);

    return (
        <ActionIcon
            color="gray.7"
            variant="filled"
            radius="lg"
            onClick={togglePlay}
            {...props}
        >
            <IconPlayerPlay size={16} />
        </ActionIcon>
    )
}