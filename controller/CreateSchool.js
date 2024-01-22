

const CreateSchool =  async (req, res) => {
  const { name, photo } = req.body;

  // Generate unique school ID and invite codes
  const schoolId = uuid.v4();
  const parentInviteCode = uuid.v4();
  const teacherInviteCode = uuid.v4();

  // Insert school data into the database
  await connection.execute(
    'INSERT INTO schools (id, name, photo) VALUES (?, ?, ?)',
    [schoolId, name, photo]
  );

  // Return success response with generated codes
  res.json({
    success: 'School created successfully',
    schoolId,
    parentInviteCode,
    teacherInviteCode,
  });
}

module.exports = CreateSchool;
