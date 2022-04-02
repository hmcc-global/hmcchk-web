import { Center, Box, SlideFade } from '@chakra-ui/react';
import React, { useEffect } from 'react';
export const EmbedSocial = () => {
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
        <div
          class="embedsocial-hashtag"
          data-ref="f88a3629618d517950b0e599bf2dec4a37d00511"
        ></div>
      </Box>
    </>
  );
};
