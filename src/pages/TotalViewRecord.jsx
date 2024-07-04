import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import WatchRecord from "../components/WatchRecord";
// import { getTotalWatchVideoRecordByUser } from '../api/firebase';
import useWatchVideo from '../hooks/useWatchVideo';

export default function TotalViewRecord() {
  // const [totalRecords, setTotalRecords] = useState();
  // getTotalWatchVideoRecordByUser()
  //   .then(setTotalRecords);  
  const { getRecord: { isLoading, error, data: totalRecords}} = useWatchVideo();
  // console.log(totalRecords);

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}}>사용자별 시청기록</Typography>
      {isLoading && <img src='/img/loading.gif' alt='Loading...' />}
      {error && <img src='/img/error.png' alt='Error occurred!!!' />}
      {totalRecords && (
        Object.keys(totalRecords).map(user => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />} aria-controls="panel1-content" id={user}
            >
              <Typography variant="h6">{user}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {totalRecords[user].map(record => (
                  <Grid item xs={12} md={6} xl={4}>
                    <WatchRecord record={record} key={record.id} />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </>
  )
}