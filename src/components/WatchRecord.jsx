import React from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatAgo } from "../util/date";

export default function WatchRecord({ record, showUser }) {
  const { thumbnailUrl, userName, title, channel, watchAt } = record;
  return (
    <Stack direction={'row'} spacing={2}>
      <img src={thumbnailUrl} alt={title} height={90} />
      <Stack>
        {showUser && <Typography>{userName}</Typography>}
        <Typography sx={{fontWeight: 'bold'}}>{title}</Typography>
        {showUser && <Typography>{channel},&nbsp;&nbsp;{formatAgo(watchAt, 'ko')}</Typography>}
        {!showUser && (
          <>
            <Typography>{channel}</Typography>
            <Typography>{formatAgo(watchAt, 'ko')}</Typography>
          </>
        )}
      </Stack>
    </Stack>
  )
}