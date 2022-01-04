import React, { Component, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import api from "../../AxiosInstance";

function setCompleted(bool) {
  if (bool === true) return "COMPLETED";
  else return "NOT COMPLETED";
}

export default function ChallangeList({ challenges }) {
  const getProgression = (totalTime, targetTime) => {
    var result = (totalTime / targetTime) * 100;
    if (result >= 100) return 100;
    return result;
  };

  return (
    <React.Fragment>
      {challenges.map((challenge) => (
        <Accordion id={challenge.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={challenge.id}
          >
            <Typography sx={{ width: "50%", flexShrink: 0 }}>
              Challange: {challenge.challengeDTO.activityName}
            </Typography>
            <Typography align="right">
              Progression:
              {getProgression(
                challenge.totalTime,
                challenge.challengeDTO.challengeTime
              )}
              % {setCompleted(challenge.completed)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Description: {challenge.challengeDTO.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </React.Fragment>
  );
}
