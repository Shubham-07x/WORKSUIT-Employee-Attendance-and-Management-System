import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    navigate('/');
                }
            });
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="container-fluid" style={{ overflow: "hidden" }}>
            <div className={`row flex-nowrap ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="col-auto col-md-3 col-xl-2 bg-dark sidebar">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                            to="/dashboard"
                            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                        >
                            <span className="fs-5 fw-bolder d-none d-sm-inline">
                                <img src="/images/Worksuit-logo.png" alt="Logo Image" style={{ maxWidth: "100px", height: "auto" }} />
                            </span>
                        </Link>
                        <ul
                            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
                            id="menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/dashboard"
                                    className={`nav-link text-white px-3 my-1 py-2 align-middle ${location.pathname === '/dashboard' ? 'active' : ''}`}
                                    style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                                >
                                    <i className="fs-4 mx-2 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/employee"
                                    className={`nav-link px-3 py-2 my-1 align-middle text-white ${location.pathname === '/dashboard/employee' ? 'active' : ''}`}
                                    style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                                >
                                    <i className="fs-4 mx-2 bi-people ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        Employees
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/category"
                                    className={`nav-link px-3 py-2 my-1 align-middle text-white ${location.pathname === '/dashboard/category' ? 'active' : ''}`}
                                    style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                                >
                                    <i className="fs-4 mx-2 bi-columns ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Category</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/manageadmin"
                                    className={`nav-link px-3 py-2 my-1 align-middle text-white ${location.pathname === '/dashboard/manageadmin' ? 'active' : ''}`}
                                    style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                                >
                                    <i className="fs-4 mx-2 bi-person ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Admins</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/officeaddress"
                                    className={`nav-link px-3 py-2 my-1 align-middle text-white ${location.pathname === '/dashboard/officeaddress' ? 'active' : ''}`}
                                    style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                                >
                                    <i className="fs-4 mx-2 bi-person ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Office</span>
                                </Link>
                            </li>
                        </ul>
                        <Button variant="outline-danger" onClick={handleLogout} className="mt-auto mb-3 w-100" style={{ paddingLeft: '0.75rem', paddingRight: '0.75rem' }}>
                            <i className="fs-4 mx-1 bi-power ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Logout</span>
                        </Button>
                    </div>
                </div>
                <div className="col p-0 rounded-lg">
                    <div className="p-3 d-flex justify-content-center top--title ">
                        <h4 className="m-0">
                            <span style={{ fontWeight: "bold" }} className="animate-charcter">WORKSUIT</span> -
                            <span style={{ color: "grey", fontSize: "1.2rem" }}> Employee Attendance and Management System</span>
                        </h4>
                    </div>
                    <div className="mt-2" style={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
