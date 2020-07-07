import React from 'react';

import { Grid } from '@material-ui/core';

import AsideRegister from './AsideRegister';
import MainRegister from './MainRegister';

const index = () => (
  <Grid container direction="row">
    <AsideRegister />
    <MainRegister />
  </Grid>
);

export default index;
