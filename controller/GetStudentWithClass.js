// ... (previous code)

// Get students assigned to all created classes
const GetStudentWithClass =  async (req, res) => {
    // Fetch all created classes
    const [classes] = await connection.query('SELECT id FROM classes');
  
    if (classes.length === 0) {
      return res.status(400).json({ error: 'No classes created yet' });
    }
  
    const classIds = classes.map((classInfo) => classInfo.id);
  
    // Fetch students that are assigned to all classes
    const [students] = await connection.query(`
      SELECT s.id, s.name, s.photo
      FROM students s
      WHERE NOT EXISTS (
        SELECT c.id FROM classes c
        WHERE c.id NOT IN (
          SELECT class_id FROM students WHERE id = s.id
        )
      )
    `);
  
    res.json({
      students,
    });
  }

  module.exports = GetStudentWithClass