import { Center, Icon, Text, VStack, Box, Button } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { validateForm } from '../helpers/formsHelpers';

const ErrorPage = (props) => {
  // Add new cases corresponding to the errorPages definition
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [formOpenTime, setFormOpenTime] = useState(
    history.location?.state?.availableAfter
  );

  useEffect(() => {
    const validate = async () => {
      const {
        location: { state },
      } = history;
      const { user } = props;
      if (state && state.id) {
        const result = await validateForm(state.id, user);

        if (result.data) {
          history.push(`/forms/${state.id}`);
          return;
        } else if (
          result.pathname &&
          result.pathname !== history.location.pathname
        ) {
          history.push({
            pathname: result.pathname,
            state: result.state,
          });
          return;
        } else if (result.pathname && result.pathname === '/form-will-open') {
          setFormOpenTime(result.state.availableAfter);
        }
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    validate();
  }, [history, props]);

  // Define new pages here
  const errorPages = {
    'not-found': {
      type: 'error',
      primaryText:
        "Uh oh!\n We can't seem to find the page you are looking for.",
      boldedText: null,
      buttonLink: '/',
      buttonText: 'Back to Homepage',
    },
    'need-login': {
      type: 'error',
      primaryText: 'You are unable to access this form right now.',
      boldedText: 'Please login to your HMCC account to access the form.',
      buttonLink: '/login',
      buttonText: 'LOGIN',
    },
    'need-fill-profile': {
      type: 'error',
      primaryText: "You haven't filled in your user profile",
      boldedText: 'Please complete your user profile to access the form.',
      buttonLink: '/profile',
      buttonText: 'Back to Profile',
    },
    'form-unavailable': {
      type: 'error',
      primaryText:
        'Oops, something went wrong!\nYou are unable to access this form right now.',
      boldedText: 'This form is currently unavailable.',
      buttonLink: '/',
      buttonText: 'Back to Homepage',
    },
    'form-is-closed': {
      type: 'error',
      primaryText:
        history.location && history.location.state
          ? `${history.location.state?.formName} Form unavailable`
          : null,
      boldedText:
        'This form is closed' +
        (history.location?.state?.availableUntil !== ''
          ? ` at ${history.location?.state?.availableUntil}`
          : ''),
      buttonLink: '/',
      buttonText: 'Back to Homepage',
    },
    'form-will-open': {
      type: 'error',
      primaryText: 'Please come back later!',
      boldedText:
        'This form will open soon.' +
        (formOpenTime && formOpenTime !== ''
          ? ' Check back after ' + formOpenTime
          : ''),
      buttonLink: '/',
      buttonText: 'Back to Homepage',
    },
    'form-success': {
      type: 'success',
      primaryText:
        history.location && history.location.state
          ? `${history.location.state?.formName}`
          : null,
      boldedText: 'Submitted successfully',
      buttonLink: '/',
      buttonText: 'Back to Homepage',
    },
    'form-success-logged-in': {
      type: 'success',
      primaryText:
        history.location && history.location.state
          ? `${history.location.state?.formName}`
          : null,
      boldedText: 'Submitted successfully',
      buttonLink: '/profile',
      buttonText: 'Back to Profile',
    },
    'user-has-signedup': {
      type: 'success',
      primaryText:
        'Your signup for ' +
        `"${history.location.state?.formName}"` +
        ' has been recorded',
      boldedText: 'Please check your email to verify your sign-up details',
      buttonLink: '/',
      buttonText: 'Back to Homepage',
    },
  };

  const key = (() => {
    try {
      switch (props.location.pathname) {
        case '/need-login':
          return 'need-login';
        case '/need-fill-profile':
          return 'need-fill-profile';
        case '/form-unavailable':
          return 'form-unavailable';
        case '/form-is-closed':
          return 'form-is-closed';
        case '/form-will-open':
          return 'form-will-open';
        case '/form-success':
          return props.user.id ? 'form-success-logged-in' : 'form-success';
        case '/user-has-signedup':
          return 'user-has-signedup';
        default:
          return 'not-found';
      }
    } catch (err) {
      console.error('Error detected in error page paths');
      return 'not-found';
    }
  })();

  return (
    <>
      {!isLoading && (
        <Box
          minH="100vh"
          bgImage={`url(${
            process.env.PUBLIC_URL + 'images/default-hk-background.jpeg'
          })`}
          w="full"
          bgRepeat="no-repeat"
          bgAttachment="fixed"
          bgSize="cover"
        >
          <Center pt={['50%', '17%']}>
            <VStack
              bgColor="#f7fafc"
              borderRadius="xl"
              px={['6', '9']}
              py={['7']}
              minW={['95%', '30%']}
              maxW={['95%', '100%']}
              spacing="3"
              textAlign="center"
            >
              <Icon
                as={
                  errorPages[key].type === 'success'
                    ? AiFillCheckCircle
                    : MdErrorOutline
                }
                color={
                  errorPages[key].type === 'success' ? '#4CAF50' : '#F89A9A'
                }
                w="8"
                h="8"
              />
              {errorPages[key].primaryText && (
                <Box color="#656565" fontSize={['sm', 'md']}>
                  {errorPages[key].primaryText.split('\n').map((str, i) => (
                    <Text key={i}>{str}</Text>
                  ))}
                </Box>
              )}
              {errorPages[key].boldedText && (
                <Text color="#656565" fontWeight="700" fontSize={['sm', 'md']}>
                  {errorPages[key].boldedText}
                </Text>
              )}
              {errorPages[key].buttonLink && (
                <Button
                  as={Link}
                  to={errorPages[key].buttonLink}
                  borderRadius="lg"
                  bgColor="#0058D2"
                  color="#ffffff"
                  w="100%"
                  fontWeight="700"
                  size="md"
                  fontSize={['sm', 'md']}
                  _hover={{ bgColor: '#0058d2d9' }}
                >
                  {errorPages[key].buttonText}
                </Button>
              )}
            </VStack>
          </Center>
        </Box>
      )}
    </>
  );
};

export default ErrorPage;
