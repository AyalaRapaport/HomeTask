import { Link } from "react-router-dom";

const Logo = () => {
    return (<>
        <Link to={'/homePage'}>
            <img alt='background' id='background' src={`${process.env.PUBLIC_URL}/logo.png`}
                style={{ marginRight: '12vb', float: 'right', width: '10vw', height: '25vh' }} />
        </Link>

    </>);
}

export default Logo;