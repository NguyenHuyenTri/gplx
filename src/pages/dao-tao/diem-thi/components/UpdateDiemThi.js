import React, { useState, useEffect } from 'react'
import { Button, makeStyles, Paper, TextField, Grid } from "@material-ui/core";
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


export default function UpdateDiemThi(props) {
    const classes = useStyles();

    const { onClose, data, handleUpdate, dataMonHocs } = props;

    const [stateDiem, setStateDiem] = useState(dataMonHocs.map((value) => {
        return {
            "monHoc": value.id,
            "tenMH": value.tenMH,
            "diem": null,
        }
    }))

    useEffect(() => {
        getMonHoc();
    }, [dataMonHocs])

    const getMonHoc = () => {
        const dataUpdate = [...stateDiem];
        for (let i = 0; i < dataMonHocs.length; i++) {
            if (data.monHocs.length !== 0) {
                for (let j = 0; j < data.monHocs.length; j++) {
                    if (dataMonHocs[i].id === data.monHocs[j].id) {
                        dataUpdate[i] = {
                            "monHoc": dataMonHocs[i].id,
                            "tenMH": dataMonHocs[i].tenMH,
                            "diem": data.monHocs[j].diemThi.diem,
                        }
                    }
                }
            }
        }
        setStateDiem([...dataUpdate]);
    }

    function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }

    const submit = (e) => {
        e.preventDefault();

        const newArraySubject = stateDiem.map((item, index) => {
            return {
                diem: Math.round(item.diem * 10) / 10,
                monHoc: item.monHoc,
                tenMH: item.tenMH,
            }
        })
        const datasubmit = {
            "hocVien": data.id,
            "monHocs": newArraySubject,
        }
        handleUpdate(datasubmit);
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Cập nhật điểm môn học cho học viên <span style={{ color: 'black', fontWeight: 'bold' }}>{data.hoTen}</span></b></div>
                <div className="card-body">
                    <React.Fragment>
                        <Paper>
                            <form onSubmit={submit} className={classes.form}>
                                <Grid container sm={12} spacing={2}>
                                    {
                                        stateDiem.map((value, index) => {
                                            return (
                                                <>
                                                    <Grid item sm={7} >
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            label={'Môn học'}
                                                            fullWidth
                                                            disabled
                                                            autoComplete='family-name'
                                                            value={value.tenMH}
                                                        />
                                                    </Grid>
                                                    {/* <Grid item sm={2} >
                                                        
                                                    </Grid> */}
                                                    <Grid item sm={5} >
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            label={`Điểm`}
                                                            fullWidth
                                                            type='number'
                                                            value={value.diem}
                                                            inputProps={{ min: 0, max: 10, step: 'any' }}
                                                            onChange={
                                                                (e) => {
                                                                    const dataUpdate = [...stateDiem];
                                                                    dataUpdate[index].diem = e.target.value;
                                                                    setStateDiem([...dataUpdate]);
                                                                }
                                                            }
                                                        />
                                                    </Grid>
                                                </>
                                            )
                                        })
                                    }

                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "center" }}>
                                        <Button variant='contained' color='primary' onClick={onClose}
                                            size='large'>Hủy</Button>
                                        <p style={{ paddingLeft: "10px" }}></p>
                                        <Button variant='contained' color="secondary" type='submit'
                                            size='large'>Lưu</Button>
                                    </Grid>
                                </Grid>

                            </form>
                        </Paper>
                    </React.Fragment>

                </div>
            </div>
        </>
    )

}
