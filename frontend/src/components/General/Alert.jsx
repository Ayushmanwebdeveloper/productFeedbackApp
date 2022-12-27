import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function Alert({ notify, showAlert, setShowAlert, severity }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={severity}>
        <AlertTitle>{severity}</AlertTitle>
        <strong>{notify}</strong>
      </Alert>
    </Stack>
  );
}