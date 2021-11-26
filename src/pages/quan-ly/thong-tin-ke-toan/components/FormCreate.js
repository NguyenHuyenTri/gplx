import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='user'
            name='user'
            label='Người dùng'
            fullWidth
            autoComplete='given-name'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='name'
            name='name'
            label='Tên trường'
            fullWidth
            autoComplete='family-name'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='type'
            name='type'
            label='Loại'
            fullWidth
            autoComplete='type'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='note'
            name='note'
            label='Ghi chú'
            fullWidth
            autoComplete='note'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
