import { Center, Box, SlideFade } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
export const EmbedSocial = () => {
  const GetSocialKey = async () => {
    try {
      const { data, status } = await axios.get('/api/socialembed/get');
      if (status === 200) {
        console.log(data[0].keyValue);
        return data[0].keyValue;
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const embedSocialKey = GetSocialKey();

  (function (d, s, id) {
    var js;
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://embedsocial.com/cdn/ht.js';
    d.getElementsByTagName('head')[0].appendChild(js);
  })(document, 'script', 'EmbedSocialHashtagScript');

  return (
    <>
      <Box py="20px">
        <div class="embedsocial-hashtag" data-ref={embedSocialKey}></div>
      </Box>
    </>
  );
};
