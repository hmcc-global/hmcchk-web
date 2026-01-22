import React from 'react';
import { Helmet } from 'react-helmet';

const StructuredData = ({ schema }) => {
  if (!schema) return null;
  
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;