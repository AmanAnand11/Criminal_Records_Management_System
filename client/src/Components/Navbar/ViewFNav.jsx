import { Link } from 'react-router-dom';
import CrimeScenePhotographs from '../CrimeScenePhotographs';

function ViewCaseNav(props) {
    const { crimeId } = props;
    const url = `/crimedata/forensics/${crimeId}`;

    return (
        <nav className="nav-wrapper grey darken-4 navbar">
            <div className="container">
                <b>
                    <Link to="/" className="brand-logo">
                        BlockchainJustice
                    </Link>
                </b>
                <ul className="right">
                    <li>
                        <Link to={`/forensichome/viewcase/${crimeId}`}>
                            Forensic Details
                        </Link>
                    </li>
                    <li>
                        <Link to={`/police/viewcase/${crimeId}`}>
                            FIR Details
                        </Link>
                    </li>
                    <li>
                        <a href=""> Other Reports</a>
                    </li>
                    <li>
                        <Link to={`/crimephotos/${crimeId}`}> CrimeScenePhotographs</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default ViewCaseNav; 