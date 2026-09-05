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
  backgroundColor: 'transparent',
  border: '1px solid #ADCFFF',
};

const cardHeaderFontSize = '0.875rem';
const courseTitleFontSize = '0.8rem';
const statusTagFontSize = '0.65rem';

const statusColors = {
  'In Progress': 'blue',
  Completed: 'green',
};

const isSafeCourseLink = (courseLink) =>
  typeof courseLink === 'string' && /^https?:\/\//i.test(courseLink);

// The user's snapshot is the source of truth for which courses are shown
// (archived/template-only courses the user never signed up for are excluded).
// The live template is used only to enrich display details like name/link.
const getProgressCourses = (form, classProgress) => {
  const templateCourses = form.classTrackingTemplate?.courses ?? [];
  const snapshotCourses = classProgress?.classTrackingData?.courses ?? [];

  return snapshotCourses.map((snapshotCourse) => {
    const templateCourse = templateCourses.find(
      (course) => course.courseId === snapshotCourse.courseId
    );

    return {
      ...templateCourse,
      ...snapshotCourse,
      // Prefer the template's link so admins can update course links after
      // sign-up; fall back to the link captured at submission time.
      courseLink: templateCourse?.courseLink ?? snapshotCourse.courseLink ?? '',
      status: snapshotCourse.status ?? 'Not Started',
    };
  });
};

const SignedUpFormsList = ({ forms = [], classProgressList = [] }) => {
  const [expandedFormId, setExpandedFormId] = useState(null);

  // get-signedup-form returns undefined entries for submissions whose form
  // is unpublished/expired — drop them before rendering, which also keeps
  // the divider count correct.
  const visibleForms = (forms || []).filter(Boolean);

  return (
    <Box>
      {visibleForms.map((form, index) => {
        const classProgress = classProgressList.find(
          (item) => item.formId === form.id
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
                          aria-label={`Open ${course.name} course link in a new tab`}
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
            {index !== visibleForms.length - 1 && (
              <Divider margin="15px 0px" backgroundColor="black" />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default SignedUpFormsList;
