import React from 'react'

const NavBar = (props) => {
    const courseURL = `/course?email=${encodeURIComponent(props.email)}`;
    const homeURL = `/?email=${encodeURIComponent(props.email)}`;
    const dashURL = `/dashboard?email=${encodeURIComponent(props.email)}`;

    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarCenteredExample"
                        aria-controls="navbarCenteredExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div
                        className="collapse navbar-collapse justify-content-center"
                        id="navbarCenteredExample"
                    >
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                {props.active === "home" ?
                                    <a className="nav-link active" aria-current="page" href={homeURL}>Home</a>
                                    :
                                    <a className="nav-link" aria-current="page" href={homeURL}>Home</a>
                                }

                            </li>
                            <li className="nav-item">
                                {props.active === "course" ?
                                    <a className="nav-link active" href={courseURL}>Course Page</a>
                                    :
                                    <a className="nav-link" href={courseURL}>Course Page</a>
                                }

                            </li>
                            <li className="nav-item">
                                {props.active === "dashboard" ?
                                    <a className="nav-link active" href={dashURL}>Dashboard</a>
                                    :
                                    <a className="nav-link" href={dashURL}>Dashboard</a>
                                }
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
