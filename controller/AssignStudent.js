// ... (previous code)

const AssignStudent =  async (req, res) => {
    const { class_id, student_id } = req.body;
  
    // Check if the provided class_id is valid
    const [classInfo] = await connection.query('SELECT * FROM classes WHERE id = ?', [class_id]);
    if (classInfo.length === 0) {
      return res.status(400).json({ error: 'Invalid class_id' });
    }
  
    // Check if the provided student_id is valid
    const [student] = await connection.query('SELECT * FROM students WHERE id = ?', [student_id]);
    if (student.length === 0) {
      return res.status(400).json({ error: 'Invalid student_id' });
    }
  
    // Update the student's class_id in the database
    await connection.execute('UPDATE students SET class_id = ? WHERE id = ?', [class_id, student_id]);
  
    // Return success response
    res.json({
      success: 'Student assigned to class successfully',
      student_id,
      class_id,
    });
  }

  module.exports = AssignStudent