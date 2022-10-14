import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DialogModal({
    open,
    clickClose,
    clickSave,
    title,
    children,
}) {
    return (
        <div>
            <BootstrapDialog
                PaperProps={{
                    sx: {
                        maxWidth: "80vw",
                        width: "80vw",
                    },
                }}
                onClose={clickClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={clickClose}
                >
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{ width: "auto", minWidth: 450 }}>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={clickClose}>
                        취소
                    </Button>
                    <Button variant="contained" autoFocus onClick={clickSave}>
                        저장
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
