import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pagerCustom: {
    textAlign: "center",
    padding: "30px 0",
    lineHeight: "50px",
  },
  paperCustomTitle: {
    color: "#556cd6",
  },
}));

const Custom = () => {
  const classes = useStyles();

  return (
    <div className={classes.pagerCustom}>
      <h1 className={classes.paperCustomTitle}>
        CÔNG TY TNHH PHÚC HOÀNG NGÂN <br /> Trung tâm giáo dục Nghề nghiệp Lái
        xe Phú Ninh
      </h1>
      <h3 className={classes.paperCustomTitle}>
        Địa chỉ: Thôn Phú Yên, xã Tam Đàn, huyện Phú Ninh, Quãng Nam, Việt Nam{" "}
        <br /> Điện thoại: 02353 602 456
      </h3>
    </div>
  );
};

export default Custom;
