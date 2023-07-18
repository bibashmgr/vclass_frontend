import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// layouts
import ListLayout from '../../../../layouts/crud_layouts/ListLayout';

// components
import Button from '../../../../components/global/button/Button';
import ToggleButton from '../../../../components/global/button/ToggleButton';

// utils
import { attendanceMarkerHeader } from '../../../../utils/tableHeaders';
import { numberTrimmer } from '../../../../utils/trimmer';

// schemas
import { userSchema } from '../../../../utils/schemas';

// handlers
import { apiHandler } from '../../../../handlers/apiHandler';
import { showMessage } from '../../../../handlers/messageHandler';
import dayjs from 'dayjs';

const AttendanceMark = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<userSchema[]>([]);
  const [arePresent, setArePresent] = useState<boolean[]>([]);

  const getStudents = async () => {
    const res = await apiHandler('get', `users/batch/${params.batchId}`, null);

    if (res.success) {
      setStudents(res.data);
      setArePresent(new Array(res.data.length).fill(false));
      setIsLoading(false);
    }
  };

  const handleToggle = (index: number) => {
    setArePresent((prevState) =>
      prevState.map((item, idx) => (idx === index ? !item : item))
    );
  };

  const handleMark = async () => {
    let toSendStudents: string[] = [];
    students.map((student, idx) => {
      if (arePresent[idx]) {
        toSendStudents.push(student._id);
      }
    });

    const res = await apiHandler(
      'post',
      `attendances/${params.batchId}/${params.subjectId}`,
      {
        date: dayjs(Date.now()).format('YYYY/MM/DD'),
        students: toSendStudents,
      }
    );

    if (res.success) {
      navigate(-1);
    } else {
      showMessage(res.message, 'failure');
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="py-4">
      <ListLayout
        layoutTitle="Students"
        layoutSubtitle={`${students.length} students joined`}
        hasCreateBtn={false}
        isEmpty={students.length === 0}
        isLoading={isLoading}
        tableHeader={attendanceMarkerHeader}
        hasMultipleBtns={true}
        multipleBtns={
          <Button colorScheme="success" handleClick={handleMark} isSmall>
            Submit
          </Button>
        }
      >
        {students.map((student, studentIndex) => {
          return (
            <tr key={studentIndex}>
              <td className="px-6 py-4">{numberTrimmer(studentIndex + 1)}</td>
              <td className="px-6 py-4">{student.name}</td>
              <td className="px-6 py-4">{student.email}</td>
              <td className="px-6 py-4 flex items-center">
                <ToggleButton handleToggle={() => handleToggle(studentIndex)} />
              </td>
            </tr>
          );
        })}
      </ListLayout>
    </div>
  );
};

export default AttendanceMark;
