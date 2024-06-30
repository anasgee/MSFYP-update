import React, { useState } from 'react';
import axios from 'axios';
import "./Plagiarism.css"
import { useDropzone } from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PlagiarismDetector = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.doc,.docx,.pdf,.txt',
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setResult('');
      setError('');
    },
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setError('');
      setResult('');
// For Api of any plateform for integration
      const response = await axios.post('YOUR_API_ENDPOINT_HERE', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      toast.success("Plagiarism Checked Successfully")
      ;

      setResult(response.data);
    } catch (err) {
      toast.error('Failed to check for plagiarism. Please try again.',{ autoClose: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='plagiarism'>
      <div className='innerDiv'>
      <h1>Plagiarism Detector</h1>
      <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #007BFF', padding: '90px 130px', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here, or click to select a file</p>
      </div>
      {file && <p>Selected file: {file.name}</p>}
      <button onClick={handleUpload} disabled={loading} style={{ marginTop: '10px' }}>
        {loading ? 'Checking...' : 'Check for Plagiarism'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div>
          <h2>Plagiarism Report</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      </div>
    <ToastContainer/>
    </div>
  );
};

export default PlagiarismDetector;
