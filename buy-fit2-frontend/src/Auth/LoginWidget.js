import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from '../util/SpinnerLoading';
import OktaSignInWidget from './OktaSignInWidget';
import Page from '../user/Page';

const LoginWidget = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();
    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log('Sign in error: ', err);
    }

    // const navigate = useNavigate();

    if (!authState) {
        return (
            <SpinnerLoading/>
        );
    }

    return authState.isAuthenticated ?
    // navigate("/")
    <Page/>
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>
};

export default LoginWidget;