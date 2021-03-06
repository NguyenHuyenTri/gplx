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
    const [cachTB, setCachTB] = useState('Nh???n tin SMS');
    const [thongBaoChoValue, setThongBaoChoValue] = useState('Nh??n vi??n');
    const [loaiTBValue, setLoaiTBValue] = useState('Th??ng b??o ng?????i d??ng');
    const [noiDung, setNoiDung] = useState();
    const [satHachValue, setSatHachValue] = useState(3);
    const [khoaHocValue, setKhoaHocValue] = useState(10);

    // select for picker
    const cachTBs = [{ value: "Nh???n tin SMS" }, { value: "Th??ng b??o tr??n web" }];
    const loaiTBs = [{ value: "Th??ng b??o ng?????i d??ng" }];
    const thongBaoCho = [{ value: "Nh??n vi??n" }, { value: "H???c vi??n" }, { value: "Th?? sinh" }, { value: "Gi??o vi??n" }];
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
            label="T??n th??ng b??o"
            name="tenTB"
        />
    }

    function LoaiThongBao() {
        return <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-outlined-label">Lo???i th??ng b??o</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                value={loaiTBValue}
                required
                defaultValue="Th??ng b??o ng?????i d??ng"
                onChange={(e) => setLoaiTBValue(e.target.value)}
                label="Lo???i th??ng b??o"
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
            <InputLabel id="demo-simple-select-outlined-label">Cho??n c??ch th??ng b??o</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                value={cachTB}
                required
                onChange={(e) => setCachTB(e.target.value)}
                label="Cho??n c??ch th??ng b??o"
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
            <InputLabel id="demo-simple-select-outlined-label">Th??ng b??o cho</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                value={thongBaoChoValue}
                required
                onChange={(e) => setThongBaoChoValue(e.target.value)}
                label="Th??ng b??o cho"
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
            <InputLabel id="demo-simple-select-outlined-label">S??t h???ch</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                value={satHachValue}
                required
                onChange={(e) => setSatHachValue(e.target.value)}
                label="S??t h???ch"
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
            <InputLabel id="demo-simple-select-outlined-label">Kh??a h???c</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                value={khoaHocValue}
                required
                onChange={(e) => setKhoaHocValue(e.target.value)}
                label="Kh??a h???c"
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
            label="N???i dung"
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
        showToast('Th??m th??ng b??o th??nh c??ng!');
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
            >H???y</Button>
            <Button variant="contained" style={{ marginLeft: "10px" }} type="submit" color="secondary">
                L??u</Button>
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
                            thongBaoChoValue === 'H???c vi??n' ? <Grid item xs={12} sm={6}>
                                {KhoaHoc()}

                            </Grid> : thongBaoChoValue === 'Th?? sinh' ? <Grid item xs={12} sm={6}>
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
