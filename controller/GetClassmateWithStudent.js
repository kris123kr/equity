// ... (previous code)

// Get classmates of a specific student who are part of all the same classes
const GetClassmateWithStudent =  async (req, res) => {
    const studentId = req.params.studentId;
  
    // Check if the provided studentId is valid
    const [student] = await connection.query('SELECT * FROM students WHERE id = ?', [studentId]);
    if (student.length === 0) {
      return res.status(400).json({ error: 'Invalid studentId' });
    }
  
    // Fetch classes that the specified student is part of
    const [studentClasses] = await connection.query('SELECT class_id FROM students WHERE id = ?', [studentId]);
  
    if (studentClasses.length === 0) {
      return res.status(400).json({ error: 'Student is not assigned to any class' });
    }
  
    const classIds = studentClasses.map((classInfo) => classInfo.class_id);
  
    // Fetch classmates who are part of all the same classes
    const [classmates] = await connection.query(`
      SELECT s.id, s.name, s.photo
      FROM students s
      WHERE s.id != ? AND NOT EXISTS (
        SELECT c.id FROM classes c
        WHERE c.id IN (?)
        AND c.id NOT IN (
          SELECT class_id FROM students WHERE id = s.id
        )
      )
    `, [studentId, classIds]);
  
    res.json({
      classmates,
    });
  }

  module.exports = GetClassmateWithStudent