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
  semesters: any[][];
  desc: string;
  isHidden: boolean;
};

export type batchSchema = {
  _id: string;
  year: string;
  faculty: {
    _id: string;
    name: string;
    semesters: string[][];
    isHidden: boolean;
  };
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

export type messageSchema = {
  _id: string;
  desc: string;
  portal: string;
  user: userSchema;
  createdAt: Date;
};

export type postSchema = {
  _id: string;
  portal: string;
  user: userSchema;
  category: string;
  title: string;
  desc: string;
  files: string;
  submittedBy: string[];
  assignmentRef: string | null;
  createdAt: Date;
};
