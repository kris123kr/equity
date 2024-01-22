const SignUp = async (req, res) => {
    const { name, email, password, photo, parentInviteCode, teacherInviteCode } = req.body;
  
    // Check if the user already exists
    const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
  
    let schoolId, role;
  
    // If no invite codes provided, create a new school and assign admin role
    if (!parentInviteCode && !teacherInviteCode) {
      schoolId = uuid.v4();
      await connection.execute('INSERT INTO schools (id) VALUES (?)', [schoolId]);
      role = 'admin';
    } else {
      // Check if the provided invite codes are valid
      const [parentSchool] = await connection.query('SELECT * FROM schools WHERE id = ?', [parentInviteCode]);
      const [teacherSchool] = await connection.query('SELECT * FROM schools WHERE id = ?', [teacherInviteCode]);
  
      if (parentInviteCode && parentSchool.length > 0) {
        schoolId = parentInviteCode;
        role = 'parent';
      } else if (teacherInviteCode && teacherSchool.length > 0) {
        schoolId = teacherInviteCode;
        role = 'teacher';
      } else {
        return res.status(400).json({ error: 'Invalid invite code' });
      }
    }
  
    // Create a new user
    const userId = uuid.v4();
    await connection.execute(
      'INSERT INTO users (id, name, email, password, photo, role, school_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, name, email, password, photo, role, schoolId]
    );
  
    // Return success response
    res.json({
      success: 'User registered successfully',
      userId,
      schoolId,
      role,
    });
  };

  module.exports = SignUp;