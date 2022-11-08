import { DateTime } from 'luxon';
import { customAxios as axios } from './customAxios';

// String conversion tools
const camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

const sentencize = (str) => {
  return str
    .split(/([A-Z]|\d)/)
    .map((v, i, arr) => {
      // If first block then capitalise 1st letter regardless
      if (!i) return v.charAt(0).toUpperCase() + v.slice(1);
      // Skip empty blocks
      if (!v) return v;
      // Underscore substitution
      if (v === '_') return ' ';
      // We have a capital or number
      if (v.length === 1 && v === v.toUpperCase()) {
        const previousCapital = !arr[i - 1] || arr[i - 1] === '_';
        const nextWord = i + 1 < arr.length && arr[i + 1] && arr[i + 1] !== '_';
        const nextTwoCapitalsOrEndOfString =
          i + 3 > arr.length || (!arr[i + 1] && !arr[i + 3]);
        // Insert space
        if (!previousCapital || nextWord) v = ' ' + v;
        // Start of word or single letter word
        if (nextWord || (!previousCapital && !nextTwoCapitalsOrEndOfString))
          v = v.toLowerCase();
      }
      return v;
    })
    .join('');
};

const validateForm = async (id, user) => {
  try {
    const { data } = await axios.get('/api/forms/get-form', {
      params: { id },
    });

    const { data: nowIso } = await axios.get('/api/misc/get-current-time');
    const now = DateTime.fromISO(nowIso);

    console.log(id);
    if (!data[0]) {
      return {
        pathname: '/form-unavailable',
        state: { id },
      };
    }

    const formAvailableFrom =
      data[0].formAvailableFrom &&
      DateTime.fromISO(data[0].formAvailableFrom).setZone('Asia/Hong_Kong');
    const formAvailableUntil =
      data[0].formAvailableUntil &&
      DateTime.fromISO(data[0].formAvailableUntil).setZone('Asia/Hong_Kong');

    // One of these values are set
    if (formAvailableFrom.isValid || formAvailableUntil.isValid) {
      // If form available from is set & valid, check if current time is
      // after formAvailableFrom
      let afterStartTime = formAvailableFrom.isValid
        ? now >= formAvailableFrom
        : true;

      // Compound checking: if form available until:
      // is valid: check if it's within the time of form availability
      // is not valid: default to whatever value was already there
      let beforeEndTime = formAvailableUntil.isValid
        ? now < formAvailableUntil
        : true;
      let isInRange = afterStartTime && beforeEndTime;

      if (!isInRange) {
        if (!beforeEndTime) {
          return {
            pathname: '/form-is-closed',
            state: {
              id: data[0].id,
              formName: data[0].formName,
              availableUntil: formAvailableUntil.toFormat('dd MMM yyyy, HH:mm'),
            },
          };
        } else {
          return {
            pathname: '/form-will-open',
            state: {
              availableAfter: formAvailableFrom.toFormat('dd MMM yyyy, HH:mm'),
              id: data[0].id,
            },
          };
        }
      }
    }
    // end form open check

    // If there is a logged in user, check whether they filled or not
    // Else default to true to allow public to access
    let filledInProfileCheck = user.id ? user.hasFilledProfileForm : true;

    if (!filledInProfileCheck) {
      return {
        pathname: '/need-fill-profile',
        state: { id: data[0].id },
      };
    }

    // Check if form requires login
    else if (data[0].requireLogin && !user.id) {
      return {
        pathname: '/need-login',
        state: { id: data[0].id },
      };
    }

    //Check if user already signed-up for the PAID form

    //Get email subsmissions from form
    let emailTemp = [];
    const { data: submissionData } = await axios.get(
      '/api/forms/get-submission',
      {
        params: {
          formId: id,
        },
      }
    );

    //Extract the email addresses
    submissionData.forEach(function (item) {
      let temp = {};
      temp = item.submissionData;
      emailTemp.push(temp['email']);
    });

    //If user emaill already exist redirect user to a response page
    if (emailTemp.includes(user['email'])) {
      console.log('user already signedup');
      return {
        pathname: '/user-has-signedup',
      };
    }

    return {
      data,
    };
  } catch (err) {
    console.log(err);
    return {
      pathname: '/form-unavailable',
      state: { id: id },
    };
  }
};

export { camelize, sentencize, validateForm };
