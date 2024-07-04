import React from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatAgo } from "../util/date";

export default function SmallVideoCard({ video }) {
  const navigate = useNavigate();
  const videoId = video.id.videoId;
  const { title, thumbnails, publishedAt } = video.snippet;

  return (
    <Card onClick={() => { navigate(`/videos/watch/${videoId}`, {state: {video} }) }} >
      <Stack direction={'row'} spacing={1}>
        <img src={thumbnails.medium.url} alt={title} width={'40%'} />
        <div style={{textAlign: 'left'}}>
          <Typography sx={{fontSize: 14}}>{title}</Typography>
          <Typography sx={{fontSize: 14}}>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </Stack>
    </Card>
  );
}