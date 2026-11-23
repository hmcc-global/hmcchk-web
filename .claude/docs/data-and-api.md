# Data and API

```javascript
import { customAxios as axios } from 'utils/customAxios';

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/endpoint');
    setData(data);
  } catch (err) {
    console.log(err);
  }
};
```

- `customAxios` is a singleton (`export let customAxios`) rebuilt by `updateAxiosClient(token)` from `PrivateRoute` whenever the token changes. It sets the **`Authorisation`** header (British spelling, see `auth-flow.md`). Never rename or "fix" it.
- Unauthenticated calls (`verify-token`, `forgot-password`) use bare `axios`, as `PrivateRoute` does.
- `console.log(err)` in catch is the convention. When the user needs feedback (submit, save, email), add a `useToast` with generic text; never render the raw server error.
- Sermons, series, speakers, posts, and pages come from WordPress through `/api/sermons/*` and arrive as WordPress-shaped HTML; render with `html-react-parser`. Only `UserSermonNotes` and `SermonNotesParent` are in Mongo.
- Two announcement APIs exist: `/api/announcements/*` (legacy plural) and `/api/announcement/*` (new singular), a migration in progress. Pick deliberately and say which.
