import React, { useState, useEffect } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import Form from './Form';
import { Container } from '@chakra-ui/react';
import { DateTime } from 'luxon';

const UserFormContainer = (props) => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, history } = props;

  useEffect(() => {
    setIsLoading(true);
    const populateData = async () => {
      const { id } = props.match.params;

      const { data } = await axios.get('/api/forms/get-form', {
        params: { id: id },
      });

      try {
        if (!data[0]) {
          history.push('/form-unavailable');
        } else {
          const formAvailableFrom = data[0].formAvailableFrom && DateTime.fromISO(data[0].formAvailableFrom).setZone('Asia/Hong_Kong');
          const formAvailableUntil = data[0].formAvailableUntil && DateTime.fromISO(data[0].formAvailableUntil).setZone('Asia/Hong_Kong');

          // One of these values are set
          if (formAvailableFrom.isValid || formAvailableUntil.isValid) {
            // If form available from is set & valid, check if current time is
            // after formAvailableFrom
            let afterStartTime = formAvailableFrom.isValid
              ? DateTime.now().setZone('Asia/Hong_Kong') >= formAvailableFrom
              : true;

            // Compound checking: if form available until:
            // is valid: check if it's within the time of form availability
            // is not valid: default to whatever value was already there
            let beforeEndTime = formAvailableUntil.isValid
              ? DateTime.now().setZone('Asia/Hong_Kong') < formAvailableUntil
              : true;
            let isInRange = afterStartTime && beforeEndTime;

            if (!isInRange) {
              if (!beforeEndTime) {
                setIsLoading(false);
                history.push('/form-unavailable');
              } else {
                setIsLoading(false);
                history.push({
                  pathname: '/form-will-open',
                  state: { availableAfter: formAvailableFrom },
                });
              }
            }
          }
          // end form open check

          // If there is a logged in user, check whether they filled or not
          // Else default to true to allow public to access
          let filledInProfileCheck = user.id ? user.hasFilledProfileForm : true;

          if (!filledInProfileCheck) {
            setIsLoading(false);
            history.push('/need-fill-profile');
          }

          // Check if form requires login
          else if (data[0].requireLogin && !user.id) {
            setIsLoading(false);
            history.push('/need-login');
          }

          setFormData(data[0]);
          setIsLoading(false);
        }

      } catch (err) {
        console.log('Error retrieving form data');
      }
    };

    populateData();
  }, [history, props, user.hasFilledProfileForm, user.id]);

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
        />
      )}
    </Container>
  );
};

export default UserFormContainer;
