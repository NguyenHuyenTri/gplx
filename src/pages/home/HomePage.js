import { Grid } from '@material-ui/core';
import React from 'react';
import { CardContent, Custom, Note } from './components';

const HomePage = (props) => {
  return (
    <Grid container>
      <Note />
      <Grid item sm={12} xs={12}>
        <Custom />
        <CardContent />
      </Grid>
    </Grid>
  );
};

HomePage.propTypes = {};

export default HomePage;
