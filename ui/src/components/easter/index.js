import HeroContainer from "./hero/HeroContainer";
import InvitationContainer from "./invitation/InvitationContainer";
import StoryContainer from "./story/StoryContainer";

const EasterContainer = (props) => {
  console.log(props);
  return (
    <>
      <HeroContainer />
      <StoryContainer />
      <InvitationContainer />
    </>
  )
}

export default EasterContainer;