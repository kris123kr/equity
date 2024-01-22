// ... (previous code)

// Get students by school_id or class_id
const GetStudent =  async (req, res) => {
    const { school_id, class_id } = req.query;
  
    // Check if either school_id or class_id is provided
    if (!school_id && !class_id) {
      return res.status(400).json({ error: 'Provide either school_id or class_id' });
    }
  
    let students;
  
    // Fetch students based on school_id
    if (school_id) {
      const [school] = await connection.query('SELECT * FROM schools WHERE id = ?', [school_id]);
      if (school.length === 0) {
        return res.status(400).json({ error: 'Invalid school_id' });
      }
  
      students = await connection.query('SELECT * FROM students WHERE school_id = ?', [school_id]);
    }
  
    // Fetch students based on class_id
    if (class_id) {
      const [classInfo] = await connection.query('SELECT * FROM classes WHERE id = ?', [class_id]);
      if (classInfo.length === 0) {
        return res.status(400).json({ error: 'Invalid class_id' });
      }
  
      students = await connection.query('SELECT * FROM students WHERE class_id = ?', [class_id]);
    }
  
    res.json({
      students,
    });
  }

  module.exports = GetStudent