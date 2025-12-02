import HongKongContent from './HongKongContent';
import InternationalContent from './InternationalContent';
// import HongKongButton from './HongKongButton'; // Create these if needed
// import InternationalButton from './InternationalButton';

export const selectorOptions = [
  {
    title: "Hong Kong",
    content: <HongKongContent />,
    // button: <HongKongButton /> // This should be a JSX element, not component
  },
  {
    title: "International", 
    content: <InternationalContent />,
    // button: <InternationalButton />
  }
];