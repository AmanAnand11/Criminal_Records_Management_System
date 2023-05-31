import { Link } from 'react-router-dom';

function ViewCaseNav(props) {
    const { crimeId } = props;
    const url = `/crimedata/forensics/${crimeId}`;
  
    return (
      <nav className="nav-wrapper grey darken-4 navbar">
        <div className="container">
          <b>
            <Link to=" " className="brand-logo">
              BlockchainJustice
            </Link>
          </b>
          <ul className="right">
          <li>
              <Link to={`/police`}>
              Home
              </Link>
              </li>
            <li>
              <Link to={`/police/viewcase/${crimeId}`}>
                FIR Details
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  
  export default ViewCaseNav;