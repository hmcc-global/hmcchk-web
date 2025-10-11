import BaseCard from './BaseCard';

/**
     * @typedef {object} Event
     * @property {string} title
     * @property {string} date
     * @property {number} link
     *

     * Renders a card with a customizable card header and card body. The header can be any valid React node.
     * The body can be stack of products 
     * @param {Event} eventData - An array of product objects.
     * @returns {React.ReactNode} The total price.
*/
const ImageCard = ({ eventData }) => {
  return <BaseCard title="Event" />;
};

export default ImageCard;
