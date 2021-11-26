import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { get as _get } from "lodash";
import {
    getHangGPLXRequest,
    createKhoaHocRequest,
} from "../../../../reducers/dao-tao/KhoaHoc/KhoaHocAction";
import { ToastContainer, toast } from "react-toastify";
import { InputLabel, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { reduxForm } from "redux-form";
import moment from "moment";

/**
 * useStyles
 */
const useStyles = makeStyles((theme) => ({
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
    selectForm: {
        width: "100%",
        height: "50px",
        border: "1px SOLID #C1C1C1",
        paddingLeft: "10px",
    },
}));

/**
 * CreateForm khoa hoc
 * @param {*} props
 * @returns
 */
const CreateFormKhoaHoc = (props) => {
    const { handleSubmit, initialize, favoriteColorValue } = props;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    var today = new Date();
    let currentDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    // handle dropdown hang dao tao
    const [select, setSelect] = useState("");
    const [selectDT, setSelectDT] = useState("");
    const [hangDT, setHangDt] = useState([]);
    // field on form
    const [ngayKG, setNgayKG] = useState(currentDate);
    const [ngayBG, setNgayBG] = useState(currentDate);
    const [tenKH, setTenKH] = useState("");
    const [soQDKG, setSoQDKG] = useState("");
    const [thoigianDT, setThoigianDT] = useState("");

    const hangGPLXs = useSelector((state) =>
        _get(state, "khoaHocs.hangGPLXs", [])
    );

    const handerBack = () => {
        history.goBack();
    };

    const handleChange = (event) => {
        setSelect(event.target.value);
        hangGPLXs.map((value) => {
            if (value.id == event.target.value) {
                setHangDt(value.hangDTs);
                setSelectDT(value.hangDTs.id);
            }
        });
    };

    useEffect(() => {
        dispatch(getHangGPLXRequest());
    }, []);

    useEffect(() => {
        if (hangGPLXs.length !== 0) {
            setSelect(hangGPLXs[0].id);
            setHangDt(hangGPLXs[0].hangDTs);
            setSelectDT(hangGPLXs[0].hangDTs[0].id);
        }
    }, [hangGPLXs]);

    const submitFromData = async (data) => {
        await dispatch(createKhoaHocRequest(data));
        showToast('Thêm khóa học thành công!');
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

    const submitForm = async (e) => {
        e.preventDefault();
        let checkEmpty = tenKH === '' || ngayKG === null || ngayBG === null;
        let checkUndefined = thoigianDT === 'undefined' || selectDT === 'undefined';
        if (checkEmpty || checkUndefined) {
        } else {
            if (selectDT === 'undefined') {
                showToast('Vui lòng chọn hạng đào tạo!');
            } else {
                const data = {
                    "tenKH": tenKH,
                    "ngayKG": ngayKG,
                    "ngayBG": ngayBG,
                    "soQDKG": soQDKG === '' || soQDKG === null ? '' : soQDKG,
                    "thoigianDT": thoigianDT,
                    "hangDT": selectDT,
                }
                try {
                    // create data when click button add
                    submitFromData(data);
                } catch (error) {
                    alert(error);
                }
            }
        }
    }

    return (
        <React.Fragment>
            <Paper>
                <form onSubmit={submitForm} className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                label="Tên khóa học"
                                onChange={(e) => setTenKH(e.target.value)}
                                value={tenKH}
                                type="text"
                                name="tenKH"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setSoQDKG(e.target.value)}
                                value={soQDKG}
                                type="text"
                                label="Số quyết định khai giảng"
                                name="soQDKG"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                type="date"
                                onChange={(e) => setNgayKG(e.target.value)}
                                value={ngayKG}
                                label="Ngày khai giảng"
                                name="ngayKG"
                                defaultValue={currentDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{ max: ngayBG }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                label="Ngày bế giảng"
                                type="date"
                                onChange={(e) => setNgayBG(e.target.value)}
                                value={ngayBG}
                                defaultValue={currentDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{ min: ngayKG }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
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
                                    required
                                    onChange={handleChange}
                                    label="Chọn hạng giấy phép lái xe"
                                    component={TextField}
                                    id="tenHang"
                                    name="tenHang"
                                >
                                    {hangGPLXs.map((value, index) => (
                                        <MenuItem key={index} value={value.id} >
                                            { value.tenHang}
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
                            <Button
                                variant="contained"
                                style={{ marginRight: "10px" }}
                                type="submit"
                                color="secondary">Lưu</Button>
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
};

export default reduxForm({
    form: "CreateFormKhoaHoc",
})(CreateFormKhoaHoc);
