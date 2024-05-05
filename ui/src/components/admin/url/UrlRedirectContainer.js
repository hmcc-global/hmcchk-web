import { useParams, useHistory } from 'react-router-dom';
import { customAxios as axios } from '../../helpers/customAxios';

export default function UrlRedirectContainer(props) {
  const { urlCode } = useParams();
  const history = useHistory();

  const getRedirectLink = async () => {
    try {
      const { data, status } = await axios.get(`/api/url/redirect/${urlCode}`);

      if (status === 200) {
        // if original url exists, redirect to the right page
        window.location.href = data;
      } else {
        // if not, redirect to error page not found
        history.push({ pathname: '/not-found' });
      }
    } catch (err) {
      console.log(err);
      history.push({ pathname: '/not-found' });
    }
  };

  getRedirectLink();
}
