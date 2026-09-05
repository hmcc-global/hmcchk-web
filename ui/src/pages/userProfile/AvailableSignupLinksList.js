import { Fragment } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  Spacer,
  Grid,
  GridItem,
  Text,
} from 'components';

export const signUpButton = {
  backgroundColor: '#ADCFFF',
  color: '#00377C',
  fontSize: 'inherit',
  borderRadius: '3px',
  padding: '20px 10px',
  textAlign: 'center',
  minWidth: '100%',
};

const isPaymentRequired = (form) =>
  form.isPaymentRequired ? '- [Payment Required]' : '';

const isExternal = (item) =>
  item.formType === 'external' ? '[External Form]' : '';

const AvailableSignupLinksList = ({ forms }) => {
  if (!forms) return null;

  return (
    <Box>
      {forms.map((item, index) => {
        return (
          <Fragment key={'fl' + item['formName']}>
            <Flex
              direction="row"
              align="center"
              w={['100%', '90%', '90%', '80%', '80%']}
              fontSize={['0.6rem', '0.8rem']}
              fontWeight="700"
              textAlign="left"
            >
              <Grid h="inherit" w="100%" templateColumns="repeat(24, 1fr)">
                <GridItem colSpan={8} display="flex">
                  <Image src={item['formImage']} fit="contain" w="100%" />
                </GridItem>
                <GridItem colSpan={12} display="flex" alignItems="center">
                  <Text margin="0px 15px">
                    {`${isExternal(item)} ${
                      item['formName']
                    } ${isPaymentRequired(item)}`}
                  </Text>
                  <Spacer />
                </GridItem>
                <GridItem colSpan={4} display="flex" alignItems="center">
                  <Link
                    href={
                      item.formType === 'external'
                        ? item.externalFormLink
                        : `/forms/${item['id']}`
                    }
                    target="_blank"
                    _hover={{ textDecoration: 'none', opacity: '75%' }}
                    width="100%"
                  >
                    <Button
                      style={signUpButton}
                      _hover={{
                        color: '#00377C',
                        textDecoration: 'underline',
                        bg: '#CCE1FF',
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </GridItem>
              </Grid>
            </Flex>
            {index !== forms.length - 1 && (
              <Divider margin="15px 0px" backgroundColor="black" />
            )}
          </Fragment>
        );
      })}
    </Box>
  );
};

export default AvailableSignupLinksList;
