import { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Link,
  Progress,
  Text,
} from 'components';

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
  const courses = templateCourses.length > 0 ? templateCourses : snapshotCourses;

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
              w="100%"
              fontSize={{ base: '0.7rem', md: '0.8rem' }}
              fontWeight="700"
              textAlign="left"
              py="2"
            >
              <Box flex="1" minW="0">
                <Text>{form.formName}</Text>
              </Box>
              {isClass ? (
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="blue"
                  onClick={() =>
                    setExpandedFormId(isExpanded ? null : form.id)
                  }
                >
                  {isExpanded ? 'Hide Progress' : 'View Progress'}
                </Button>
              ) : (
                <Button size="sm" isDisabled>
                  Signed Up
                </Button>
              )}
            </Flex>
            {isClass && isExpanded && (
              <Box bg="gray.50" borderRadius="md" p="4" mb="3">
                <Flex justify="space-between" mb="2">
                  <Text fontSize="sm" fontWeight="600">
                    Overall Progress
                  </Text>
                  <Text fontSize="sm" fontWeight="600">
                    {completedCourses} / {courses.length}
                  </Text>
                </Flex>
                <Progress value={progress} colorScheme="blue" mb="4" />
                {courses.length === 0 ? (
                  <Text fontSize="sm" color="gray.600">
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
                          color="blue.600"
                          textDecoration="underline"
                        >
                          {course.name}
                        </Link>
                      ) : (
                        <Text>{course.name}</Text>
                      )}
                      <Badge colorScheme={statusColors[course.status] || 'gray'}>
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