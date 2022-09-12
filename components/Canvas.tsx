import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { convertToHoursMinutes } from "../utils";

export const Canvas = ({ events }) => {
  const [grouped, setGrouped] = useState({});
  const canvasEl: LegacyRef<HTMLCanvasElement> = useRef();

  const drawDayGrid = (canvasCtx) => {
    canvasCtx.font = "12px Arial";

    for (let i = 0; i <= 1440; i += 60) {
      const time = convertToHoursMinutes(i);

      canvasCtx.fillText(time, 10, i);
      canvasCtx.beginPath();
      canvasCtx.moveTo(45, i);
      canvasCtx.lineTo(940, i);
      canvasCtx.strokeStyle = "#d3d3d3";
      canvasCtx.lineWidth = 2;
      canvasCtx.stroke();
    }
  }

  const drawEvents = (canvasCtx, groups) => {
    // take all the object keys
    // traverse the keys and get the associated events to draw by mapping
    const groupedKeys = Object.keys(groups);
    const calWidth = 900;

    groupedKeys.map(key => {
      const oEvents = grouped[key];

      oEvents.map((event, index) => {
        const eventLength = event.end - event.start;
        const xStart = 45 + (index * (calWidth / oEvents.length));
        const width = (calWidth / oEvents.length) - 2;
        const height = eventLength - 2;
  
        canvasCtx.beginPath();
        canvasCtx.fillStyle = "#bcc8d0";
        canvasCtx.fillRect(xStart, event.start, width, height);
  
        canvasCtx.font = "12px Arial";
        canvasCtx.fillStyle = "#23395d";
        canvasCtx.fillText(`${event.title}: ${convertToHoursMinutes(event.start)} - ${convertToHoursMinutes(event.end)}`, xStart + 5, event.start + 15);
      });
    });
  }

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    drawDayGrid(ctx);
  }, []);

  useEffect(() => {
    if (Object.keys(grouped).length) {
      const eventsCtx = canvasEl.current.getContext("2d");
      // events need to be grouped before they can be drawn
      drawEvents(eventsCtx, grouped);
    }
  }, [grouped])

  useEffect(() => {
    const newGroup = {};

    events.forEach(event => {
      const groupedKeys = Object.keys(newGroup);

      if (!groupedKeys.length) {
        newGroup[0] = [event];
      } else {
        let isOverlapping = false;
        // check if overlaps with any group
        for (let i = 0; i < groupedKeys.length; i++) {
          const key = groupedKeys[i];
          const overlapList = newGroup[key];

          overlapList.map(oEvent => {
            if (event.start < oEvent.end && event.end > oEvent.start) {
              isOverlapping = true;
            }
          });

          if (isOverlapping) {
            newGroup[key] = [...newGroup[key], event];
          }
        }
        if (!isOverlapping) {
          newGroup[groupedKeys.length] = [event];
        }
      }
    });
    setGrouped(newGroup);
  }, [events]);

  return <canvas ref={canvasEl} width={940} height={1500} />;
}
