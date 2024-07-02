import axios from 'axios';

const API_URL = 'http://localhost:5000/api/grades';
export const getGrades = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addGrade = async (grade) => {
  const response = await axios.post(API_URL, grade);
  return response.data;
};


export const updateGrade = async (id, updatedGrade) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedGrade);
  return response.data;
};


export const deleteGrade = async (id, deletedGrade) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getStudentGrades = async (rollNumber) => {
  const response = await axios.get(`${API_URL}/student/${rollNumber}`);
  return response.data;
};
