import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { reduxForm } from "redux-form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get as _get } from "lodash";
import { getSatHachComboboxRequest, getKhoaHocComboboxRequest, createThongBaoRequest } from "../../../../reducers/quan-tri/ThongBao/ThongBaoAction";
import { InputLabel, TextField } from '@material-ui/core';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ToastContainer, toast } from "react-toastify";

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
}));


/**                                                                                                                      
 * CreateForm thong bao                                                                                                         
 * @param {*} props                                                                                                      
 * @returns                                                                                                              
 */
const CreateFormThongBao = (props) => {
    const classes = useStyles();
    const history = useHistory();
    // const { handleSubmit, initialize } = props;
    const dispatch = useDispatch();

    const [tenTB, setTenTB] = useState('');
    const [cachTB, setCachTB] = useState('Nhắn tin SMS');
    const [thongBaoChoValue, setThongBaoChoValue] = useState('Nhân viên');
    const [loaiTBValue, setLoaiTBValue] = useState('Thông báo người dùng');
    const [noiDung, setNoiDung] = useState();
    const [satHachValue, setSatHachValue] = useState(3);
    const [khoaHocValue, setKhoaHocValue] = useState(10);

    // select for picker
    const cachTBs = [{ value: "Nhắn tin SMS" }, { value: "Thông báo trên web" }];
    const loaiTBs = [{ value: "Thông báo người dùng" }];
    const thongBaoCho = [{ value: "Nhân viên" }, { value: "Học viên" }, { value: "Thí sinh" }, { value: "Giáo viên" }];
    const satHachs = useSelector((state) => _get(state, "thongBaos.satHachs", []));
    const khoaHocs = useSelector((state) => _get(state, "thongBaos.khoaHocs", []));

    const handleBack = () => {
        history.goBack();
    };

    useEffect(() => {
        dispatch(getSatHachComboboxRequest());
        dispatch(getKhoaHocComboboxRequest());
    }, [])

    /**
     * return fields on form submit
     */
    function TenThongBao() {
        return <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={(e) => setTenTB(e.target.value)}
            value={tenTB}
            id="tenTB"
            label="Tên thông báo"
            name="tenTB"
        />
    }

    function LoaiThongBao() {
        return <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-outlined-label">Loại thông báo</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                value={loaiTBValue}
                required
                defaultValue="Thông báo người dùng"
                onChange={(e) => setLoaiTBValue(e.target.value)}
                label="Loại thông báo"
                id="loaiTB"
                name="loaiTB"
            >
                {loaiTBs.map((value, index) => (
                    <MenuItem key={index} value={value.value} >
                        { value.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>;
    }

    function CachThongBao() {
        return <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-outlined-label">Chọn cách thông báo</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                value={cachTB}
                required
                onChange={(e) => setCachTB(e.target.value)}
                label="Chọn cách thông báo"
                id="cachTB"
                name="cachTB"
            >
                {cachTBs.map((value, index) => (
                    <MenuItem key={index} value={value.value} >
                        { value.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>;
    }

    function ThongBaoCho() {
        return <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-outlined-label">Thông báo cho</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                value={thongBaoChoValue}
                required
                onChange={(e) => setThongBaoChoValue(e.target.value)}
                label="Thông báo cho"
                id="thongBaoCho"
                name="thongBaoCho"
            >
                {thongBaoCho.map((value, index) => (
                    <MenuItem key={index} value={value.value} >
                        { value.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>;
    }

    function SatHach() {
        return <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-outlined-label">Sát hạch</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                value={satHachValue}
                required
                onChange={(e) => setSatHachValue(e.target.value)}
                label="Sát hạch"
                id="satHach"
                name="satHach"
            >
                {satHachs.map((value, index) => (
                    <MenuItem key={index} value={value.id} >
                        { value.kySatHach}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>;
    }

    function KhoaHoc() {
        return <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-outlined-label">Khóa học</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                value={khoaHocValue}
                required
                onChange={(e) => setKhoaHocValue(e.target.value)}
                label="Khóa học"
                id="khoaHoc"
                name="khoaHoc"
            >
                {khoaHocs.map((value, index) => (
                    <MenuItem key={index} value={value.id} >
                        { value.tenKH}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>;
    }

    function NoiDung() {
        return <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            required
            rows={5}
            onChange={(e) => setNoiDung(e.target.value)}
            value={noiDung}
            label="Nội dung"
        />
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

    const handleBackWhenComplete = () => {
        setTimeout(() => {
            window.history.back();
        }, 1000);
    }

    const submitFromData = async (data) => {
        await dispatch(createThongBaoRequest(data));
        showToast('Thêm thông báo thành công!');
        handleBackWhenComplete();
    }

    const submitForm = async (e) => {
        e.preventDefault();
        let checkDataKhoaHoc = khoaHocValue === "" || khoaHocValue === null || khoaHocValue === 'undefined';
        let checkDataSatHach = satHachValue === "" || satHachValue === null || satHachValue === 'undefined';
        let checkEmpty = tenTB === "" || cachTB === "" || thongBaoChoValue === "";
        let checkUndefined = khoaHocValue === 'undefined' || satHachValue === 'undefined';
        if (checkEmpty || checkUndefined) {
        } else {
            const data = {
                "tenTB": tenTB,
                "cachTB": cachTB,
                "thongBaoCho": thongBaoChoValue,
                "khoaHoc": checkDataKhoaHoc ? null : khoaHocValue,
                "satHach": checkDataSatHach ? null : satHachValue,
                "noiDung": noiDung,
            }
            try {
                // create data when click button add
                submitFromData(data);
            } catch (error) {
                alert(error);
            }
        }
    }

    function ActionSubmit() {
        return <Grid item xs={12} sm={12}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                className={classes.button}
            >Hủy</Button>
            <Button variant="contained" style={{ marginLeft: "10px" }} type="submit" color="secondary">
                Lưu</Button>
        </Grid>
    }

    return (
        <React.Fragment>
            <Paper>
                <form onSubmit={submitForm} className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            {TenThongBao()}
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ height: "79px", paddingTop: "28px" }}>
                            {CachThongBao()}
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={6}>
                            {ThongBaoCho()}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {LoaiThongBao()}
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        {
                            thongBaoChoValue === 'Học viên' ? <Grid item xs={12} sm={6}>
                                {KhoaHoc()}

                            </Grid> : thongBaoChoValue === 'Thí sinh' ? <Grid item xs={12} sm={6}>
                                {SatHach()}
                            </Grid> : null
                        }
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            {NoiDung()}
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        {ActionSubmit()}
                    </Grid>
                    <ToastContainer />
                </form>
            </Paper>
        </React.Fragment>
    );
};

export default reduxForm({
    form: "CreateFormThongBao"
})(CreateFormThongBao);
