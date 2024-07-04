import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import WatchRecord from "../components/WatchRecord";
import { useAuthContext } from "../context/AuthContext";
// import { getWatchVideoRecord } from '../api/firebase';
import useWatchVideo from '../hooks/useWatchVideo';

export default function ViewRecord() {
  const {user} = useAuthContext();
  // const [records, setRecords] = useState();
  // getWatchVideoRecord(user.uid)
  //   .then(setRecords);
  const { getRecord: { isLoading, error, data: totalRecords}} = useWatchVideo(user);

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}}>나의 시청기록</Typography>
      {isLoading && <img src='/img/loading.gif' alt='Loading...' />}
      {error && <img src='/img/error.png' alt='Error occurred!!!' />}
      {user && totalRecords[user.displayName] && (
        <Grid container spacing={1}>
          {totalRecords[user.displayName].map(record => (
            <Grid item xs={12} md={6} xl={4}>
              <WatchRecord record={record} key={record.id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}