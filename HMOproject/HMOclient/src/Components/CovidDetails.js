import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCDetails } from "../Redux/currentMemberSlice";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { format } from "date-fns";
import { VaccineManufacturer } from './enum'
import { setPositiveResultDate, setRecoveryResultDate, setVaccines } from "../Redux/covidSlice";
import Logo from "./Logo";
const CovidDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const covidD = useSelector(state => state.currentMember.currentCovidD);
    const [addVaccine, setAddVaccine] = useState(false)
    const [vaccineDate, setVaccineDate] = useState("");
    const [positiveDate, setPositiveDate] = useState("");
    const [recoveryDate, setRecoveryDate] = useState("");
    const [selectedManufacturer, setSelectedManufacturer] = useState('');
    const today = new Date();

    useEffect(() => {
        dispatch(getCDetails(id))
    }, [])

    const toAddVaccine = () => {
        const today = new Date();
        const selectedDate = new Date(vaccineDate);
        if (vaccineDate == "" || selectedDate > today) {
            alert('בחר תאריך חוקי');
        } else
            if (selectedManufacturer == 'בחר יצרן חיסון' || !selectedManufacturer) {
                alert('לא נבחר יצרן')
            }
            else {
                const details = { ...covidD, date: vaccineDate, manufacturer: selectedManufacturer }
                dispatch(setVaccines(details))
                setAddVaccine(false);
            }
    }

    const addPositiveResultDate = () => {
        if (new Date(positiveDate) > today) {
            alert('בחר תאריך חוקי')
            return
        }
        dispatch(setPositiveResultDate({ ...covidD, newPositiveDate: positiveDate }));
    }
    const addRecoveryResultDate = () => {
        if (new Date(positiveDate) > today || new Date(recoveryDate) < new Date(positiveDate)) {
            alert('בחר תאריך חוקי')
            return
        }

        dispatch(setRecoveryResultDate({ ...covidD, newRecoveryDate: recoveryDate }))
    }
    return (
        <>
            <Logo />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
                <div style={{ marginTop: '2vb' }}>
                    {covidD && covidD.vaccinations && covidD.vaccinations.length > 0 ? (
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    חיסונים
                                </Typography>
                                {covidD.vaccinations.map((vaccine, index) => (
                                    <div key={index}>
                                        <Typography color="textSecondary">
                                            {console.log(vaccine.vaccinationDate, index)}
                                            תאריך חיסון: {format(new Date(vaccine.vaccinationDate), "dd/MM/yyyy")}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            יצרן החיסון: {vaccine.vaccineManufacturer}
                                        </Typography>
                                        <hr style={{ width: '30%' }} />
                                    </div>
                                ))}
                                {!addVaccine && covidD?.vaccinations?.length < 4 && <Button onClick={() => { setAddVaccine(true) }}>הוספת חיסון</Button>}

                                {addVaccine && <>
                                    <div style={{ padding: '2vh', direction: 'rtl' }}>
                                        <TextField value={vaccineDate} onChange={(e) => setVaccineDate(e.target.value)} margin="normal" id="date" label="תאריך חיסון" type='date' name="date" />
                                        <br />
                                        <select value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)}>
                                            <option value="">בחר יצרן חיסון</option>
                                            {Object.values(VaccineManufacturer).map((manufacturer, index) => (
                                                <option key={index} value={manufacturer}>{manufacturer}</option>
                                            ))}
                                        </select>
                                        <br />
                                        <Button onClick={() => toAddVaccine()}>אישור</Button>
                                        <Button onClick={() => setAddVaccine(false)}>ביטול</Button>
                                    </div>
                                </>}
                            </CardContent>
                        </Card>
                    ) : (<>
                        <Typography color="textSecondary">
                            לא נעשו חיסונים
                        </Typography>
                        {!addVaccine && covidD?.vaccinations?.length < 4 && <Button onClick={() => { setAddVaccine(true) }}>הוספת חיסון</Button>}

                        {addVaccine && <>
                            <div style={{ padding: '2vh', direction: 'rtl' }}>
                                <TextField value={vaccineDate} onChange={(e) => setVaccineDate(e.target.value)} margin="normal" id="date" label="תאריך חיסון" type='date' name="date" />
                                <br />
                                <select value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)}>
                                    <option value="">בחר יצרן חיסון</option>
                                    {Object.values(VaccineManufacturer).map((manufacturer, index) => (
                                        <option key={index} value={manufacturer}>{manufacturer}</option>
                                    ))}
                                </select>
                                <br />
                                <Button onClick={() => toAddVaccine()}>אישור</Button>
                                <Button onClick={() => setAddVaccine(false)}>ביטול</Button>
                            </div>
                        </>}
                    </>
                    )
                    }
                    {covidD?.positiveResultDate !== '0001-01-01T00:00:00' ? (<>
                        <Typography>תאריך קבלת תשובה חיובית:{new Date(covidD.positiveResultDate).toLocaleDateString()}</Typography>
                        {covidD?.recoveryDate !== '0001-01-01T00:00:00' ? (
                            <Typography>תאריך החלמה :{new Date(covidD.recoveryDate).toLocaleDateString()}</Typography>
                        ) : (<>
                            <Typography>הוספת תאריך החלמה:</Typography>
                            <TextField value={recoveryDate} onChange={(e) => setRecoveryDate(e.target.value)} margin="normal" id="date" label="תאריך החלמה" type='date' name="date" />
                            <br />
                            <Button onClick={() => { addRecoveryResultDate() }}>אישור</Button>

                        </>)}
                    </>
                    ) : (<>
                        <Typography>הוספת תאריך מחלה:</Typography>
                        <TextField value={positiveDate} onChange={(e) => setPositiveDate(e.target.value)} margin="normal" id="date" label="תאריך קבלת תשובה חיובית " type='date' name="date" />
                        <br />
                        <Button onClick={() => { addPositiveResultDate() }}>אישור</Button>
                    </>)}
                </div>
            </div>
        </>
    );
}

export default CovidDetails;