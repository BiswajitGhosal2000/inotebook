import React, { useState, useEffect } from 'react';

function Alert(props) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Automatically hide the alert after a given time (e.g., 3000 milliseconds or 3 seconds)
        const timeout = setTimeout(() => {
            setShow(false);
        }, 5000);

        // Clean up the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert" hidden={!show}>
            <strong>{props.type}</strong> {props.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}

export default Alert;