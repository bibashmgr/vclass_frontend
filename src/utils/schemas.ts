export type subjectSchema = {
    _id: string,
    name: string,
    codeName: string,
}

export type facultySchema = {
    _id: string,
    name: string,
    semesters: [],
}

export type batchSchema = {
    _id: string,
    year: string,
    facultyId: string,
    semester: number,
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
}