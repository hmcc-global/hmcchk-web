import React, { useState, useEffect } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import Form from './Form';
import { Container, Center, VStack, Text } from '@chakra-ui/react';

const UserFormContainer = (props) => {
  const [formData, setFormData] = useState(null);
  const { user, history } = props;

  useEffect(() => {
    const populateData = async () => {
      const { id } = props.match.params;

      // Get form, also check whether user is logged in or not
      // to see if user can access this form.
      const { data } = await axios.get('/api/forms/get-form', {
        params: { id: id },
      });

      try {
        setFormData(data[0]);

        // Form is not published, hence it is unavailable
        if (!data[0]) history.push('/form-unavailable');
        else {
          // TODO: Add check for form within available period
          // If form should be open, proceed with checks, else redirect to /form-will-open

          // end form open check

          // If there is a logged in user, check whether they filled or not
          // Else default to true to allow public to access
          let filledInProfileCheck = user.id ? user.hasFilledProfileForm : true;

          if (!filledInProfileCheck) history.push('/need-fill-profile');
          // Check if form requires login
          else if (data[0].requireLogin && !user.id)
            history.push('/need-login');
        }
      } catch (err) {
        console.log('Error retrieving form data');
      }
    };

    populateData();
  }, [props]);

  return (
    <Container maxW="container.md">
      {formData && (
        <Form
          formId={formData.id}
          formName={formData.formName}
          formDescription={formData.formDescription}
          formImage={formData.formImage}
          formFields={formData.formFields}
          user={user}
          history={history}
        />
      )}
    </Container>
  );
};

export default UserFormContainer;
