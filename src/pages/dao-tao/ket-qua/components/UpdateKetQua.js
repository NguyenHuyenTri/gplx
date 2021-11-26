import React, { useState, useEffect } from 'react'
import { Button, makeStyles, Paper, TextField, Grid,Typography } from "@material-ui/core";
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
        marginTop: theme.spacing(2),
        marginLeft: 10,
        marginBottom: theme.spacing(2),
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

export default function UpdateKetQua(props) {
    const classes = useStyles();

    

    const { onClose, data, handleUpdate, listmonhocdaotao, listmonhoc } = props;
    const [isChange, setIsChange] = useState(true);
    const [state, setState] = useState(listmonhocdaotao.map((value) => {
        return {
            "monHoc": value.id,
            "tenMH": value.tenMH,
            "diem": null,
        }
    }))

    const [stateDiem, setStateDiem] = useState(listmonhoc.map((value) => {
        return {
            "monHoc": value.id,
            "tenMH": value.tenMH,
            "diem": null,
        }
    }))
 
    const [diemThiLai, setDiemThiLai] = useState(data.diemThiLai);
    const [soCNN, setSoCNN] = useState(data.soCCN)
    const [soHieu, setSoHieu] = useState(data.soHieu)

    function roundToTwo(num) {
        return +(Math.round(num + "e+1") + "e-1");
    }


    useEffect(() => {
        getMonHocDaoTao();
    }, [listmonhocdaotao])

    useEffect(() => {
        getMonHoc();
    }, [listmonhoc])

    const getMonHocDaoTao = () => {
        const dataUpdate = [...state];
        for (let i = 0; i < listmonhocdaotao.length; i++) {
            if (data.monHocs.length !== 0) {
                for (let j = 0; j < data.monHocs.length; j++) {
                    if (listmonhocdaotao[i].id === data.monHocs[j].id) {
                        dataUpdate[i] = {
                            "monHoc": listmonhocdaotao[i].id,
                            "tenMH": listmonhocdaotao[i].tenMH,
                            "diem": data.monHocs[j].diemThi.diem,
                        }
                    }
                }
            }

        }
        setState([...dataUpdate]);
    }

    const getMonHoc = () => {
        const dataUpdate = [...stateDiem];
        for (let i = 0; i < listmonhoc.length; i++) {
            if (data.monHocs.length !== 0) {
                for (let j = 0; j < data.monHocs.length; j++) {
                    if (listmonhoc[i].id === data.monHocs[j].id) {
                        dataUpdate[i] = {
                            "monHoc": listmonhoc[i].id,
                            "tenMH": listmonhoc[i].tenMH,
                            "diem": data.monHocs[j].diemThi.diem,
                        }
                    }
                }
            }
        }
        setStateDiem([...dataUpdate]);
    }

    const submit = (e) => {
        e.preventDefault();
        let total = 0;
        let int = 0;
        let diemTKKH = '';

        const arraySubmit = state.concat(stateDiem);

        arraySubmit.map((value) => {
            if (value.diem !== null) {
                if(value.tenMH==='Lý thuyết'&&diemThiLai!=null&&diemThiLai!=='')
                {
                    total += parseFloat(diemThiLai);
                }else{
                    total += parseFloat(value.diem);
                }
                int += 1;
            }
        })

        if (int !== 0) {
            diemTKKH = roundToTwo(parseFloat(total / int));
        } else {
            diemTKKH = null;
        }

        if(diemTKKH%1===0){
            diemTKKH=diemTKKH+'.0'
        }
        
        const datasubmit = {
            "hocVien": data.id,
            "diemThiLai": diemThiLai !== null && diemThiLai !== '' ? diemThiLai : null,
            "diemTKKH": diemTKKH,
            "soCCN": soCNN,
            "soHieu": soHieu,
            "ngayTN": data.ngayTN,
            "monHocs": arraySubmit,
        }
        handleUpdate(datasubmit);
    }


    return (
        <>
            <div className="card">
                <div className="card-header"><h5><b>Cập nhật kết đào tạo học cho học viên {' '}
                    <span style={{ color: 'black', fontWeight: 'bold' }}>{data.hoTen}</span></b></h5></div>
                <div className="card-body">
                    <React.Fragment>
                        <Paper>


                            <form onSubmit={submit} className={classes.form}>

                                <Grid container sm={12} spacing={2}>
                                    <Grid sm={6} item container>
                                        <Grid sm={12}>
                                            <h6 style={{ paddingTop: 15, paddingBottom: 0 }}>
                                                <strong>ĐIỂM TỔNG KẾT MÔN HỌC
                                        </strong></h6>
                                        </Grid>
                                        <Grid sm={12} item container spacing={1}>
                                        {
                                            stateDiem.map((value, index) => {
                                                return (
                                                    <>
                                                        <Grid item sm={10} >
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                label={'Môn học'}
                                                                fullWidth
                                                                autoComplete='family-name'
                                                                value={value.tenMH}
                                                            />
                                                        </Grid>

                                                        {' '}
                                                        <Grid item sm={2} >
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                label={`Điểm`}
                                                                fullWidth
                                                                type='number'                                                  
                                                                inputProps={{ min: 0,step: 'any',}}
                                                                value={value.diem}
                                                                onChange={
                                                                    (e) => {
                                                                        const dataUpdate = [...stateDiem];
                                                                        if (isNaN(e.target.value) || e.target.value === "") {
                                                                            dataUpdate[index].diem = null;
                                                                        } else {
                                                                            dataUpdate[index].diem = e.target.value;
                                                                        }
                                                                        setIsChange(false)
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
                                    </Grid>
                                    <Grid sm={6} item container>
                                        <Grid sm={12}>
                                            <h6 style={{ paddingTop: 15, paddingBottom: 0 }}>
                                                <strong>ĐIỂM KIỂM TRA KẾT THÚC KHÓA HỌC
                                        </strong></h6>
                                        </Grid>
                                        <Grid sm={12} item container spacing={1}>
                                        {
                                            state.map((value, index) => {
                                                return (
                                                    <>
                                                        <Grid item sm={10} >
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                label={'Môn học'}
                                                                fullWidth
                                                                autoComplete='family-name'
                                                                value={value.tenMH}
                                                            />
                                                        </Grid>

                                                        {' '}
                                                        <Grid item sm={2} >
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                label={`Điểm`}
                                                                fullWidth
                                                                type='number'
                                                                inputProps={{ min: 0,step: 'any',}}
                                                                value={value.diem}
                                                                onChange={
                                                                    (e) => {
                                                                        const dataUpdate = [...state];
                                                                        if (isNaN(e.target.value) || e.target.value === "") {
                                                                            dataUpdate[index].diem = null;
                                                                        } else {
                                                                            dataUpdate[index].diem = e.target.value;
                                                                        }
                                                                        setIsChange(false)
                                                                        setState([...dataUpdate]);
                                                                    }
                                                                }
                                                            />
                                                        </Grid>
                                                    </>
                                                )
                                            })
                                        }
                                    </Grid>
                                    </Grid>                        
                                    <Grid item container spacing={1}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                label='Điểm thi lại lý thuyết lần 2'
                                                fullWidth
                                                autoComplete='family-name'
                                                value={diemThiLai}
                                                type='number'
                                                onChange={e =>{ setDiemThiLai(e.target.value);setIsChange(false);}}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                label='Số CNN'
                                                fullWidth
                                                autoComplete='family-name'
                                                value={soCNN}
                                                onChange={e => {setSoCNN(e.target.value);setIsChange(false);}}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                label='Số hiệu'
                                                fullWidth
                                                autoComplete='family-name'
                                                value={soHieu}
                                                onChange={e => {setSoHieu(e.target.value); setIsChange(false); }  }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                    <Typography align='center'>
                                    <Button variant='contained' disabled={isChange} color="secondary" type='submit' size='large' >
                                            Lưu
                                    </Button>
                                        {' '}
                                        <Button variant='contained' color='primary' onClick={onClose} size='large'>
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
        </>
    )

}
