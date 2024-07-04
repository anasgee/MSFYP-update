const users = {
    1: { id: 1, role: 'teacher', name: 'Teacher' },
    2: { id: 2, role: 'student', name: 'Student 1' },
    3: { id: 3, role: 'student', name: 'Student 2' }
};

export const getUserById = (userId) => {
    return users[userId];
};
