import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClockIn = () => {
    const { id } = useParams(); 
    const [location, setLocation] = useState('');
    const [workFromType, setWorkFromType] = useState('office');
    const [otherLocation, setOtherLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [clockedIn, setClockedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Check if employee is currently clocked in
        const checkClockInStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/employee/employee_is_clocked_in/${id}`);
                setClockedIn(response.data.clockedIn);
            } catch (error) {
                console.error('Error while checking clock-in status:', error);
            }
        };

        checkClockInStatus();
    }, [id]);

    const handleClockIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:3000/employee/employee_clockin/${id}`, {
                location: location === 'other' ? otherLocation : location,
                work_from_type: workFromType
            });
            if (response.data.status === 'success') {
                console.log('Clock-in successful');
                setClockedIn(true);
                setShowModal(false);
                toast.success('Clock-in successful');
            }
        } catch (error) {
            console.error('Error while clocking in:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClockOut = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:3000/employee/employee_clockout/${id}`);
            if (response.data.success) {
                console.log('Clock-out successful');
                setClockedIn(false);
                toast.success('Clock-out successful'); 
            }
        } catch (error) {
            console.error('Error while clocking out:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {!clockedIn && (
                <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Clock In
                </button>
            )}
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Clock In</h5>
                                <span aria-hidden="true" style={{ color: '#999', fontSize: '24px', position: 'absolute', top: '8px', right: '12px', cursor: 'pointer' }} onClick={() => setShowModal(false)}>&times;</span>
                            </div>
                            <form onSubmit={handleClockIn}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="location" style={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: '10px', marginBottom: '10px' }}>Location</label>
                                        <select className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                                            <option value="Jabalpur, Madhya Pradesh">Jabalpur, Madhya Pradesh</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {location === 'other' && (
                                            <input type="text" className="form-control my-2" placeholder="Enter location" value={otherLocation} onChange={(e) => setOtherLocation(e.target.value)} />
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="work_from_type" style={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: '10px', marginBottom: '10px' }}>Working From</label>
                                        <select className="form-control" id="work_from_type" value={workFromType} onChange={(e) => setWorkFromType(e.target.value)}>
                                            <option value="office">Office</option>
                                            <option value="home">Home</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>Clock In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {clockedIn && (
                <div>
                    <button type="button" className="btn btn-danger" onClick={handleClockOut} disabled={loading}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Clock Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ClockIn;
