import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { formatAgo } from "../util/date";

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const {title, thumbnails, channelTitle, publishedAt} = video.snippet;
  // if (typeof(video.id) !== 'string' && video.id.kind === 'youtube#channel')
  //   return;
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;
  return (
    <Card 
      onClick={() => { navigate(`/videos/watch/${videoId}`, {state: {video} }) }}
      sx={{ maxWidth: 345,  height: '100%', display: 'flex', 
          flexDirection: 'column', justifyContent: 'space-between',
          "&:hover": { transform: 'scale(1.05)', transition: 'transform 0.3s' } }}
    >
      <CardContent 
        sx={{ flexGrow: 1, display: 'flex',  
          flexDirection: 'column', justifyContent: 'flex-start' }}
      >
        <Box component="img" src={thumbnails.medium.url} alt={title} />
        {/* <img src={thumbnails.medium.url} alt={title} /> */}
        <div>
          <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>{title}</Typography>
          <Typography>{channelTitle}</Typography>
          <Typography>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}