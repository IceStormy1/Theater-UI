import { createOidcAuth, SignInType, LogLevel } from 'vue-oidc-client/vue3'
import axios from 'axios';

const loco = window.location
const appRootUrl = `${loco.protocol}//${loco.host}${import.meta.env.BASE_URL}`

const idsrvAuth = createOidcAuth(
    'main',
    SignInType.Window,
    appRootUrl,
    {
        authority: 'http://localhost:5090/',
        client_id: 'Theater.client.interactive', // 'implicit.shortlived',
        client_secret:'4844b33f-a869-4cdf-aa0c-ef6703b2136f',
        response_type: 'code',
        scope: 'openid profile',
        // test use
        prompt: 'login',
    },
    console,
    LogLevel.Debug
)

// handle events

idsrvAuth.events.addAccessTokenExpiring(function() {
    // eslint-disable-next-line no-console
    console.log('access token expiring')
})

idsrvAuth.events.addAccessTokenExpired(function() {
    // eslint-disable-next-line no-console
    console.log('access token expired')
})

idsrvAuth.events.addSilentRenewError(function(err) {
    // eslint-disable-next-line no-console
    console.error('silent renew error', err)
})

idsrvAuth.events.addUserLoaded(function(user) {
    axios.post( 'account/login')
        .then(() => {
            console.log('user loaded', user)
        })
        .catch((error)=>{
            console.error('An error occurred while creating/updating the user', error)
        });
})

idsrvAuth.events.addUserUnloaded(function() {
    // eslint-disable-next-line no-console
    console.log('user unloaded')
})

idsrvAuth.events.addUserSignedOut(function() {
    // eslint-disable-next-line no-console
    console.log('user signed out')
})

idsrvAuth.events.addUserSessionChanged(function() {
    // eslint-disable-next-line no-console
    console.log('user session changed')
})

export default idsrvAuth
