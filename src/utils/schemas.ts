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
  createdAt: Date;
};
