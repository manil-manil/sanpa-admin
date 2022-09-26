import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import useWindowSize from "components/Hooks/useWindowSize.js";
import { useUserActions } from '../../actions';

import styles from "assets/jss/nextjs-material-dashboard/components/headerLinksStyle.js";

export default function AdminNavbarLinks() {
    const size = useWindowSize();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [openNotification, setOpenNotification] = React.useState(null);
    const [openProfile, setOpenProfile] = React.useState(null);
    const userActions = useUserActions();
    
    const handleClickNotification = (event) => {
        if (openNotification && openNotification.contains(event.target)) {
            setOpenNotification(null);
        } else {
            setOpenNotification(event.currentTarget);
        }
    };
    const handleCloseNotification = () => {
        setOpenNotification(null);
    };
    const handleClickProfile = (event) => {
        if (openProfile && openProfile.contains(event.target)) {
            setOpenProfile(null);
        } else {
            setOpenProfile(event.currentTarget);
        }
    };
    const handleCloseProfile = () => {
        setOpenProfile(null);
    };
    const clickLogout = (e) => {
        handleClickProfile(e);
        userActions.logout();

    }
    return (
        <div>
            <div className={classes.manager}>
                <Poppers
                    open={Boolean(openNotification)}
                    anchorEl={openNotification}
                    transition
                    disablePortal
                    className={
                        classNames({
                            [classes.popperClose]: !openNotification,
                        }) +
                        " " +
                        classes.popperNav
                    }
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="notification-menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === "bottom"
                                        ? "center top"
                                        : "center bottom",
                            }}
                        >
                            <Paper>
                                <ClickAwayListener
                                    onClickAway={handleCloseNotification}
                                >
                                    <MenuList role="menu">
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={classes.dropdownItem}
                                        >
                                            Mike John responded to your email
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={classes.dropdownItem}
                                        >
                                            You have 5 new tasks
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={classes.dropdownItem}
                                        >
                                            You{"'"}re now friend with Andrew
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={classes.dropdownItem}
                                        >
                                            Another Notification
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={classes.dropdownItem}
                                        >
                                            Another One
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Poppers>
            </div>
            <div className={classes.manager}>
                <Button
                    color={size.width > 959 ? "transparent" : "white"}
                    justIcon={size.width > 959}
                    simple={!(size.width > 959)}
                    aria-owns={openProfile ? "profile-menu-list-grow" : null}
                    aria-haspopup="true"
                    onClick={handleClickProfile}
                    className={classes.buttonLink}
                >
                    <Person className={classes.icons} />
                    <Hidden mdUp implementation="css">
                        <p className={classes.linkText}>Profile</p>
                    </Hidden>
                </Button>
                <Poppers
                    open={Boolean(openProfile)}
                    anchorEl={openProfile}
                    transition
                    disablePortal
                    className={
                        classNames({ [classes.popperClose]: !openProfile }) +
                        " " +
                        classes.popperNav
                    }
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="profile-menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === "bottom"
                                        ? "center top"
                                        : "center bottom",
                            }}
                        >
                            <Paper>
                                <ClickAwayListener
                                    onClickAway={handleCloseProfile}
                                >
                                    <MenuList role="menu">
                                        <Divider light />
                                        <MenuItem
                                            onClick={clickLogout}
                                            className={classes.dropdownItem}
                                        >
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Poppers>
            </div>
        </div>
    );
}
