import { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Icon,
  Link,
  Progress,
  Text,
  Grid,
  GridItem,
} from 'components';
import { FiExternalLink } from 'react-icons/fi';
import { signUpButton } from './AvailableSignupLinksList';

const signedUpButton = {
  backgroundColor: '#C4C4C4',
  color: '#4E4F50',
  fontSize: 'inherit',
  borderRadius: '3px',
  padding: '20px 10px',
  textAlign: 'center',
  cursor: 'default',
  minWidth: '100%',
};

const hideProgressButton = {
  ...signUpButton,
  backgroundColor: '#CCE1FF',
};

const cardHeaderFontSize = '0.875rem';
const courseTitleFontSize = '0.8rem';
const statusTagFontSize = '0.65rem';

const statusColors = {
  'Not Started': 'gray',
  'In Progress': 'blue',
  Completed: 'green',
};

const isSafeCourseLink = (courseLink) =>
  typeof courseLink === 'string' && /^https?:\/\//i.test(courseLink);

const getProgressCourses = (form, classProgress) => {
  const templateCourses = form.classTrackingTemplate?.courses ?? [];
  const snapshotCourses = classProgress?.classTrackingData?.courses ?? [];
  const courses = (
    templateCourses.length > 0 ? templateCourses : snapshotCourses
  ).filter((course) => course.isActive !== false);

  return courses.map((course) => {
    const snapshotCourse = snapshotCourses.find(
      (item) => item.courseId === course.courseId
    );

    return {
      ...course,
      ...snapshotCourse,
      courseLink: course.courseLink,
      status: snapshotCourse?.status ?? 'Not Started',
    };
  });
};

const SignedUpFormsList = ({ forms = [], classProgressList = [] }) => {
  const [expandedFormId, setExpandedFormId] = useState(null);

  return (
    <Box>
      {forms.map((form, index) => {
        const classProgress = classProgressList.find(
          (item) => item.formName === form.formName
        );
        const isClass = Boolean(form.isClass);
        const courses = isClass ? getProgressCourses(form, classProgress) : [];
        const completedCourses = courses.filter(
          (course) => course.status === 'Completed'
        ).length;
        const progress = courses.length
          ? Math.round((completedCourses / courses.length) * 100)
          : 0;
        const isExpanded = expandedFormId === form.id;

        return (
          <Box key={form.id || form.formName}>
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
                  <Image src={form.formImage} fit="contain" w="100%" />
                </GridItem>
                <GridItem colSpan={12} display="flex" alignItems="center">
                  <Text margin="0px 15px">{form.formName}</Text>
                </GridItem>
                <GridItem colSpan={4} display="flex" alignItems="center">
                  <Flex>
                    {isClass ? (
                      <Button
                        style={isExpanded ? hideProgressButton : signUpButton}
                        _hover={{
                          color: '#00377C',
                          textDecoration: 'underline',
                          bg: '#CCE1FF',
                        }}
                        onClick={() =>
                          setExpandedFormId(isExpanded ? null : form.id)
                        }
                      >
                        {isExpanded ? 'Hide Progress' : 'View Progress'}
                      </Button>
                    ) : (
                      <Button style={signedUpButton} disabled>
                        Signed Up
                      </Button>
                    )}
                  </Flex>
                </GridItem>
              </Grid>
            </Flex>
            {isClass && isExpanded && (
              <Box bg="gray.50" borderRadius="md" p="4" mt="3" mb="3">
                <Flex justify="space-between" mb="2">
                  <Text fontSize={cardHeaderFontSize} fontWeight="600">
                    Overall Progress
                  </Text>
                  <Text fontSize={cardHeaderFontSize} fontWeight="600">
                    {completedCourses} / {courses.length}
                  </Text>
                </Flex>
                <Progress value={progress} colorScheme="blue" mb="4" />
                {courses.length === 0 ? (
                  <Text fontSize={cardHeaderFontSize} color="gray.600">
                    Progress is not available yet.
                  </Text>
                ) : (
                  courses.map((course) => (
                    <Flex
                      key={course.courseId}
                      align="center"
                      justify="space-between"
                      gap="3"
                      py="2"
                    >
                      {isSafeCourseLink(course.courseLink) ? (
                        <Link
                          href={course.courseLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="#0628A3"
                          textDecoration="underline"
                          title="Open course link in a new tab"
                        >
                          <Flex align="center" gap="1">
                            <Text fontSize={courseTitleFontSize}>
                              {course.name}
                            </Text>
                            <Icon as={FiExternalLink} aria-hidden="true" />
                          </Flex>
                        </Link>
                      ) : (
                        <Text fontSize={courseTitleFontSize}>
                          {course.name}
                        </Text>
                      )}
                      <Badge
                        colorScheme={statusColors[course.status] || 'gray'}
                        px="3"
                        py="1"
                        fontSize={statusTagFontSize}
                      >
                        {course.status}
                      </Badge>
                    </Flex>
                  ))
                )}
              </Box>
            )}
            {index !== forms.length - 1 && (
              <Divider margin="15px 0px" backgroundColor="black" />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default SignedUpFormsList;
