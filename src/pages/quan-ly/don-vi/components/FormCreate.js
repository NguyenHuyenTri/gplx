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
            id='name'
            name='name'
            label='Họ Tên'
            fullWidth
            autoComplete='given-name'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='donvi'
            name='donvi'
            label='Đơn vị'
            fullWidth
            autoComplete='family-name'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='chucvu'
            name='chucvu'
            label='Chức vụ'
            fullWidth
            autoComplete='type'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='note'
            name='note'
            label='Mô tả'
            fullWidth
            autoComplete='note'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
