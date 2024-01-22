
const Login = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if the user exists
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0 || user[0].password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    // Return success response
    res.json({
      success: 'Login successful',
      userId: user[0].id,
      role: user[0].role,
      schoolId: user[0].school_id,
    });
  };

  module.exports= Login