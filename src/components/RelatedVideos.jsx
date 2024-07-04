import React from "react";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Stack from '@mui/material/Stack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SmallVideoCard from "./SmallVideoCard";

import { useRelatedVideo } from "../api/youtube";

export default function RelatedVideos({ id, name }) {
  const {isLoading, error, videos} = useRelatedVideo(id);

  return (
    <>
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}
      {videos && (
        <Stack direction={'column'} spacing={1} sx={{textAlign: 'center'}}>
          <h4>이 채널의 다른 영상들</h4>
          {videos.map(video => (<SmallVideoCard video={video} />))}
        </Stack>
      )}
    </>
  )
}