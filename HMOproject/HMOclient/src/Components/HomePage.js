import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './homePage.css'
const HomePage = () => {
    const nav = useNavigate();
    return (<>
        <div style={{ textAlign: 'center',direction:'rtl'}}>
            <h1>אתר קופת חולים עם מידע בנושא הקורונה</h1>
            <div>
                <Button className="button" onClick={() => nav('/memberlist')}>רשימת חברי הקופה</Button>
                <Button className="button" onClick={() => nav('/member/add')}>הוספת חבר לקופה </Button>
                <Button className="button" onClick={() => nav('/covidchart')}> תצוגה סיכומית בנושא הקורונה</Button>
            </div>
            <img alt='background' id='background' src={process.env.PUBLIC_URL + 'logo.png'} style={{ width: '20vw', height: '45vh' }} />

            <p>לצפייה בפרטי קורונה של חבר מסוים הכנס לרשימת החברים ובחר את החבר הספציפי*  </p>
        </div>
    </>);
}

export default HomePage;