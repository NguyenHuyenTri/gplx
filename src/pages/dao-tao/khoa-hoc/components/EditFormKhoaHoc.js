import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { reduxForm } from "redux-form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateKhoaHocRequest, getKhoaHocByIdRequest } from '../../../../reducers/dao-tao/KhoaHoc/KhoaHocAction';
import { get as _get } from "lodash";
import { ToastContainer, toast } from 'react-toastify';
import { InputLabel, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from "moment";

/**                                                                                                                      
 * useStyles                                                                                                             
 */
const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: 10,
    },
    link: {
        textDecoration: "none",
    },
    form: {
        marginLeft: 20,
        marginRight: 20,
    },
    formControl: {
        marginTop: theme.spacing(3),
        marginLeft: 10,
        marginBottom: theme.spacing(3),
        fullWidth: true,
    },
    selectEmpty: {
        marginTop: theme.spacing(10),
    },
}));

/**                                                                                                                      
* Edit Form san tap lai                                                                                                          
* @param {*} props                                                                                                      
* @returns                                                                                                              
*/
const EditFormKhoaHoc = (props) => {
    const { handleSubmit, khoaHoc, initialize, hangGPLXs } = props;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    // handle dropdown hang dao tao
    const [select, setSelect] = useState('');
    const [selectDT, setSelectDT] = useState('');
    const [hangDT, setHangDt] = useState([]);
    // field on form
    const [ngayKG, setNgayKG] = useState(khoaHoc.ngayKG);
    const [ngayBG, setNgayBG] = useState(khoaHoc.ngayBG);
    const [tenKH, setTenKH] = useState(khoaHoc.tenKH);
    const [soQDKG, setSoQDKG] = useState(khoaHoc.soQDKG);
    const [thoigianDT, setThoigianDT] = useState(khoaHoc.thoigianDT);

    const handerBack = () => {
        history.goBack();
    };

    /**
     * handle change giay phep lai xe
     * @param {*} event 
     */
    const handleChange = (event) => {
        setSelect(event.target.value);
        hangGPLXs.map((value) => {
            if (value.id == event.target.value) {
                setHangDt(value.hangDTs)
                setSelectDT(value.hangDTs.id)
            }
        })
    };

    useEffect(() => {
        try {
            if (hangGPLXs.length !== 0) {
                setSelect(khoaHoc.hangDT.hangGPLX.id);
                hangGPLXs.map((value) => {
                    if (value.id === khoaHoc.hangDT.hangGPLX.id) {
                        setHangDt(value.hangDTs)
                    }
                })
                setSelectDT(khoaHoc.hangDT.id)
            } else {
                dispatch(getKhoaHocByIdRequest(khoaHoc.id));
            }
        } catch(exception) {
        }
    }, [hangGPLXs]);

    /**
     * kiem tra ngay gio tu 2 ngay khac nhau
     * @param {*} dateOne 
     * @param {*} dateTwo 
     * @returns 
     */
    const checkTwoDateFormat = (dateOne, dateTwo) => {
        if(moment(dateOne) > moment(dateTwo))
            return true;
        else return false;
    }

    const submitFromData = async (data, id) => {
        await dispatch(updateKhoaHocRequest(data, id));
        showToast('Cập nhật khóa học thành công!');
        setTimeoutToBack();
    }

    const showToast = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const setTimeoutToBack = () => {
        setTimeout(() => {
            window.history.back();
        }, 1000);
    }

    const submitForm = async () => {
        const data = {
            "ngayKG": ngayKG,
            "ngayBG": ngayBG,
            "tenKH": tenKH,
            "soQDKG": soQDKG,
            "thoigianDT": thoigianDT,
            "hangDT": selectDT,
        }
        try {
            // create data when click button add
            submitFromData(data, khoaHoc.id)
        } catch (error) {
            alert(error);
        }
    }

    return (
        <React.Fragment>
            <Paper>
                <form onSubmit={submitForm} className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="tenKH"
                                label="Tên khóa học"
                                onChange={(e) => setTenKH(e.target.value)}
                                value={tenKH}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setSoQDKG(e.target.value)}
                                value={soQDKG}
                                label="Số quyết định khai giảng"
                                name="soQDKG"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setNgayKG(e.target.value)}
                                value={ngayKG}
                                label="Ngày khai giảng"
                                name="ngayKG"
                                type="date"
                                inputProps={{ max: ngayBG }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setNgayBG(e.target.value)}
                                value={ngayBG}
                                label="Ngày bế giảng"
                                name="ngayBG"
                                type="date"
                                inputProps={{ min: ngayKG }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setThoigianDT(e.target.value)}
                                value={thoigianDT}
                                label="Thời gian đào tạo"
                                name="thoigianDT"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ height: "79px", paddingTop: "28px" }}>
                            <FormControl variant="outlined" style={{ width: "100%" }}>
                                <InputLabel id="demo-simple-select-outlined-label">Chọn hạng giấy phép lái xe</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    value={select}
                                    onChange={handleChange}
                                    label="Chọn hạng giấy phép lái xe"
                                    component={TextField}
                                    id="tenHang"
                                >
                                    {hangGPLXs.map((value) => (
                                        <MenuItem key={value.id} value={value.id} >
                                            {value.tenHang}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ height: "79px", paddingTop: "5px" }}>
                            <FormControl variant="outlined" style={{ width: "100%" }}>
                                <InputLabel id="demo-simple-select-outlined-label">Chọn hạng đào tạo</InputLabel>
                                <Select
                                    value={selectDT || ''}
                                    required
                                    onChange={(e) => setSelectDT(e.target.value)}
                                    label="Chọn hạng đào tạo"
                                    defaultValue={selectDT || ''}
                                    name="hangDT"
                                    id="khoaHoc"
                                >
                                    {hangDT.map((x, index) => {
                                        return <option key={index} value={x.id}>{x.tenHang}</option>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
                            <Button variant="contained" type="submit" style={{ marginRight: "10px" }} color="secondary">
                                Lưu</Button>
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={handerBack}
                            className={classes.button}
                        >Hủy</Button>
                        </Grid>
                    </Grid>
                    <ToastContainer />
                </form>
            </Paper>
        </React.Fragment>
    );
}


export default reduxForm({
    form: "EditFormKhoaHoc",
    initialValues: { min: 0 }
})(EditFormKhoaHoc);