import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getPDetails } from '../Redux/personalDetailsSlice';
import { useNavigate } from 'react-router-dom';
import { addCurrentPD } from '../Redux/currentMemberSlice';
import Logo from './Logo';
import { Input } from '@mui/material';
import { Button } from '@mui/material';

export default function MemberList() {
    const dispatch = useDispatch();
    const personalDetails = useSelector(state => state.personalDetails.personalDetails);
    const nav = useNavigate();
    const [sortedDetails, setSortedDetails] = useState([]);
    const [originalDetails, setOriginalDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        dispatch(getPDetails());
    }, [])

    useEffect(() => {
        if (personalDetails?.length > 0) {
            const sorted = [...personalDetails].sort((a, b) => {
                if (a.lastName < b.lastName) {
                    return -1;
                }
                if (a.lastName > b.lastName) {
                    return 1;
                }
                if (a.lastName === b.lastName) {
                    if (a.firstName < b.firstName) {
                        return -1;
                    }
                    if (a.firstName > b.firstName) {
                        return 1;
                    }
                    return 0;
                }
                return 0;
            });
            setSortedDetails(sorted);
            setOriginalDetails(sorted);
        }
    }, [personalDetails]);

    const handleSearch = () => {
        setIsSearch(true);
        if (searchQuery.trim() === '') {
            setSortedDetails(originalDetails);
        } else {
            const filtered = originalDetails.filter(member =>
                member.lastName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSortedDetails(filtered);
        }
    };

    const handleCancel = () => {
        setIsSearch(false);
        setSearchQuery('');
        setSortedDetails(originalDetails);
    };

    const addCurrent = (id) => {
        nav('/card');
        const memberDetails = originalDetails.find(member => member.memberId === id);
        dispatch(addCurrentPD(memberDetails));
    };

    return (
        <>
            <Logo />
            <div sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input type="text" placeholder="חיפוש לפי שם משפחה" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Button onClick={handleSearch} variant="outlined" sx={{ ml: 1 }}>חיפוש</Button>
                {isSearch && <Button onClick={handleCancel} variant="outlined" sx={{ ml: 1 }}>ביטול</Button>}
            </div>
            {sortedDetails && sortedDetails?.map(member => (
                <List key={member.memberId} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem sx={{ cursor: 'pointer' }} onClick={() => addCurrent(member.memberId)} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={member.firstName} src={member.urlProfileImg} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={member.memberId}
                            secondary={
                                <React.Fragment>
                                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary" >
                                        {member.lastName + " " + member.firstName}
                                    </Typography>

                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
            ))}
        </>
    );
}
