// ... (previous code)

const CreateStudent = async (req, res) => {
    const { name, photo, school_id } = req.body;
  
    // Check if the provided school_id is valid
    const [school] = await connection.query('SELECT * FROM schools WHERE id = ?', [school_id]);
    if (school.length === 0) {
      return res.status(400).json({ error: 'Invalid school_id' });
    }
  
    // Insert student data into the database
    const studentId = uuid.v4();
    await connection.execute(
      'INSERT INTO students (id, name, photo, school_id) VALUES (?, ?, ?, ?)',
      [studentId, name, photo, school_id]
    );
  
    // Return success response
    res.json({
      success: 'Student created successfully',
      studentId,
      school_id,
    });
  }

  module.exports = CreateStudent