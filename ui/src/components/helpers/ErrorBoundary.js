import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

// React error boundaries must be class components. Contains render crashes
// (e.g. malformed records from the database) to the routed page instead of
// white-screening the whole app. Remounted per-route via key in MainContainer.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.log(err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box py={20} px={4} textAlign="center">
          <VStack spacing={4}>
            <Heading size="lg">Something went wrong</Heading>
            <Text>
              This page ran into an unexpected error. You can try reloading, or
              use the menu to go somewhere else.
            </Text>
            <Button colorScheme="blue" onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </VStack>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
