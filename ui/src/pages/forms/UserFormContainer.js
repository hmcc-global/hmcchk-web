import React, { useState, useEffect } from 'react';
import Form from './Form';
import { Container } from '@chakra-ui/react';
import { validateForm } from '../helpers/formsHelpers';

const UserFormContainer = (props) => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, history } = props;

  useEffect(() => {
    setIsLoading(true);
    const populateData = async () => {
      const { id } = props.match.params;

      try {
        const result = await validateForm(id, user);

        if (result && result.pathname && result.pathname !== '') {
          history.push({
            pathname: result.pathname,
            state: result.state
          });
        } else if (!result?.data[0]) {
          history.push({
            pathname: '/form-unavailable',
            state: {
              id
            }
          });
        } else {
          setIsLoading(false);
          setFormData(result.data[0]);
        }
      } catch (err) {
        console.log('Error retrieving form data');
      }
    };

    populateData();
  }, [history, props, user]);

  return (
    <Container maxW="container.md">
      {!isLoading && formData && (
        <Form
          formId={formData.id}
          formName={formData.formName}
          formDescription={formData.formDescription}
          formImage={formData.formImage}
          formFields={formData.formFields}
          user={user}
          history={history}
          staticData={props.staticData}
        />
      )}
    </Container>
  );
};

export default UserFormContainer;
