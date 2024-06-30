const errorHandler = (error, res) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  };
  
  module.exports = errorHandler;
  