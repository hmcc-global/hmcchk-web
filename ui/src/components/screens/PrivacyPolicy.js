import React from 'react';
import { Heading, Text } from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <Heading as="h2" fontFamily="DMSerifDisplay_Italic">Privacy Policy</Heading>
      <br/>
      <Heading as="h5" size="sm" fontFamily="DMSerifDisplay_Italic">Personal Data (Privacy) Policy Statement</Heading>
      <Text>
        Harvest Mission Community Church (Hong Kong) Limited (“HMCC HK” or “the Church”) respects the right to personal data privacy and is committed to complying with requirements of the Personal Data (Privacy) Ordinance.
      </Text>
      <Text>
        To safeguard your personal data privacy rights, HMCC HK ensures that our policies and practices in the collection, use, retention, transfer and access of personal data are in line with the Ordinance.
      </Text>
      <Text>
        With the individual’s consent, we may occasionally send emails to update on the church’s relevant initiatives. Otherwise, different types of personal data collected and maintained by HMCC HK are kept and used for organising events and conferences, mission trips, classes and other ministry activities. Use of them should be restricted to the designated purposes only.
      </Text>
      <br/>
      <Heading as="h5" size="sm" fontFamily="DMSerifDisplay_Italic">Access of Personal Data</Heading>
      <Text>
        You may request access to the personal data about you. To do so, please kindly email to 
        <a href="mailto:hongkong@hmcc.net"> hongkong@hmcc.net</a> 
        with the subject “Data Access Request”.
      </Text>
      <Text>
        After obtaining a copy of the personal data, you may request in writing correction of data which is considered as inaccurate.
      </Text>
      <Text>
        You can find out more about the operation of the Personal Data (Privacy) Ordinance at the 
        <a href="https://www.pcpd.org.hk" target="_blank" rel="noopener noreferrer"> Website of the Privacy Commissioner for Personal Data</a>.
      </Text>
      <br/>
      <Heading as="h5" size="sm" fontFamily="DMSerifDisplay_Italic">Security</Heading>
      <Text>
        HMCC HK will take reasonable steps to keep secure any personal information we hold. Personal information is stored in a secure server or secure files.
      </Text>
    </div>
  );
};

export default PrivacyPolicy;