const express = require( 'express' );
const jwt = require( 'jsonwebtoken' );

const accessKey = 'oYUl8smR11bVXnBaTg8hCfzC88KLGTKr4ZvcNFh18gfKMmd9chArUFt6d4Uq';
const environmentId = '3NHowvUdbaSeq13VwzMY';
// const accessKey = 'Mns7KQ08d9jjUZtlfEb8FE3ilvh2cNfXhEeeUMs6ZuPi1PQjkbeOoPDiixLu';

const app = express();

app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET' );

    next();
} );

app.get( '/', ( req, res ) => {
    const payload = {
        aud: environmentId,
        sub: 'user-123',
        user: {
            email: 'joe.doe@example.com',
            name: 'Joe Doe'
        },
        auth: {
            'collaboration': {
                '*': {
                    'role': 'writer'
                }
            }
        }
    };

    const result = jwt.sign( payload, accessKey, { algorithm: 'HS256', expiresIn: '24h' } );

    res.send( result );
} );

app.listen( 8080, () => console.log( 'Listening on port 8080' ) );