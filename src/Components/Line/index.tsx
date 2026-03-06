type Props = {
    className?: string;
}

export const Line = (props: Props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#0099ff" fillOpacity="1" d="M0,0L1440,192L1440,320L0,320Z" />
        </svg>
    );
}
