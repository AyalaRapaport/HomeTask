import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCovidD } from '../Redux/covidSlice';
import { LineChart, axisClasses } from '@mui/x-charts';
import { useTheme } from '@emotion/react';
import { formatDate } from 'date-fns';
import { makeStyles } from '@material-ui/core';
import { PieChart, Pie, Cell } from 'recharts';
import Logo from './Logo'

const CovidChart = () => {
    const dispatch = useDispatch();
    const members = useSelector(state => state.covid.covidDetails);
    const [notVaccinated, setNotVaccinated] = useState(0);
    const [totalMembers, setTotalMembers] = useState(0);
    const [activeCasesByDay, setActiveCasesByDay] = useState({});
    // const day = new Date('2021-03-01');
    const today = new Date();
    const day = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const month = day.getMonth();
    const monthName = day.toLocaleString('default', { month: 'long' });
    const year = day.getFullYear();

    const notVaccinatedData = [
        { name: 'Vaccinated', value: totalMembers - notVaccinated },
        { name: 'Not Vaccinated', value: notVaccinated },
    ];
    const COLORS = ['#00b0ff', '#ff4d4f'];

    useEffect(() => {
        dispatch(getCovidD());
    }, []);

    useEffect(() => {
        if (members?.length > 0) {
            setTotalMembers(members.length);
            const activeCasesByDay = {};
            const daysInMonth = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate();
            console.log(daysInMonth);
            for (let i = 1; i <= daysInMonth; i++) {
                const currentDate = new Date(day.getFullYear(), month, i + 1).toISOString().split('T')[0];
                activeCasesByDay[currentDate] = activeCasesByDay[currentDate] || 0;
            }
            console.log(activeCasesByDay);
            const first = members[0];
            let isContinue = true;
            members.forEach(member => {
                console.log(member == first);
                if (member == first && notVaccinated > 0) {
                    isContinue = false;
                }

                if (isContinue && member.vaccinations.length === 0) {
                    setNotVaccinated(prevNotVaccinated => prevNotVaccinated + 1);
                }

                const positiveResultDate = new Date(member.positiveResultDate);
                const recoveryDate = new Date(member.recoveryDate || day);

                // let date = new Date(positiveResultDate);
                // date.setDate(date.getDate() + 1);
                if (recoveryDate >= day) {
                    const start = new Date(Math.max(day.getTime(), positiveResultDate.getTime()));
                    const endOfMonth = new Date(day.getFullYear(), day.getMonth() + 1, 0);
                    let end = new Date(Math.min(endOfMonth.getTime(), recoveryDate.getTime()));
                    // let currentDate = day.toISOString().split('T')[0];
                    // activeCasesByDay[currentDate] = (activeCasesByDay[currentDate] || 0) + 1;

                    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
                        debugger
                        if (date.getMonth() === month) {
                            let currentDate;
                            currentDate = new Date(date.getTime()).toISOString().split('T')[0];
                            activeCasesByDay[currentDate] = (activeCasesByDay[currentDate] || 0) + 1;
                        }
                        if (date.getTime() >= end.getTime()) {
                            debugger;
                        }
                    }
                }
            });
            setActiveCasesByDay(activeCasesByDay);
            console.log(activeCasesByDay);
        }
    }, [members]);

    const theme = useTheme();

    const data = Object.keys(activeCasesByDay).map(date => {
        return {
            time: formatDate(new Date(date), 'yyyy-MM-dd'),
            amount: activeCasesByDay[date]
        };
    });

    return (
        <>
            <div style={{ position: 'fixed', top: 0, right: 0 }}>
                <Logo />
            </div>
            <div style={{ direction: 'rtl', float: 'left', marginLeft: '10vb' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ backgroundColor: '#00b0ff', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px', borderRadius: '50%' }}></span>
                    <span>  מחוסנים</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ backgroundColor: '#ff4d4f', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px', borderRadius: '50%' }}></span>
                    <span>  לא מחוסנים </span>
                </div>
            </div>
            <div style={{ marginLeft: '0vb', marginTop: '12vb', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>

                    <PieChart width={400} height={400}>
                        <Pie data={notVaccinatedData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                            {notVaccinatedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>

                <React.Fragment>
                    <title>day</title>
                    <div style={{ flex: 1 }}>
                        <LineChart width={800} height={400} dataset={data} margin={{ top: 16, right: 20, left: 70, bottom: 30, }}
                            xAxis={[
                                { scaleType: 'point', dataKey: 'time', tickNumber: 2, tickLabelStyle: theme.typography.body2, },
                            ]}
                            yAxis={[
                                {
                                    label: ` מספר חולים ביום בחודש ${monthName} בשנת ${year}`,
                                    labelStyle: {
                                        ...theme.typography.body1,
                                        fill: theme.palette.text.primary,
                                        fontWeight: 'bold',
                                        fontSize: '1.2em',
                                    },
                                    tickLabelStyle: theme.typography.body2,
                                    max: 25,
                                    tickNumber: 3,
                                },
                            ]}
                            series={[
                                {
                                    dataKey: 'amount',
                                    showMark: false,
                                    color: theme.palette.primary.light,
                                },
                            ]}
                            sx={{
                                [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
                                [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
                                [`& .${axisClasses.left} .${axisClasses.label}`]: {
                                    transform: 'translateX(-25px)',
                                },
                            }}
                        />
                    </div>
                </React.Fragment>
            </div>
        </>
    );
}
export default CovidChart;

