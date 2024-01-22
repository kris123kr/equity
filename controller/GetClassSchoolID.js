// ... (previous code)

const GetClassSchoolID = async (req, res) => {
    const schoolId = req.params.schoolId;
  
    // Check if the provided schoolId is valid
    const [school] = await connection.query('SELECT * FROM schools WHERE id = ?', [schoolId]);
    if (school.length === 0) {
      return res.status(400).json({ error: 'Invalid schoolId' });
    }
  
    // Fetch classes based on the provided schoolId
    const [classes] = await connection.query('SELECT * FROM classes WHERE school_id = ?', [schoolId]);
  
    res.json({
      classes,
    });
  }

  module.exports = GetClassSchoolID