export type subjectSchema = {
  _id: string;
  name: string;
  codeName: string;
  desc: string;
  isHidden: boolean;
};

export type facultySchema = {
  _id: string;
  name: string;
  semesters: subjectSchema[][] | string[][];
  desc: string;
  isHidden: boolean;
};

export type batchSchema = {
  _id: string;
  year: string;
  faculty: facultySchema;
  currentSemester: number;
  desc: string;
  isHidden: boolean;
};

export type userSchema = {
  _id: string;
  googleId: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
  college: string | null;
  batch: batchSchema;
  isHidden: boolean;
};

export type portalSchema = {
  _id: string;
  batch: batchSchema;
  subject: subjectSchema;
  teacher: userSchema;
  activeDates: Date[];
  createdAt: Date;
};

export type messageSchema = {
  _id: string;
  desc: string;
  portal: string;
  user: userSchema;
  createdAt: Date;
};

export type fileSchema = {
  id: string;
  filename: string;
  originalname: string;
};

export type postFileSchema = {
  _id: string;
  filename: string;
};

export type postSchema = {
  _id: string;
  portal: string;
  user: userSchema;
  category: string;
  title: string;
  desc: string;
  files: postFileSchema[];
  submittedBy: postSchema[];
  assignmentRef: string | null;
  dueDate: Date | null;
  credit: number | null;
  createdAt: Date;
};

export type postStatsSchema = {
  user: {
    name: string;
    email: string;
  };
  posts: [
    {
      title: string;
      credit: number;
      status: string;
    }
  ];
  stats: {
    done: number;
    late: number;
    missing: number;
  };
};

export type postSingleStatsSchema = {
  name: string;
  email: string;
  status: string;
};

export type attendanceStatsSchema = {
  totalPresents: number;
  totalAbsents: number;
  students:
    | [
        {
          _id: string;
          name: string;
          email: string;
          status: string;
        }
      ]
    | [];
};

export type userAttendanceStatsSchema = {
  _id: string;
  portal: portalSchema;
  user: userSchema;
  activeDates: Date[];
};
