import React, { useEffect, useState } from 'react'
import { Button, makeStyles, Paper, MenuItem, Select, InputLabel, FormControl, TextField, Grid, Typography } from "@material-ui/core";
import { GetAllComboboxDonViVanTai, getDonViVanTaiByIdRequest, updateDonViVanTaiRequest, resetData } from '../../../reducers/quan-tri/DonViHanhChinh/DonViVanTaiAction'
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


export default function UpdateDonViVanTai() {

    let query = window.location.pathname.split("/");
    let id = query[query.length - 1];

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [select, setSelect] = useState('');
    const [tenDV, setTenDV] = useState('');
    const [tenCQQL, setTenCQQL] = useState('');
    const [ghiChu, setGhiChu] = useState('');

    const comboboxDHVT = useSelector((state) => _get(state, 'donviVt.donvicombobox', []));
    const data = useSelector((state) => _get(state, 'donviVt.donvivantai', []));



    const handleSubmit = (e) => {
        e.preventDefault();
        if (tenDV === '' || tenCQQL === '' || select === '') {
        } else {
            const data = {
                "loaiDVGTVT": select,
                "tenDV": tenDV,
                "tenCQQL": tenCQQL,
                "ghiChu": ghiChu
            }
            submitUpdate(data);
        }
    }

    const submitUpdate = async (values) => {
        try {
            await dispatch(updateDonViVanTaiRequest(values, id));
            alertSuccess('Cập nhật đơn vị giao thông vận tải thành công!');
            setTimeout(() => handerBack(), 1100);
        } catch (error) {
            alert(error.response.data?.message);
        }
    };

    const handerBack = () => {
        dispatch(resetData())
        history.goBack();
    };

    useEffect(() => {
        const fetching = async () => {
            await dispatch(resetData());
            await dispatch(getDonViVanTaiByIdRequest(id));
            await dispatch(GetAllComboboxDonViVanTai());
        };
        fetching();

    }, []);

    useEffect(() => {
        if (data != null && data.loaiDVGTVT != null) {
            setTenCQQL(data.tenCQQL)
            if (data.ghiChu != null) {
                setGhiChu(data.ghiChu)
            }
            setTenDV(data.tenDV)
            setSelect(data.loaiDVGTVT.id)
        }

    }, [data]);

    const handleChange = (event) => {
        setSelect(event.target.value);
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
            <div className="card">
                <div className="card-header"><b>Cập nhật đơn vị giao thông vận tải</b></div>
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
                                                label='Tên đơn vị'
                                                fullWidth
                                                autoComplete='family-name'
                                                value={tenDV}
                                                onChange={e => setTenDV(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            margin="normal"
                                            multiline
                                            label='Tên cơ quan quản lý'
                                            fullWidth
                                            autoComplete='family-name'
                                            value={tenCQQL}
                                            onChange={e => setTenCQQL(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <FormControl variant="outlined" className={classes.formText} fullWidth>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                multiline
                                                fullWidth
                                                label='Ghi chú'
                                                autoComplete='family-name'
                                                value={ghiChu}
                                                onChange={e => setGhiChu(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} >
                                        <FormControl variant="outlined" className={classes.formText} fullWidth>
                                            <InputLabel id="demo-simple-select-outlined-label">Loại đơn vị giao thông vận tải*</InputLabel>
                                            <Select
                                                required
                                                margin="normal"
                                                variant="outlined"
                                                multiline
                                                label='Loại đơn vị giao thông vận tải *'
                                                value={select}
                                                onChange={handleChange}
                                            >
                                                {comboboxDHVT.map((value) => (
                                                    <MenuItem key={value.id} value={value.id} >
                                                        {value.loai}
                                                    </MenuItem>
                                                ))}
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
            <ToastContainer />
        </>
    )
}