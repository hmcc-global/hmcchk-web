// Muted styling that signals a cell is read-only. Applied to platform/type
// (always read-only) and to every column of an archived course.
const readOnlyCellStyle = {
  color: '#767676',
};

const readOnlyHeaderTooltip =
  "Recorded at sign-up. To change a course's platform or type, edit the form in the Form Editor.";

// colId is built as `course_${courseId}_${field}`; courseId is a uuid (hyphens, no
// underscores) so splitting on '_' yields exactly these three parts. Returns null
// on anything else rather than silently resolving a wrong courseId/field, so a
// future id format that breaks the assumption fails loudly instead of writing to
// the wrong course.
export const parseCourseColId = (colId) => {
  const parts = typeof colId === 'string' ? colId.split('_') : [];
  if (parts.length !== 3 || parts[0] !== 'course' || !parts[1] || !parts[2]) {
    return null;
  }
  return { courseId: parts[1], field: parts[2] };
};

// Per-course getters/setters - course progress lives in classTrackingData.courses,
// keyed by courseId (not a flat dot-path), since each submission snapshots its own
// course list independently of the form's current course config.
const classFieldGetter = (courseId, field) => (params) => {
  const course = params?.data?.classTrackingData?.courses?.find(
    (c) => c.courseId === courseId
  );
  return course ? course[field] : undefined;
};

const classFieldSetter = (courseId, field) => (params) => {
  const course = params?.data?.classTrackingData?.courses?.find(
    (c) => c.courseId === courseId
  );
  if (course) {
    course[field] = params.newValue;
  }
  // Always report a change, even when the course is missing (a submission made
  // before the form became a class). AG Grid skips onCellValueChanged entirely
  // when a valueSetter returns false, which would swallow the edit silently -
  // returning true lets the handler run and tell the admin what happened.
  return true;
};

// Builds the "Class Tracking" AG-Grid column group, one sub-group per course.
// dateFormatter, dateCellProps and mediumTextEditorProps are shared with the rest
// of the grid, so they're passed in rather than redefined here.
export const createClassTrackerColumns = ({
  courses,
  classStatusList,
  dateFormatter,
  dateCellProps,
  mediumTextEditorProps,
}) => {
  // Archived courses trail after the active ones so current-season work stays
  // on the left. Sort a copy (sort mutates) and rely on it being stable to keep
  // the configured order within each group. Purely presentational - every cell
  // read/write is keyed by courseId, not by position.
  // Boolean() so a missing isActive sorts as archived, matching how isArchived
  // reads it below (a raw Number(undefined) is NaN and would leave it in place).
  const orderedCourses = [...courses].sort(
    (a, b) => Number(Boolean(b.isActive)) - Number(Boolean(a.isActive))
  );

  return {
    headerName: 'Class Tracking',
    children: orderedCourses.map((course) => {
      const isArchived = !course.isActive;
      // Active courses show their detail columns by default ('closed' = visible
      // when the group is collapsed). Archived courses collapse to just Status
      // and reveal details only when the group is expanded ('open').
      const detailGroupShow = isArchived ? 'open' : 'closed';
      // Every column of an archived course is read-only, so grey them all out.
      const archivedStyle = isArchived ? readOnlyCellStyle : undefined;

      return {
        headerName: isArchived ? `${course.name} (Archived)` : course.name,
        marryChildren: true,
        children: [
          {
            headerName: 'Status',
            colId: `course_${course.courseId}_status`,
            valueGetter: classFieldGetter(course.courseId, 'status'),
            valueSetter: classFieldSetter(course.courseId, 'status'),
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: classStatusList },
            editable: course.isActive,
            cellStyle: archivedStyle,
          },
          {
            // Display-only: platform is a snapshot captured at submission
            // time, not progress an admin should hand-edit per registrant.
            headerName: 'Platform',
            colId: `course_${course.courseId}_platform`,
            valueGetter: classFieldGetter(course.courseId, 'platform'),
            columnGroupShow: detailGroupShow,
            editable: false,
            headerTooltip: readOnlyHeaderTooltip,
            cellStyle: readOnlyCellStyle,
          },
          {
            // Display-only, same reasoning as Platform above.
            headerName: 'Type',
            colId: `course_${course.courseId}_type`,
            valueGetter: classFieldGetter(course.courseId, 'type'),
            columnGroupShow: detailGroupShow,
            editable: false,
            headerTooltip: readOnlyHeaderTooltip,
            cellStyle: readOnlyCellStyle,
          },
          {
            ...dateCellProps,
            headerName: 'Started At',
            colId: `course_${course.courseId}_startedAt`,
            valueGetter: classFieldGetter(course.courseId, 'startedAt'),
            valueSetter: classFieldSetter(course.courseId, 'startedAt'),
            valueFormatter: dateFormatter,
            columnGroupShow: detailGroupShow,
            editable: course.isActive,
            cellStyle: archivedStyle,
          },
          {
            ...dateCellProps,
            headerName: 'Completed At',
            colId: `course_${course.courseId}_completedAt`,
            valueGetter: classFieldGetter(course.courseId, 'completedAt'),
            valueSetter: classFieldSetter(course.courseId, 'completedAt'),
            valueFormatter: dateFormatter,
            columnGroupShow: detailGroupShow,
            editable: course.isActive,
            cellStyle: archivedStyle,
          },
          {
            ...mediumTextEditorProps,
            headerName: 'Remarks',
            colId: `course_${course.courseId}_remarks`,
            valueGetter: classFieldGetter(course.courseId, 'remarks'),
            valueSetter: classFieldSetter(course.courseId, 'remarks'),
            columnGroupShow: detailGroupShow,
            editable: course.isActive,
            cellStyle: archivedStyle,
          },
        ],
      };
    }),
  };
};
