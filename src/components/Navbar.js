import { GoogleLogin } from '@react-oauth/google';
import NavbarElement from '../atoms/NavbarElement';
import logo from './../assets/logo-removebg-preview.png';

const Navbar = () => {

    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-body-secondary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" height="50" />
                    ISEF01 QUIZ
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item me-3">
                            <NavbarElement
                                label={<span className="material-icons fs-2">
                                    account_circle
                                </span>
                                }
                                notificationCount={1}
                            />
                        </li>
                        <li className="nav-item me-3">
                            <NavbarElement
                                label={<span className="material-icons fs-2">
                                    help
                                </span>
                                }
                            />
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item me-3 mb-3">
                            <NavbarElement
                                label="Login"
                                addClass={"btn-secondary"}
                            //onClick={handleTestLogin}
                            />
                        </li>
                        <li className="nav-item me-3">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                type="icon"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
