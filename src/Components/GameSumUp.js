import * as React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SiegSVG from './../assets/Sieg.svg';
import NiederlageSVG from './../assets/Niederlage.svg';
import UnentschiedenSVG from './../assets/Unentschieden.svg';

export default function GameSumUp({ player, rounds, player1Score, player2Score, isSinglePlayer }) {
  const [won, setWon] = useState(false);
  const [isDraw, setIsDraw] = useState();
  function decideWinner() {
    //Singleplayer Logic
    if (isSinglePlayer) {
      if (player1Score / (rounds * 3) >= 0.5) {
        setWon(true)
      }
      else {
        setWon(false);
      }
    }

    if (!isSinglePlayer) {
      if (player === 1 && player1Score > player2Score || player === 2 && player2Score > player1Score) {
        setWon(true);
      }
      if (player2Score === player1Score) {
        setIsDraw(true);
      }
      else {
        setWon(false);
      }
    }

  }

   //decide Winner when site loads
   useEffect(() => {
     decideWinner();
   }, []);

  return (
    <div style={style.formContainer}>
      <Card sx={{ maxWidth: 400 }}>

        {isDraw ?
          <CardMedia
            sx={{ height: 400 }}
            image={UnentschiedenSVG}
          />
          :
          won ?
            <CardMedia
              sx={{ height: 400 }}
              image={SiegSVG}
            />
            :
            <CardMedia
              sx={{ height: 400 }}
              image={NiederlageSVG}
            />
        }

        <CardContent>
          {isDraw ?
            <Typography gutterBottom variant="h5" component="div">
              Unentschieden!
            </Typography>
            :
            won ?
              <Typography gutterBottom variant="h5" component="div">
                Glückwunsch!
              </Typography>
              :
              <Typography gutterBottom variant="h5" component="div">
                Schade!
              </Typography>
          }
          {isDraw ?
            <Typography gutterBottom variant="h5" component="div">
              {player1Score} : {player2Score}
            </Typography>
            :
              isSinglePlayer ?
                <Typography gutterBottom variant="h5" component="div">
                  Du hast {" " + (player1Score / (rounds * 3) * 100).toFixed(2)}% der Fragen richtig beantwortet
                </Typography>
                :
                <Typography gutterBottom variant="h5" component="div">
                {player1Score} : {player2Score}
              </Typography>
          }
          {isDraw ?
            <Typography variant="body2" color="text.secondary">
            Spiele erneut um einen Gewinner festzulegen!
            </Typography>
            :
            won ?
              isSinglePlayer ?
                <Typography variant="body2" color="text.secondary">
                  Wäre das eine Prüfung gewesen hättest du bestanden!
                </Typography>
                :
                <Typography variant="body2" color="text.secondary">
                  Du hast das Quiz gewonnen
                </Typography>
              :
              isSinglePlayer ?
                <Typography variant="body2" color="text.secondary">
                  Wäre das eine Prüfung gewesen hättest du leider nicht bestanden. Versuche es gerne erneut!
                </Typography>
                :
                <Typography variant="body2" color="text.secondary">
                  Du hast das Quiz leider verloren. Beim nächsten Spiel gewinnst bestimmt du!
                </Typography>
          }
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
        <Link to="/GameSetup">
            <Button size="small">Neues Quiz</Button>
        </Link>
        </CardActions>
      </Card>
    </div>
  );
}

const style = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "2rem"
  },
};