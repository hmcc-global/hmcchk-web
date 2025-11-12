import { useState } from 'react';
import { Box, Select, Heading } from '@chakra-ui/react';

const SelectorBox = ({ options, defaultSelected = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);

  const selected = options?.[selectedIndex] || options?.[0];

  return (
    <Box width="100%" maxW="1000px" mx="auto" mt={6}>
      <Select
        bg="white"
        color="black"
        value={selectedIndex}
        onChange={(e) => setSelectedIndex(Number(e.target.value))}
        mb={4}
      >
        {options.map((opt, idx) => (
          <option key={opt.title} value={idx}>
            {opt.title}
          </option>
        ))}
      </Select>

      <Box bg="#0B1635" borderRadius="md" p={6} border="1px solid #2C3B7A">
        {selected?.title && (
          <Heading size="md" color="white" mb={4}>
            {selected.title}
          </Heading>
        )}
        <Box color="white">{selected?.content}</Box>
      </Box>
    </Box>
  );
};

export default SelectorBox;


