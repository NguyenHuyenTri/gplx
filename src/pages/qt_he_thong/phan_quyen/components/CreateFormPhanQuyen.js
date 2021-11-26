import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { reduxForm } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { get as _get } from "lodash";
import { ToastContainer, toast } from 'react-toastify';
import { InputLabel, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import cups from './cups.png';
import axios from "axios";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { GetAllDonViRequest } from '../../../../reducers/quan-tri/DonVi/DonViAction';
import { GetAllChucVuRequest } from '../../../../reducers/quan-tri/ChucVu/ChucVuAction';
import { getNhomChucNangRequest } from '../../../../reducers/quan-tri/PhanQuyen/PhanQuyenAction';
import { FormControlLabel, Checkbox } from '@material-ui/core'
import Input from '@material-ui/core/Input';
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
    checkBoxStyle: {
        display: "flex",
    },
    actionSubmit: {
        display: "flex",
        justifyContent: "space-between",
    },
    attention: {
        color: "red",
        paddingTop: "10px",
    },
    multiCheckbox: {
        border: "2px solid #ccc", width: "100%", height: "150px", overflowY: "scroll",
        padding: "5px 10px 5px 10px"
    }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


/**                                                                                                                      
 * CreateForm phan quyen                                                                                                    
 * @param {*} props                                                                                                      
 * @returns                                                                                                              
 */
const CreateFormPhanQuyen = (props) => {

    const { handleSubmit, initialize } = props;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const dataDonVi = useSelector((state) => _get(state, "donVis.donVis", []));
    const dataChucVu = useSelector((state) => _get(state, "chucVus.chucVus", []));
    const dataNhomChucNang = useSelector((state) => _get(state, "phanQuyens.nhomChucNangs", []));

    /**
     * set state for fields on form
     */
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [rePassWord, setRePassWord] = useState('');
    const [genderValue, setGenderValue] = React.useState('Nam');
    const [surAndMiddleName, setSurAndMiddleName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [dayOfBirth, setDayOfBirth] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [identityNumber, setIdentityNumber] = useState(''); // identityNumber: so cmnd
    const [dateReleaseId, setDateReleaseId] = useState(''); // dateReleaseId: ngay phat hanh cmnd
    const [placeReleaseId, setPlaceReleaseId] = useState('') // placeReleaseId: noi cap cmnd
    // const [daiDienDV, setDaiDienDV] = useState(true);
    const [daiDienDV, setDaiDienDV] = React.useState({ dddv: true });
    const [nvDangHD, setNVDangHD] = React.useState({ nvDangHD: true });
    const [gioiThieu, setGioiThieu] = useState('');
    // chon don vi
    const [selectDV, setSelectDV] = useState(''); // select value don vi
    // chon chuc vu
    const [selectCV, setSelectCV] = useState('');
    // select image
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    // multi select
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedNhomQuyen, setCheckedNhomQuyen] = useState([]);
    const [nhomQuyen, setNhomQuyen] = useState([]);

    useEffect(() => {
        if (dataNhomChucNang.length !== 0) {
            setDataPq();
        }
    }, [dataNhomChucNang])


    const setDataPq = () => {
        const dataUpdate = [...nhomQuyen]
        if (nhomQuyen.length === 0) {
            for (let i = 0; i < dataNhomChucNang.length; i++) {
                if (dataNhomChucNang[i].id !== null) {

                    dataUpdate.push({
                        "id": dataNhomChucNang[i].id,
                        "tenNhomCN": dataNhomChucNang[i].tenNhomCN,
                        "chucNangs": dataNhomChucNang[i].chucNangs,
                        "checked": false,
                        "idSelect": []
                    })
                }
            }
        }
        setNhomQuyen([...dataUpdate])
    }


    /**
     * setting change picture
     * @param {*} e 
     */
    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
        console.log(e.target.files[0].name);
    };

    /**
     * handle select multi checkbox
     * @param {*} c 
     * @returns 
     */
    const handleToggle = (e) => {
        const clickedNhomQuyen = checkedNhomQuyen.indexOf(e.target.value);

        const all = [...checkedNhomQuyen];

        if (clickedNhomQuyen === -1) {
            all.push(e.target.value);
        } else {
            all.splice(e.target.value, 1);
        }
        setCheckedNhomQuyen(all);
        console.log(all)
    };

    /**
     * handle select don vi
     * @param {*} event 
     */
    const handleChangeDonVi = (event) => {
        setSelectDV(event.target.value);
    };

    /**
     * handle select chuc vu
     */
    const handleChangeChucVu = (event) => {
        setSelectCV(event.target.value);
    };

    const handleChangeDaiDienDV = (event) => {
        setDaiDienDV({ ...daiDienDV, [event.target.name]: event.target.checked });
    };

    const handleChangeNVDangHD = (event) => {
        setNVDangHD({ ...nvDangHD, [event.target.name]: event.target.checked });
    };

    /**                                                                                                                    
     * hander Back                                                                                                          
     */
    const handerBack = () => {
        history.goBack();
    };

    useEffect(() => {
        dispatch(GetAllDonViRequest());
        dispatch(GetAllChucVuRequest());
        dispatch(getNhomChucNangRequest());
    }, [])

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

    const appendFormData = () => {
        const formData = new FormData();
        formData.append('file', picture);
        formData.append('loaiAnh', 'Học viên');
        formData.append('khoaHoc', '10');
        return formData;
    }

    const submitForm = async () => {
        const isEmpty = userName == '' || passWord == '' || genderValue == '' || surAndMiddleName == '' || firstName == '';
        const diffPassword = passWord === rePassWord;
        if (isEmpty) {
        } 
        if(!diffPassword) {
            showToast('Mật khẩu nhập lại không trùng khớp!');
        } else {
            const formData = appendFormData();

            console.log(formData)
            axios.post('upload/image',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
                .then(res => { // then print response status
                    console.log(res.data)
                    if (res.data.message === 'upload hình ảnh thành công!') {
                        console.log(res.data.hinhAnh)
                        const data = {
                            "tenDN": userName,
                            "matKhau": passWord,
                            "gioiTinh": genderValue,
                            "hoTen": surAndMiddleName + ' ' + firstName,
                            "ngaySinh": dayOfBirth,
                            "email": emailAddress,
                            "soDT": phone,
                            "diaChi": address,
                            "soCMND": identityNumber,
                            "ngayCap": dateReleaseId,
                            "noiCap": placeReleaseId,
                            "moTa": gioiThieu,
                            "hinhAnh": res.data.hinhAnh,
                            "chucNangArray": checked,
                            "donVi": selectDV,
                        }
                        console.log(data);
                        //  submit tại đây
                    }
                })
        }
    }

    return (
        <React.Fragment>
            <Paper>
                <form onSubmit={submitForm} className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                label="Tên đăng nhập"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                onChange={(e) => setPassWord(e.target.value)}
                                value={passWord}
                                label="Mật khẩu"
                                name="soQDKG"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                label="Nhập lại mật khẩu"
                                onChange={(e) => setRePassWord(e.target.value)}
                                value={rePassWord}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                label="Họ & tên lót"
                                onChange={(e) => setSurAndMiddleName(e.target.value)}
                                value={surAndMiddleName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                label="Tên"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Giới tính *</label>
                            <div className={classes.checkBoxStyle}>
                                <div>
                                    <Radio
                                        checked={genderValue === 'Nam'}
                                        onChange={(e) => setGenderValue(e.target.value)}
                                        value="Nam"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Nam' }}
                                    />
                                    <label>Nam</label>
                                </div>
                                <div>
                                    <Radio
                                        checked={genderValue === 'Nữ'}
                                        onChange={(e) => setGenderValue(e.target.value)}
                                        value="Nữ"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Nữ' }}
                                    />
                                    <label>Nữ</label>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setDayOfBirth(e.target.value)}
                                value={dayOfBirth}
                                label="Ngày sinh"
                                name="ngaySinh"
                                type="date"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setEmailAddress(e.target.value)}
                                value={emailAddress}
                                type="email"
                                label="Địa chỉ email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                type="phone"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                label="Số điện thoại"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                label="Địa chỉ"
                                name="diaChi"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setIdentityNumber(e.target.value)}
                                value={identityNumber}
                                label="Số CMND"
                                name="soCMND"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setDateReleaseId(e.target.value)}
                                value={dateReleaseId}
                                label="Ngày cấp"
                                name="ngayCap"
                                type="date"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={(e) => setPlaceReleaseId(e.target.value)}
                                value={placeReleaseId}
                                label="Nơi cấp"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} style={{ width: "100%" }}>
                            <FormControl variant="outlined" style={{ width: "100%" }}>
                                <InputLabel id="demo-simple-select-outlined-label">Chọn đơn vị</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    value={selectDV}
                                    onChange={(e) => setSelectDV(e.target.value)}
                                    label="Chọn đơn vị"
                                    component={TextField}
                                    id="donVi"
                                    name="donVi"
                                >
                                    {dataDonVi.map((value, index) => (
                                        <MenuItem key={index} value={value.id} >
                                            {value.tenDonVi}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{ width: "100%" }}>
                            <FormControl variant="outlined" style={{ width: "100%" }}>
                                <InputLabel id="demo-simple-select-outlined-label">Chọn chức vụ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    value={selectCV}
                                    onChange={(e) => setSelectCV(e.target.value)}
                                    label="Chọn chức vụ"
                                    component={TextField}
                                    id="chucVu"
                                    name="chucVu"
                                >
                                    {dataChucVu.map((value, index) => (
                                        <MenuItem key={index} value={value.id} >
                                            {value.tenChucVu}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} style={{ width: "100%" }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                multiline
                                rows={7}
                                onChange={(e) => setGioiThieu(e.target.value)}
                                value={gioiThieu}
                                label="Giới thiệu"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className="formInstructionsDiv formElement">
                                <p className="instructionsText" />
                                <div className="previewProfilePic">
                                    <img className="playerProfilePic_home_tile" src={imgData} width="90px" height="100px" />
                                </div>
                                <div className="register_profile_image">
                                    <input id="profilePic" type="file" onChange={onChangePicture} />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div>
                                <label style={{ color: "#CC4C4F" }}><b>Đặc quyền (tùy chọn)</b></label>
                                <div className={classes.multiCheckbox}>
                                    {nhomQuyen.map((value, index) => {
                                        return <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={value.checked}
                                                    onChange={(e) => {
                                                        const dataUpdate = [...nhomQuyen];
                                                        dataUpdate[index].checked = !value.checked;
                                                        setNhomQuyen([...dataUpdate])
                                                    }
                                                    }
                                                    color="primary"
                                                />
                                            }
                                            label={value.tenNhomCN}
                                        />
                                    }
                                    )}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}></Grid>
                        <Grid item xs={12} sm={12}>
                            <div>
                                {/* <p className="instructionsText" /> */}
                                {
                                    nhomQuyen.map((value, index) => {
                                        if (value.checked) {
                                            return <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label">Chọn {value.tenNhomCN}</InputLabel>
                                                <Select
                                                    value={nhomQuyen[index].idSelect}
                                                    multiple
                                                    input={<Input />}
                                                    renderValue={(selected) => selected.join(', ')}
                                                    MenuProps={MenuProps}
                                                    onChange={(e) => {
                                                        console.log(e.target)
                                                        const { options } = e.target;
                                                        const dataUpdate = [...nhomQuyen];
                                                        const temp = [...nhomQuyen[index].idSelect];
                                                        for (let i = 0, l = options.length; i < l; i += 1) {
                                                            if (options[i].selected) {
                                                                temp.push(options[i].value);
                                                            }
                                                        }
                                                        dataUpdate[index].idSelect=temp;
                                                        setNhomQuyen([...dataUpdate]);
                                                    }}
                                                    label={value.tenNhomCN}
                                                >
                                                    {value.chucNangs.map((value) => (
                                                        <MenuItem key={value.id} value={value.id} >
                                                            { value.tenCN}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        }
                                    })
                                }
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <hr />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.actionSubmit}>
                                <i className={classes.attention}>* Là những trường bắt buộc phải nhập</i>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handerBack}
                                        className={classes.button}
                                        style={{ backgroundColor: "red", color: "#FFFFFF" }}
                                    >Hủy</Button>
                                    <Button variant="contained" color="primary" style={{ marginLeft: "10px" }} onClick={submitForm}>
                                        Lưu thông tin người dùng</Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <ToastContainer />
                </form>
            </Paper>
        </React.Fragment>
    );
};

export default reduxForm({
    form: "CreateFormPhanQuyen"
})(CreateFormPhanQuyen);