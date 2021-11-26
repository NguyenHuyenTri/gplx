import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MaterialTable from 'material-table';
import { reduxForm, Field } from "redux-form";
import React, { useEffect, useState, forwardRef } from 'react';
import { useHistory } from "react-router-dom";
import { Select, Dialog, DialogContent, MenuItem, TextField } from '@material-ui/core';
import { Edit, Delete, Check, Clear } from '@material-ui/icons';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { get as _get } from "lodash";
import {
  updateGiaoVienRequest,
} from "../../../../reducers/ke-toan/GiaoVien/GiaoVienAction";


/**
 * makeStyles
 */
const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: 15,
    paddingTop: 15,
  },
  button: {
    width: 150,
    fontSize: 20,
    marginRight: 10,
    marginBottom: 70,
  },
  link: {
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
  },
  form: {
    marginLeft: 20,
  },
  table: {
    marginLeft: "10%",
  },
}));

/**                                                                                
 * UpdateFrom giaoVienkt                                                     
 * @param {*} props                                                                
 * @returns                                                                        
 */
const FormEdit = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const { handleSubmit, initialize, giaoVienkt, } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [giaoVien, setGiaoVien] = useState(giaoVienkt);
  const dispatch = useDispatch();

  // listen data loai xe of grid
  const GiaoVien = useSelector((state) => _get(state, "giaoVienkt.giaoVienkts", []));

  console.log('trung', giaoVienkt)

  const alertFailed = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const tableIcons = {
    Edit: forwardRef((props, ref) => <Edit style={{ color: '#448aff', }} {...props} />),
    Delete: forwardRef((props, ref) => <Delete style={{ color: '#ff1744' }} {...props} />),
    Clear: forwardRef((props, ref) => <Clear style={{ color: '#616161' }} {...props} />),
    Check: forwardRef((props, ref) => <Check style={{ color: '#4caf50' }} {...props} />),
  };


  /**
  * renderOptionlx
  * @returns
  */

  const handleClose = () => {
    setOpen(false);
  };

  const result = giaoVienkt.thongTinKeToans.map((rows, index) => (
    {

      i: index,
      id: rows.id,
      tenTruong: rows.tenTruong,
      loai: rows.loai,
      soTien: rows.tongTien.soTien,
    }));

  const columns = [
    {
      title: 'Tên trường', field: 'tenTruong', editable: 'never',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      title: 'Loại', field: 'loai', editable: 'never',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      title: 'Số tiền', field: 'soTien',
      editComponent: props => (
        <TextField
          multiline
          fullWidth
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      editComponent: props => (
        <Select
          native
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          fullWidth
        >
        </Select>),
    },
  ]

  /**                                                                              
   * initialize                                                                    
   */
  useEffect(() => {
    initialize(giaoVienkt);
    setData(result);
    setGiaoVien(giaoVienkt);
  }, []);

  /**                                                                              
   * handerBack                                                                    
   */
  const handerBack = () => {
    history.goBack();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log('updata', name, value);
    setGiaoVien(prevState => ({ ...prevState, giamTruGiaCanh: value }));
  };


  const handerUpdate = async () => {
    var thongTinKeToans = [];
    data.forEach(element => {
      thongTinKeToans.push({
        "thongTinKT": element.id,
        "soTien": element.soTien
      });
    });
    const param = {
      "giaoVien": giaoVien.id,
      "giamTruGiaCanh": giaoVien.giamTruGiaCanh,
      "thongTinKeToans": thongTinKeToans
    };

    console.log('sdfsdf', param);

    try {
      // create data when click button add 
      console.log('start');
      await dispatch(updateGiaoVienRequest(param));
      console.log('end');
      toast.success('Chỉnh sửa kế toán giáo viên thành công!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.history.back();
    } catch (error) {
      alert(error);
    }

  }

  return (
    <React.Fragment>
      <Paper>
        <form onSubmit={handleSubmit} className={classes.form}>
          <h2 className={classes.marginTop}>Thông tin cơ bản</h2>
          <Grid item sm={12} container>
            <Grid item xs={12} sm={5}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="hoTen"
                label="Giáo Viên"
                name="hoTen"
                value={giaoVien.hoTen}
                autoFocus
                disabled />
            </Grid>
            <Grid item xs={0} sm={1}></Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="giamTruGiaCanh"
                label="Giảm trừ gia cảnh"
                name="giamTruGiaCanh"
                value={giaoVien.giamTruGiaCanh}
                autoFocus
                onChange={handleInputChange}
              />

            </Grid>
            <Grid item xs={0} sm={1}></Grid>
            <Grid item xs={12} sm={11}>
              <div style={{ maxWidth: '100%' }} className={classes.table}>
                <MaterialTable
                  title='Thông tin kế toán'
                  columns={columns}
                  icons={tableIcons}
                  data={data}
                  options={{
                    search: false,
                    actionsColumnIndex: -1,
                    headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF'
                    },
                    actionsCellStyle: {
                      hover: false,
                      width: 130,
                      align: 'center',
                    },
                    // selection: true,
                    rowStyle: {
                      backgroundColor: '#EEE',
                    },
                  }}
                  localization={{
                    header: {
                      actions: 'Thao tác',
                      width: 130,
                    },
                    pagination: {
                      labelDisplayedRows: '{from}-{to} Tổng {count}',
                      firstTooltip: 'Trang đầu',
                      previousTooltip: 'Trang trước',
                      nextTooltip: 'Trang sau',
                      lastTooltip: 'Trang cuối',
                      labelRowsSelect: 'Trang'
                    },
                    body: {
                      emptyDataSourceMessage: 'Không có dữ liệu',
                      editRow: {
                        cancelTooltip: 'Hủy',
                        saveTooltip: 'Đồng ý',
                      },
                      editTooltip: 'Chỉnh sửa'
                    }
                  }}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          //data update
                          const dataUpdate = [...data];

                          //id table
                          const index = oldData.tableData.id;

                          // id combobox
                          if (newData.soTien === '') {
                            alertFailed('Cập nhật không thành công vui lòng không để trống')
                          } else {
                            let idDHCV = -1;
                            newData.soTien = newData.soTien;

                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                          }
                          resolve();
                        }, 500)
                      }),
                  }}
                />
              </div>
            </Grid>
            <ToastContainer />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
              <DialogContent fullWidth>
              </DialogContent>
            </Dialog>
          </Grid>

          <Grid item xs={12} sm={12} container>
            <Grid item xs={12} sm={12} className={classes.marginTop} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handerBack}
                className={classes.button}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handerUpdate}
                className={classes.button}
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment >
  );
};
export default reduxForm({
  form: "FormEdit",
})(FormEdit);
