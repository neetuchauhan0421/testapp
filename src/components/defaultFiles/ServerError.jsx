import React from 'react';
import {
    // Button,
    Typography
} from '@material-ui/core';

const ServerError = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '75vh',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography>
                Something went wrong. Please contact Schrocken support at &nbsp;
        <a
                    href="mailto:support@schrocken.com"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    support@schrocken.com
        </a>
        . Thank you!
      </Typography>
            {/* <Button
        variant="contained"
        color="primary"
        type="button"
        style={{ marginTop: "1rem" }}
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button> */}
        </div>
    );
};

export default ServerError;
