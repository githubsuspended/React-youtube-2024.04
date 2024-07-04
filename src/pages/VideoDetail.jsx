import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideos from "../components/RelatedVideos";

import { useAuthContext } from "../context/AuthContext";
// import { addWatchVideoRecord } from "../api/firebase";
import useWatchVideo from '../hooks/useWatchVideo';

export default function VideoDetail() {
  const { state: {video} } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;
  const { user } = useAuthContext();
  const { addRecord } = useWatchVideo(user);
  useEffect(() => {
    if (user)
      addRecord.mutate({ user, video });
  }, []);
  // if (user) {
  //   // addWatchVideoRecord({ user, video });
  //   addRecord.mutate({ user, video });
  // }

  return (
    <Grid container spacing={2}>
      <Grid item xs={9} md={9}>
        <Box sx={{paddingTop: '53%', height: 0, width: '100%', position: 'relative'}}>
          <iframe id='player' type='text/html' width={'100%'} height={'100%'}
            style={{position: 'absolute', top: 0, left: 0}} title={title}
            src={`https://www.youtube.com/embed/${video.id}`} />
        </Box>
        <div>
          <h3>{title}</h3>
          <ChannelInfo id={channelId} name={channelTitle} />
          <pre>{description}</pre>
        </div>
      </Grid>
      <Grid item xs={9} md={3}>
        <RelatedVideos id={channelId} name={channelTitle} />
      </Grid>
    </Grid>
  )
}