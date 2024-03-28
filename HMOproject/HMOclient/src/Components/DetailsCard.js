import { Avatar, Button, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import { getMembers } from "../Redux/currentMemberSlice";
import { useEffect } from "react";
import { deletePersonalD } from "../Redux/personalDetailsSlice";
import { deleteCovidD } from "../Redux/covidSlice";
import Logo from "./Logo";

const DetailsCard = () => {
    const covidId = useSelector(state => state.currentMember.currentCovidId)
    const memberDetails = useSelector(state => state.currentMember.currentPersonalD);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const useStyles = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
        field: {
            marginBottom: theme.spacing(2),
        },
        centeredAvatar: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: theme.spacing(2),
        },
    }));
    const classes = useStyles();
    
    useEffect(() => {
        if (memberDetails) {
            dispatch(getMembers(memberDetails.id));
        }
    }, [memberDetails])

    const deleteMember = async () => {
        try {
            dispatch(deletePersonalD(memberDetails.id)).then(() => {
                dispatch(deleteCovidD(covidId)).then(() => {
                    nav('/memberlist')
                });
            });
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    }

    
    return (<>
        <Logo />
        {memberDetails && <Paper sx={{ alignItems: 'center', argin: 'auto' }} className={classes.root}>
            <Typography variant="h5" gutterBottom>
                פרטי חבר            </Typography>
            <div className={classes.centeredAvatar}>
                <Avatar sx={{ margin: 'auto' }} alt={memberDetails.firstName} src={memberDetails.urlProfileImg} />
            </div>
            <div className={classes.field}>
                <Typography variant="subtitle1">
                    תעודת זהות: {memberDetails.memberId}
                </Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="subtitle1">
                    שם פרטי: {memberDetails.firstName}
                </Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="subtitle1">
                    שם משפחה :{memberDetails.lastName}
                </Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="h6">
                    כתובת
                </Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="subtitle1">
                    עיר: {memberDetails.city}
                </Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="subtitle1">
                    רחוב: {memberDetails.street}
                </Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="subtitle1">
                    מספר: {memberDetails.number}
                </Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="subtitle1">
                    תאריך לידה :{new Date(memberDetails.dateOfBirth).toLocaleDateString()}
                </Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="subtitle1">
                    מספר טלפון: {memberDetails.phoneNumber}
                </Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="subtitle1">
                    מספר טלפון נייד: {memberDetails.mobileNumber}
                </Typography>
            </div>
            <Button onClick={() => nav('/member/edit')} >עריכה</Button>
            <Button onClick={() => deleteMember()} >מחיקה</Button>
            <Button onClick={() => nav('/covid/' + covidId)} >פרטי קורונה</Button>
        </Paper>}
    </>);
}

export default DetailsCard;