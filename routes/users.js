var express = require('express');
var router = express.Router();
const jwt = require( 'jsonwebtoken' );

// const accessKey = 'oYUl8smR11bVXnBaTg8hCfzC88KLGTKr4ZvcNFh18gfKMmd9chArUFt6d4Uq';
const accessKey = process.env.ACCESS_KEY;
// const environmentId = '3NHowvUdbaSeq13VwzMY';
const environmentId = process.env.ENVIRONMENT_ID;

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('accessKey ', accessKey);
  console.log('environmentId ', environmentId)
  // res.send('respond with a resource');
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
});

module.exports = router;
