import React, { useState, useEffect } from 'react';

//layouts
import FormLayout from '../../../layouts/crud_layouts/FormLayout';

// components
import InputField from '../../../components/global/form/InputField';
import Button from '../../../components/global/button/Button';
import MultiSelectField from '../../../components/global/form/MultiSelectField';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';

// utils
import { subjectSchema } from '../../../utils/schemas';

const FacultyCreate = () => {
  const [faculty, setFaculty] = useState({
    name: '',
    semesters: [[]],
    desc: '',
  });
  const [subjects, setSubjects] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getSubjects = async () => {
    await apiHandler('get', 'subjects', null).then((res) => {
      if (res.success) {
        let updatedSubjects = res.data.map((data: subjectSchema) => {
          return {
            title: data.name,
            value: data._id,
            isChecked: false,
          };
        });
        setSubjects(updatedSubjects);
        setIsLoading(false);
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  useEffect(() => {
    getSubjects();
  }, []);

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFaculty((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();

    let mappingSemesters = [];

    for (let i = 0; i < faculty.semesters.length; i++) {
      let mappingSubjects: any[] = [];
      for (let j = 0; j < faculty.semesters[i].length; j++) {
        mappingSubjects.push(faculty.semesters[i][j]['value']);
      }
      mappingSemesters.push(mappingSubjects);
    }

    apiHandler('post', 'faculties/create', {
      name: faculty.name,
      semesters: mappingSemesters,
      desc: faculty.desc,
    }).then((res) => {
      if (res.success) {
        showMessage(res.message, 'success');
        setFaculty({
          name: '',
          semesters: [[]],
          desc: '',
        });
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  const handleTab = (action: string) => {
    let prevSemesters = faculty.semesters;

    if (action === 'remove') {
      prevSemesters.pop();
      setFaculty((prev) => ({
        ...prev,
        semesters: prevSemesters,
      }));
    }

    if (action === 'add') {
      setFaculty((prev) => ({
        ...prev,
        semesters: [...prev.semesters, []],
      }));
    }
  };

  return (
    <FormLayout
      layoutTitle='Create Faculty'
      layoutSubtitle='Fill out the forms'
      handleSubmit={handleCreateFaculty}
      isEdit={false}
      isLoading={isLoading}
    >
      <InputField
        hasLabel
        label='Name'
        name='name'
        value={faculty.name}
        handleChange={handleInputField}
        extraStyling='lg:col-span-2'
      />
      <div className='lg:col-span-2'>
        <div className='flex justify-between items-center'>
          <label
            htmlFor='semesters'
            className='text-gray-400 dark:text-gray-400 text-sm font-semibold'
          >
            Semesters:
          </label>
        </div>
        <div className='mt-3 mb-4 border-b border-gray-200 dark:border-gray-700 flex justify-between'>
          <ul className='flex flex-wrap -mb-px text-sm font-medium text-center'>
            {faculty.semesters.map((_, index) => {
              return (
                <li className='mr-2' key={index}>
                  <button
                    type='button'
                    className={`inline-block px-4 py-2.5 rounded-t-md active ${
                      tabIndex === index
                        ? 'bg-gray-100 dark:bg-gray-700 text-blue-500 dark:text-blue-500'
                        : 'bg-transparent text-gray-500 dark:text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setTabIndex(index)}
                  >
                    Sem {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className='flex gap-2 items-center'>
            {faculty.semesters.length > 1 && (
              <Button
                isSmall
                colorScheme='failure'
                handleClick={() => handleTab('remove')}
              >
                Remove
              </Button>
            )}
            {faculty.semesters.length < 10 && (
              <Button
                isSmall
                colorScheme='info'
                handleClick={() => handleTab('add')}
              >
                Add
              </Button>
            )}
          </div>
        </div>
        <MultiSelectField
          name='subjects'
          hasLabel
          label='Subjects'
          options={subjects}
          setOptions={setSubjects}
          faculty={faculty}
          setFaculty={setFaculty}
          tabIndex={tabIndex}
        />
      </div>
      <InputField
        hasLabel
        label='Description'
        type='textarea'
        name='desc'
        value={faculty.desc}
        handleChange={handleInputField}
        extraStyling='lg:col-span-2'
      />
    </FormLayout>
  );
};

export default FacultyCreate;
