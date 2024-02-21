import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import GameButton from "./GameButton";
import data from "../data/questions.json"

export default function QuestionPopper({questionIndex}) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (
        <div>
            <GameButton
                color={"success"}
                onClick={handleClick}
                label={questionIndex+1}
                size="large"/>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={1}>
                        <Box sx={{border: 1, p: 1, bgcolor: 'background.paper'}}>
                            <h1>{data.questions[questionIndex].question_text}</h1>
                            <p>{data.questions[questionIndex].answers[0]}</p>
                            <p>{data.questions[questionIndex].answers[1]}</p>
                            <p>{data.questions[questionIndex].answers[2]}</p>
                            <p>{data.questions[questionIndex].answers[3]}</p>
                        </Box>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}
