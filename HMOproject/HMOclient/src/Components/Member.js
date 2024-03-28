import { Button, Grid, Input, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { EditPDetails, addPDetails } from '../Redux/personalDetailsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { setCurrentP } from '../Redux/currentMemberSlice';
import { addCovidD } from '../Redux/covidSlice';
import { addMember } from '../Redux/memberSlice';
import Logo from './Logo';

const Member = () => {
    const { type } = useParams();
    const memberD = useSelector(state => state.currentMember.currentPersonalD);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const nav = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isOk, setisOk] = useState(false);
    const [member, setMember] = useState({
        id: '',
        firstName: '', lastName: '', memberId: '', city: '',
        street: '', number: 0, phone: '', mobile: '', img: '', birthDate: '',
    })
    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, ' !קצר מידי').max(50, ' !ארוך מדי').required('שדה חובה'),
        lastName: Yup.string()
            .min(2, ' !קצר מידי').max(50, ' !ארוך מדי').required('שדה חובה'),
        city: Yup.string().min(2, ' !קצר מידי').required('שדה חובה'),
        street: Yup.string().required('שדה חובה'),
        number: Yup.number().required('שדה חובה'),
        phone: Yup.string().min(9, 'הקש 9 תווים').max(9, 'הקש 9 תווים').required('שדה חובה'),
        mobile: Yup.string().min(10, 'הקש 10 תווים').max(10, 'הקש 10 תווים').required('שדה חובה'),
        id: Yup.string().min(9, 'הקש 9 תווים').max(9, 'הקש 9 תווים').required('שדה חובה'),
    });

    const handleSubmit = (value) => {
        if (value.city === "") {
            alert('פרטים לא תקינים ')
            return
        }
        if (!file && type === 'add') {
            alert('לא נבחרה תמונת פרופיל')
            return
        }
        const today = new Date();
        const selectedDate = new Date(value.date);
        if (value.date == "" || selectedDate > today) {
            alert('בחר תאריך חוקי');
            return
        }
        console.log(value);
        if (type === 'edit') {
            // const dateParts = value.birthDate.split('/');
            // const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
            // // const isoDateString = formattedDate.toISOString();
            // value.birthDate = formattedDate;
            const parts = value.birthDate.split('/');
            const normalizedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

            setMember({
                id: memberD.id, firstName: value.firstName, lastName: value.lastName,
                memberId: value.id, city: value.city, street: value.street, birthDate: normalizedDate.toISOString(),
                number: value.number, phone: value.phone, mobile: value.mobile, img: file.get('Image')
            })
        }
        else {
            setMember({
                id: memberD.id, firstName: value.firstName, lastName: value.lastName,
                memberId: value.id, city: value.city, street: value.street, birthDate: new Date(value.date).toISOString(),
                number: value.number, phone: value.phone, mobile: value.mobile, img: file.get('Image')
            })
        }

        setisOk(true)
    }
    useEffect(() => {
        if (isOk) {
            if (type === 'add') {               
                dispatch(addPDetails(member)).then((response) => {
                    if (response.payload === true) {
                        alert('תעודת הזהות קיימת כבר במערכת ');
                        setisOk(false);
                    }
                    else {
                        dispatch(addCovidD()).then((res) => {
                            if (res.payload) {
                                const member = {
                                    covidId: res.payload.id,
                                    personalId: response.payload.id
                                };
                                dispatch(addMember(member)).then(() => { nav('/memberlist') })
                            }
                        })
                    }
                });
            }
            else {
                dispatch(EditPDetails(member)).then((response) => {
                    dispatch(setCurrentP(response.payload));
                    nav('/card');
                });
            }
        }
    }, [isOk]);

    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];
        const formData = new FormData();
        formData.append('Image', selectedFile);
        setFile(formData);
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };
    useEffect(() => {
        if (type === 'edit') {
            const formData = new FormData();
            formData.append('Image', memberD.urlProfileImg);
            setFile(formData);
            setSelectedImage(memberD.urlProfileImg);
        }
    }, [type]);

    useEffect(() => {
        console.log(memberD);
    }, [memberD])

    return (
        <>
            <Logo />
            <Formik
                initialValues={type === 'add' ? {
                    firstName: '', lastName: '', id: '', city: '', street: '',
                    number: 0, phone: '', mobile: '', birthDate: '', img: ''
                } : {
                    firstName: memberD.firstName, lastName: memberD.lastName, id: memberD.memberId,
                    city: memberD.city, street: memberD.street, number: memberD.number,
                    phone: memberD.phoneNumber, mobile: memberD.mobileNumber, birthDate: format(new Date(memberD.dateOfBirth), 'dd/MM/yyyy'),
                    img: memberD.urlProfileImg
                }}
                validationSchema={SignupSchema}
                onSubmit={(values,) => {
                    console.log(values);
                    handleSubmit(values);
                }}>
                {formik => (
                    <Form style={{ width: '70%', margin: 'auto', direction: 'rtl' }}>
                        <Grid container spacing={0.5}>
                            <Grid item xs={12} sm={4}>
                                <TextField margin="normal" id="firstName" label="שם פרטי " type="text" name="firstName"
                                    autoComplete="firstName" {...formik.getFieldProps('firstName')} error={formik.touched.firstName && !!formik.errors.firstName} helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField margin="normal" id="lastName" label="שם משפחה " type="text" name="lastName"
                                    autoComplete="lastName" {...formik.getFieldProps('lastName')} error={formik.touched.lastName && !!formik.errors.lastName} helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField margin="normal" name="id" label="תעודת זהות" type="text" id="id"
                                    {...formik.getFieldProps('id')} error={formik.touched.id && !!formik.errors.id} helperText={formik.touched.id && formik.errors.id}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField margin="normal" id="city" label="עיר " type='text' name="city"
                                    autoComplete="city" {...formik.getFieldProps('city')} error={formik.touched.city && !!formik.errors.city} helperText={formik.touched.city && formik.errors.city}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField margin="normal" id="street" label="רחוב " type='text' name="street"
                                    autoComplete="street" {...formik.getFieldProps('street')} error={formik.touched.street && !!formik.errors.street} helperText={formik.touched.street && formik.errors.street}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField margin="normal" id="number" label="מספר " type='number' name="number"
                                    autoComplete="number"  {...formik.getFieldProps('number')} error={formik.touched.number && !!formik.errors.number} helperText={formik.touched.number && formik.errors.number}
                                />
                            </Grid>
                            {type === 'add' ? <Grid item xs={12} sm={4}>
                                <TextField margin="normal" id="date" label="תאריך לידה " type='date' name="date" field='uploadDate'
                                    autoComplete="date" {...formik.getFieldProps('date')} error={formik.touched.date && !!formik.errors.date} helperText={formik.touched.date && formik.errors.date}
                                />
                            </Grid> : <>
                                <Grid item xs={12} sm={4}>
                                    <Typography>תאריך לידה</Typography>
                                    <br />
                                    <Typography name="date">{format(new Date(memberD.dateOfBirth), 'dd/MM/yyyy')}</Typography></Grid>
                            </>}
                            <Grid item xs={12} sm={4}>
                                <TextField margin="normal" id="phone" label="טלפון " type='tel' name="phone"
                                    autoComplete="phone" {...formik.getFieldProps('phone')} error={formik.touched.phone && !!formik.errors.phone} helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField margin="normal" id="mobile" label="טלפון נייד " type='tel' name="mobile"
                                    autoComplete="mobile" {...formik.getFieldProps('mobile')} error={formik.touched.mobile && !!formik.errors.mobile} helperText={formik.touched.mobile && formik.errors.mobile}
                                />
                            </Grid>
                        </Grid>

                        <Input name='img' type="file" style={{ display: "none" }} onChange={handleImageUpload}
                            accept="image/*" sx={{ height: "100px", bgcolor: "transparent", }} id="image-upload"
                        />
                        <Button onClick={() => document.getElementById('image-upload').click()}> תמונת פרופיל </Button>
                        {selectedImage && (
                            <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                        )}
                        <br />
                        <Button disabled={!formik.isValid || formik.isSubmitting} onClick={() => handleSubmit(formik.values)} type="submit" variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#00c4e7' }} >
                            אישור </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Member;