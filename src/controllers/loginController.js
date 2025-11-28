
// Xử lý logic API để lấy danh sách dữ liệu
const loginTutor = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp username và password' });
  }

  if((username != 'tutor') || (password != 'tutor')) {
    return res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
  }

  return res.status(200).json({ message: 'Đăng nhập thành công', auth: true, role: 'tutor' });
};

const loginStudent = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp username và password' });
  }

  if((username != 'student') || (password != 'student')) {
    return res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
  }

  return res.status(200).json({ message: 'Đăng nhập thành công', auth: true, role: 'student' });
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp username và password' });
  }

  if((username != 'admin') || (password != 'admin')) {
    return res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
  }

  return res.status(200).json({ message: 'Đăng nhập thành công', auth: true, role: 'admin' });
};

const loginTeacher = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp username và password' });
  }

  if((username != 'teacher') || (password != 'teacher')) {
    return res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
  }

  return res.status(200).json({ message: 'Đăng nhập thành công', auth: true, role: 'teacher' });
};

module.exports = { loginAdmin, loginStudent, loginTeacher, loginTutor };