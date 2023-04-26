export type subjectSchema = {
    _id: string,
    name: string,
    codeName: string,
    isHidden: boolean,
}

export type facultySchema = {
    _id: string,
    name: string,
    semesters: [],
    isHidden: boolean,
}

export type batchSchema = {
    _id: string,
    year: string,
    facultyId: string,
    currentSemester: number,
    isHidden: boolean,
}

export type userSchema = {
    _id: string,
    googleId: string,
    avatar: string,
    name: string,
    email: string,
    role: string,
    college: string,
    batch: number,
    faculty: string,
    isHidden: boolean,
}