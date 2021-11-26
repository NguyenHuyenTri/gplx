import React, { useEffect, useState } from 'react'
import { Button, makeStyles, Paper, MenuItem, Select, InputLabel, FormControl, TextField, Grid, Typography } from "@material-ui/core";
import { GetAllComboboxDVHCRequest, GetIdDonViHanhChinh, updateDonViHanhChinhRequest } from '../../../reducers/quan-tri/DonViHanhChinh/DonViHanhChinhAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { get as _get } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-css-only/css/bootstrap.min.css';

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
    formText: {
        marginRight: 20,
        fullWidth: true,
    }
}));

export default function UpdateDonViHanhChinh() {

    let query = window.location.pathname.split("/");
    let id = query[query.length - 1];

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const data = useSelector((state) => _get(state, 'dvhc.donvihanhchinh', []));

    const comboboxDHCV = useSelector((state) => _get(state, 'dvhc.comboboxDHCV', []));

    const [ten, setTen] = useState('');
    const [select, setSelect] = useState('');
    const [tenDayDu, setTenDayDu] = useState('');
    const [trangThai, setTrangThai] = useState(false);

    useEffect(() => {
        dispatch(GetIdDonViHanhChinh(id));
        dispatch(GetAllComboboxDVHCRequest());
    }, []);


    useEffect(() => {
        if (data != null && data.loaiDVHC != null) {
            setTen(data.ten)
            setTenDayDu(data.tenDayDu)
            setSelect(data.loaiDVHC.id)
            setTrangThai(data.trangThai)
        }

    }, [data]);

    const handleChange = (event) => {
        setSelect(event.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (ten === '' || tenDayDu === '' || select === '') {
        } else {
            const data = {
                "loaiDVHC": select,
                "ten": ten,
                "tenDayDu": tenDayDu,
                "trangThai": trangThai
            }
            submitUpdate(data);
        }
    }

    const submitUpdate = async (values) => {
        try {
            await dispatch(updateDonViHanhChinhRequest(values, id));
            alertSuccess('Cập nhật vị hành chính thành công!');
            setTimeout(() => handerBack(), 1100);
        } catch (error) {
            alert(error.response.data?.message);
        }
    };

    const handerBack = () => {
        history.goBack();
    };

    const alertSuccess = (message) => {
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

    return (
        <>
            {
                data === null ? null :
                    <div className="card">
                        <div className="card-header"><b>Chỉnh sửa đơn vị hành chính</b></div>
                        <div className="card-body">
                            <React.Fragment>
                                <Paper>
                                    <form onSubmit={handleSubmit} className={classes.form}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={12}>
                                                <Grid item xs={12} sm={12}>
                                                    <TextField
                                                        required
                                                        variant="outlined"
                                                        margin="normal"
                                                        multiline
                                                        label='Tên ngắn gọn'
                                                        fullWidth
                                                        autoComplete='family-name'
                                                        value={ten}
                                                        onChange={e => setTen(e.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    label='Tên đầy đủ'
                                                    variant="outlined"
                                                    margin="normal"
                                                    multiline
                                                    fullWidth
                                                    autoComplete='family-name'
                                                    value={tenDayDu}
                                                    onChange={e => setTenDayDu(e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} >
                                                <FormControl variant="outlined" className={classes.formText} fullWidth>
                                                    <InputLabel id="demo-simple-select-outlined-label">Loại đơn vị hành chính *</InputLabel>
                                                    <Select
                                                        required
                                                        margin="normal"
                                                        variant="outlined"
                                                        multiline
                                                        label='Loại đơn vị hành chính *'
                                                        value={select}
                                                        onChange={handleChange}
                                                    >
                                                        {comboboxDHCV.map((value) => (
                                                            <MenuItem key={value.id} value={value.id} >
                                                                {value.loai}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} >
                                                <FormControl variant="outlined" className={classes.formText} fullWidth>
                                                    <InputLabel id="demo-simple-select-outlined-label">Trạng thái </InputLabel>
                                                    <Select
                                                        margin="normal"
                                                        variant="outlined"
                                                        multiline
                                                        label='Trạng thái'
                                                        value={trangThai}
                                                        onChange={(e) => setTrangThai(e.target.value)}
                                                    >
                                                        <MenuItem value={true} >
                                                            Hiệu lực
                                                </MenuItem>
                                                        <MenuItem value={false} >
                                                            Chưa hiệu lực
                                                </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>

                                            <Grid item xs={12} sm={12}>
                                                <Typography align='center'>
                                                    <Button variant='contained' color="secondary" type='submit' size='large' >
                                                        Lưu
                                                    </Button>
                                                    {' '}
                                                    <Button variant='contained' color='primary' onClick={handerBack} size='large'>
                                                        Hủy
                                                    </Button>
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </React.Fragment>

                        </div>
                    </div>
            }
            <ToastContainer />
        </>
    )
}