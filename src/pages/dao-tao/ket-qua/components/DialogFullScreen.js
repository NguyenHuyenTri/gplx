import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Slide, List, Tooltip } from '@material-ui/core';
import { Button, Grid } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import { IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import MaterialTable from 'material-table'
import './dialog.css'


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    'MuiTableCell-paddingNone:last-child ': {
        display:'none'
      },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {

    const { onClose, list, submit } = props;

    const classes = useStyles();

    const [listOk, setListOk] = useState([]);
    const [listFailed, setListFaild] = useState([]);


    useEffect(() => {
        var x = [];
        var y = [];
        if (list != null) {
            list.map((value) => {
                if (value.diemTKKH >= 5) {
                    x.push(value);
                } else {
                    y.push(value);
                }
            })
        }
        setListFaild(y);
        setListOk(x);
    }, [])


    const send = () => {
        if (listOk.length > 0) {
            var listId = [];
            for (var i = 0; i < listOk.length; i++) {
                listId[i] = listOk[i].id;
            }
            submit(listId)
        }

    }

    return (
        <div style={{ backgroundColor: 'red' }}>
            <Dialog fullScreen open={true} onClose={onClose} TransitionComponent={Transition} >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                        </Typography>
                        <Tooltip title='Đóng'>
                            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <List >
                    <Grid container sm={12} spacing={1} style={{ marginTop: '1%' }}>
                        <Grid sm={6}>
                            <div style={{ maxWidth: '94%', marginLeft: '5%' }}>
                                <MaterialTable
                                    columns={[
                                        {
                                            title: 'Họ tên', field: 'hoTen',
                                            render: rowdata => <div style={{ width: 150 }}>{rowdata.hoTen}</div>
                                        },
                                        {
                                            title: 'Ngày sinh', field: 'ngaySinh',
                                            render: rowdata => <div style={{ width: 100 }}>{rowdata.ngaySinh}</div>
                                        },
                                        {
                                            title: 'Giới tính', field: 'gioiTinh',
                                            render: rowdata => <div style={{ width: 100 }}>{rowdata.ngaySinh}</div>
                                        },
                                        {
                                            title: 'Địa chỉ', field: 'diaChi',
                                            render: rowdata => <div style={{ width: 200 }}>{rowdata.diaChi}</div>
                                        }
                                    ]}

                                    data={listOk}
                                    title="Danh sách đủ điều kiện sát hạch"
                                    options={options}
                                    localization={localizationStyle}
                                    
                                />
                            </div>
                        </Grid>
                        <Grid sm={6}>
                            <div style={{ maxWidth: '94%', marginRight: '5%' }}>
                                <MaterialTable
                                    columns={[
                                        {
                                            title: 'Họ tên', field: 'hoTen',
                                            render: rowdata => <div style={{ width: 150 }}>{rowdata.hoTen}</div>
                                        },
                                        {
                                            title: 'Ngày sinh', field: 'ngaySinh',
                                            render: rowdata => <div style={{ width: 100 }}>{rowdata.ngaySinh}</div>
                                        },
                                        {
                                            title: 'Giới tính', field: 'gioiTinh',
                                            render: rowdata => <div style={{ width: 100 }}>{rowdata.ngaySinh}</div>
                                        },
                                        {
                                            title: 'Địa chỉ', field: 'diaChi',
                                            render: rowdata => <div style={{ width: 200 }}>{rowdata.diaChi}</div>
                                        }
                                    ]}
                                    data={listFailed}
                                    title="Danh sách không đủ điều kiện sát hạch"
                                    options={options}
                                    localization={localizationStyle}
                                />
                            </div>
                        </Grid>
                        <Grid sm={12} style={{
                            textAlign: 'center', flexDirection: 'column', display: 'flex',
                            justifyContent: 'center', height: 60, width: '100%'
                        }}>
                            <Typography align='center'>
                                <Button variant='contained' color="secondary" size='large' disabled={listOk.length === 0 ? true : false} onClick={send}>
                                    Đồng ý
                            </Button>
                                {' '}
                                <Button variant='contained' color='primary' size='large' onClick={onClose}>
                                    Hủy
                            </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </List>
            </Dialog>
        </div>
    );
}
const options = {
    actionsColumnIndex: -1,
    actionsCellStyle: {
        minWidth: 150,
        maxWidth: 150,
        whiteSpace: 'nowrap',
    },
    detailPanelColumnStyle: false,
    sorting: false,
    selection: false,
    showTextRowsSelected: false,
    headerStyle: {
        whiteSpace: 'nowrap',
        margin: 0,
        backgroundColor: '#01579b',
        color: '#FFF',
        fontSize: 16,
    },
    rowStyle: {
        backgroundColor: '#EEE',
        fontSize: 16,
    }
}

const localizationStyle = {
    header: {
        actions: 'Thao tác  ',
    },
    pagination: {
        labelDisplayedRows: '{from}-{to} Tổng {count}',
        firstTooltip: 'Trang đầu',
        previousTooltip: 'Trang trước',
        nextTooltip: 'Trang sau',
        lastTooltip: 'Trang cuối',
        labelRowsSelect: 'Dòng'
    },
    toolbar: {
        nRowsSelected: '{0} hàng đã được chọn'
    },
    body: {
        emptyDataSourceMessage: 'Không có dữ liệu',
        editRow: {
            deleteText: 'Xác nhận thu!!!',
            cancelTooltip: 'Hủy',
            saveTooltip: 'Đồng ý',
        },
        deleteTooltip: 'Xác nhận',
        editTooltip: 'Chỉnh sửa',
    }
};
