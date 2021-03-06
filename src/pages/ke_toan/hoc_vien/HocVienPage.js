import React from "react";
import PropTypes from "prop-types";
import { BoxSearch, ListHV } from "./components";
import { AppBar, Tabs, Tab, makeStyles, useTheme } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function HocVienPage() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Học viên" {...a11yProps(0)} />
          <Tab label="Quản lý thu tiền" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <BoxSearch labelComboBox="Khoá học" />
          <ListHV />
          <BoxSearch labelComboBox="Kỳ sát hạch" />
          <ListHV />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ListHV />
        </TabPanel>
      </SwipeableViews>
    </>
  );
}
export default HocVienPage;
