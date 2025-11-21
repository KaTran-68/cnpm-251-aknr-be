StudentList = [
  {
    Name: "Nguyễn Văn A", 
    Sex: "Nam",
    MSSV: "24101101",
    Email: "a.nguyen@hcmut.edu.vn",
    Password: "123456",
    Phone: "0111111111",
    Faculty: "Khoa học và Kỹ thuật Máy tính",
    Major: "Khoa học Máy tính",
    GPA: 3.5,
    StartDay: "19/11/2025",
  },
  {
    Name: "Nguyễn Thị B", 
    Sex: "Nữ",
    MSSV: "2313138",
    Email: "b.nguyen@hcmut.edu.vn",
    Password: "123456",
    Phone: "0111111112",
    Faculty: "Cơ khí",
    Major: "Cơ điện tử",
    GPA: 3.1,
    StartDay: "20/11/2025",
  },
  {
    Name: "Đinh Quỳnh C", 
    Sex: "Nữ",
    MSSV: "2311486",
    Email: "c.dinh@hcmut.edu.vn",
    Password: "123456",
    Phone: "0111111113",
    Faculty: "Điện - Điện tử",
    Major: "Điện tử Viễn thông",
    GPA: 3.2,
    StartDay: "21/11/2025",
  },
  {
    Name: "Phạm Quang T", 
    Sex: "Nam",
    MSSV: "2313138",
    Email: "thanh.pham@hcmut.edu.vn",
    Password: "123456",
    Phone: "0121111113",
    Faculty: "Khoa học và Kỹ thuật Máy tính",
    Major: "Khoa học Máy tính",
    GPA: 3.8,
    StartDay: "17/11/2025",
  }
];


// Xử lý logic API để lấy danh sách dữ liệu
const getData = async (req, res) => {
  try {
    const { Email } = req.query;

    // Nếu có query Email → trả về student tương ứng
    if (Email) {
      const student = StudentList.find(s => s.Email === Email);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sinh viên với Email này",
        });
      }

      return res.status(200).json({
        success: true,
        data: student,
      });
    }

    // Nếu không có Email → trả về toàn bộ danh sách
    res.status(200).json({
      success: true,
      data: StudentList,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};


module.exports = { getData };