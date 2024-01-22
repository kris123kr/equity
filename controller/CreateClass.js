// ... (previous code)

const CreateClass = async (req, res) => {
    const { name, school_id } = req.body;
  
    // Check if the provided school_id is valid
    const [school] = await connection.query('SELECT * FROM schools WHERE id = ?', [school_id]);
    if (school.length === 0) {
      return res.status(400).json({ error: 'Invalid school_id' });
    }
  
    // Insert class data into the database
    const classId = uuid.v4();
    await connection.execute(
      'INSERT INTO classes (id, name, school_id) VALUES (?, ?, ?)',
      [classId, name, school_id]
    );
  
    // Return success response
    res.json({
      success: 'Class created successfully',
      classId,
      school_id,
    });
  }

  module.exports = CreateClass