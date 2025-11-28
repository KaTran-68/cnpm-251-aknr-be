studentList = [
  {
    name: "Nguyễn Văn A1",
    sex: "Nam",
    mssv: "24101100",
    email: "a.nguyen@hcmut.edu.vn",
    password: "123456",
    phone: "0111111111",
    faculty: "Khoa học và Kỹ thuật Máy tính",
    major: "Khoa học Máy tính",
    gpa: 3.5,
    startDay: "19/11/2025",
  },
  {
    name: "Nguyễn Thị B1",
    sex: "Nữ",
    mssv: "2313136",
    email: "b.nguyen@hcmut.edu.vn",
    password: "123456",
    phone: "0111111112",
    faculty: "Cơ khí",
    major: "Cơ điện tử",
    gpa: 3.1,
    startDay: "20/11/2025",
  },
  {
    name: "Đinh Quỳnh C1",
    sex: "Nữ",
    mssv: "2311485",
    email: "c.dinh@hcmut.edu.vn",
    password: "123456",
    phone: "0111111113",
    faculty: "Điện - Điện tử",
    major: "Điện tử Viễn thông",
    gpa: 3.2,
    startDay: "21/11/2025",
  },
  {
    name: "Phạm Quang T1",
    sex: "Nam",
    mssv: "2313137",
    email: "thanh.pham@hcmut.edu.vn",
    password: "123456",
    phone: "0121111113",
    faculty: "Khoa học và Kỹ thuật Máy tính",
    major: "Khoa học Máy tính",
    gpa: 3.8,
    startDay: "17/11/2025",
  }
];

// Xử lý logic API để lấy danh sách dữ liệu
const getData = async (req, res) => {
  try {
    const { email } = req.query;

    // Nếu có query email → trả về student tương ứng
    if (email) {
      const student = studentList.find(s => s.email === email);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sinh viên với email này",
        });
      }

      return res.status(200).json({
        success: true,
        data: student,
      });
    }

    // Nếu không có email → trả về toàn bộ danh sách
    res.status(200).json({
      success: true,
      data: studentList,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

module.exports = { getData };