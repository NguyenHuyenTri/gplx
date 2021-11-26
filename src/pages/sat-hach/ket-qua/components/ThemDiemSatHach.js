import React, { useState } from 'react'
import { Button, makeStyles, Paper, TextField, Grid ,Typography} from "@material-ui/core";
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


export default function ThemDiemSatHach(props) {

    const classes = useStyles();
    const { onClose, data, handleUpdate, diemDatSatHach } = props;
    const [diemLyThuyet, setDiemLyThuyet] = useState('')
    const [diemTH1, setDiemTH1] = useState('')
    const [diemTH2, setDiemTH2] = useState('')
    
    const handleSubmit = (e) => {
       
        e.preventDefault();
        if (diemLyThuyet === '' || diemTH1 === '' || diemTH2 === '') {
        } else {
            let  xetLoai = '';
            if (diemTH1 >= 80 && diemTH2 >= 80 && diemLyThuyet >= diemDatSatHach.diemdatSH) {
                xetLoai = 'Đạt';
            } else {
                xetLoai = 'Không đạt';
            }
            const submit = {
                "thiSinh": data.id,
                "diemLyThuyet": diemLyThuyet,
                "lanThi":data.ketQuaSHs.length===0 ? 1 :data.ketQuaSHs.length+1,
                "diemTH1": diemTH1,
                "diemTH2": diemTH2,
                "ketQuaSH": xetLoai,
            }
            handleUpdate(submit);
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Thêm mới điểm sát hạch cho học viên <span style={{ color: 'black', fontWeight: 'bold' }}>{data.hoTen}</span></b></div>
                <div className="card-body">
                    <React.Fragment>
                        <Paper>

                            <form onSubmit={handleSubmit} className={classes.form}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            margin="normal"
                                            label='Điểm lý thuyết'
                                            fullWidth
                                            autoComplete='family-name'
                                            value={diemLyThuyet}
                                            type='number'
                                            onChange={e => setDiemLyThuyet(e.target.value)}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                                                { min: 0 }
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            margin="normal"
                                            label='Điểm thực hành lái xe trong hình'
                                            fullWidth
                                            autoComplete='family-name'
                                            value={diemTH1}
                                            type='number'
                                            onChange={e => setDiemTH1(e.target.value)}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                                                { min: 0 }
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            margin="normal"
                                            label='Điểm thực hành lái xe trên đường'
                                            fullWidth
                                            autoComplete='family-name'
                                            value={diemTH2}
                                            type='number'
                                            onChange={e => setDiemTH2(e.target.value)}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                                                { min: 0 }
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                              
                                    <Grid item xs={12} sm={12}>
                                    <Typography align='center'>
                                    <Button variant='contained' color="secondary" type='submit' size='large' >
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