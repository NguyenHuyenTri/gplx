import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../components";
import { useHistory } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get as _get } from "lodash";


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
 * EditForm thong bao                                                                                                         
 * @param {*} props                                                                                                      
 * @returns                                                                                                              
 */
const EditFormThongBao = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { handleSubmit, initialize, thongBao, satHachs, khoaHocs, loaiTBs, cachTBs, thongBaoCho } = props;

    const [select, setSelect] = useState(thongBao.thongBaoCho);

    /**
     * render options selector
     */
    const renderOptionCachThongBao = () => {
        return cachTBs.map((item, index) => {
            return <option value={item.value}>{item.value}</option>;
        });
    };

    const renderOptionLoaiThongBao = () => {
        return loaiTBs.map((item, index) => {
            return <option value={item.value} disabled>{item.value}</option>;
        });
    };

    const renderOptionThongBaoCho = () => {
        return thongBaoCho.map((item, index) => {
            return <option value={item.value}>{item.value}</option>;
        });
    };

    const renderOptionSatHach = () => {
        return (
            <>
                {satHachs.map((item, index) => {
                    return <option value={item.id}>{item.kySatHach}</option>;
                })}
            </>
        );
    };

    const renderOptionKhoaHoc = () => {
        return (
            <>
                {khoaHocs.map((item, index) => {
                    return <option value={item.id}>{item.tenKH}</option>;
                })}
            </>
        );
    };

    /**                                                                                                                    
     * hander Back                                                                                                          
     */
    const handerBack = () => {
        history.goBack();
    };

    /**
     * use effect initial default
     */
    useEffect(() => {
        initialize(thongBao);
    }, [])

    /**
     * return fields on form submit
     */
    function TenThongBao() {
        return thongBao.loaiTB === 'Thông báo người dùng' ?
            <Field
                variant="outlined"
                margin="normal"
                fullWidth
                id="tenTB"
                label="Tên thông báo"
                name="tenTB"
                component={TextField}
            /> :
            <Field
                variant="outlined"
                margin="normal"
                fullWidth
                id="tenTB"
                label="Tên thông báo"
                name="tenTB"
                disabled={true}
                component={TextField}
            />;
    }
    function SoNgayTB() {
        return thongBao.loaiTB === 'Thông báo người dùng' ?
            <Field
                variant="outlined"
                margin="normal"
                fullWidth
                id="soNgayTB"
                label="Số ngày thông báo"
                name="soNgayTB"
                type="number"
                min="0"
                disabled={true}
                component={TextField}
            /> :
            <Field
                variant="outlined"
                margin="normal"
                fullWidth
                id="soNgayTB"
                label="Số ngày thông báo"
                name="soNgayTB"
                type="number"
                min="0"
                component={TextField}
            />

    }

    function LoaiThongBao() {
        return <Field
            style={{ pointerEvents: "none" }}
            component={ComboBoxField}
            options={renderOptionLoaiThongBao()}
            variant="outlined"
            required
            margin="normal"
            id="loaiTB1"
            name="loaiTB1"
            label="Loại thông báo"
            fullWidth
            autoComplete="loaiTB"
        />;
    }

    function CachThongBao() {
        return <Field
            component={ComboBoxField}
            options={renderOptionCachThongBao()}
            variant="outlined"
            required
            margin="normal"
            id="cachTB1"
            name="cachTB1"
            label="Cách thông báo"
            fullWidth
            autoComplete="cachTB"
        />;
    }


    function ThongBaoCho() {
        return <Field
            component={ComboBoxField}
            options={renderOptionThongBaoCho()}
            variant="outlined"
            required
            margin="normal"
            id="thongBaoCho1"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            name="thongBaoCho1"
            label="Thông báo cho"
            fullWidth
            autoComplete="thongBaoCho"
        />;
    }

    function SatHach() {
        return <Field
            component={ComboBoxField}
            options={renderOptionSatHach()}
            variant="filled"
            margin="normal"
            required
            id="satHach1"
            name="satHach1"
            label="Sát hạch"
            fullWidth
            autoComplete="loaiXe"
        />;
    }

    function KhoaHoc() {
        return <Field
            component={ComboBoxField}
            options={renderOptionKhoaHoc()}
            variant="outlined"
            required
            margin="normal"
            id="khoaHoc1"
            name="khoaHoc1"
            label="Khóa học"
            fullWidth
            autoComplete="khoaHoc"
        />;
    }

    function NoiDung() {
        return <Field
            variant="outlined"
            margin="normal"
            fullWidth
            id="noiDung"
            label="Nội dung"
            name="noiDung"
            multiline
            rows={4}
            rowsMax={6}
            component={TextField}
        />;
    }

    return (
        <React.Fragment>
            <Paper>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            {TenThongBao()}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {SoNgayTB()}
                        </Grid>
                    </Grid>


                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            {LoaiThongBao()}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {CachThongBao()}
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            {ThongBaoCho()}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        {
                            // || thongBao.thongBaoCho === 'Học viên',  || thongBao.thongBaoCho === 'Thí sinh'
                            select === 'Học viên' ? <Grid item xs={12} sm={6}>
                                {KhoaHoc()}

                            </Grid> : select === 'Thí sinh' ? <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handerBack}
                                className={classes.button}
                            >Hủy</Button>
                            <Button variant="contained" style={{ marginLeft: "10px" }} type="submit" color="secondary">
                                Lưu</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </React.Fragment>
    );
};

export default reduxForm({
    form: "EditFormThongBao"
})(EditFormThongBao);
