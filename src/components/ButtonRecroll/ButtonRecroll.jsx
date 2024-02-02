import { Button } from "@mui/material";

export const ButtonRecroll = ({ activeButton, index  }) => {
    const handleClick = (event) => {
        if (activeButton && index % 7 === 0) {
            event.preventDefault();
        }
    };

    return (
        <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            target="_blank"
            style={{ pointerEvents: activeButton ? "none" : "auto" }}
            onClick={handleClick}
        >
            <Button variant="contained" disabled={activeButton}>
                Нажми меня!
            </Button>
        </a>
    );
};
