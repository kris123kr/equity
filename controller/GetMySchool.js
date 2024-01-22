// ... (previous code)

// Middleware for token authentication

  
  const MySchool =  async (req, res) => {
    const userId = req.user.user_id;
  
    // Fetch schools and roles associated with the user
    const [schools] = await connection.query(`
      SELECT s.*, 
             CASE
               WHEN u.role = 'admin' THEN 'admin'
               WHEN u.role = 'teacher' THEN 'teacher'
               WHEN u.role = 'parent' THEN 'parent'
               ELSE 'unknown'
             END AS user_role
      FROM schools s
      JOIN users u ON s.id = u.school_id
      WHERE u.id = ?
    `, [userId]);
  
    res.json({
      schools,
    });
  }

  module.exports = MySchool