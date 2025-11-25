applicationList = [
    {
        name: "Nguyễn Văn A",
        id: "24101101",
        email: "a.nguyen@hcmut.edu.vn",
        phone: "0111111111",
        faculty: "Khoa học và Kỹ thuật Máy tính",
        major: "Khoa học Máy tính",
        gpa: 3.5,
        discription: "Có khả năng dạy tốt các môn Đại cương, đặc biệt là Giải tích 1 và Vật lý 1",
        status: "Pending",
        daySubmit: "20/11/2025",
        dayRespond: "",
    },
    {
        name: "Nguyễn Thị B",
        id: "2313137",
        email: "b.nguyen@hcmut.edu.vn",
        phone: "0111111112",
        faculty: "Cơ khí",
        major: "Cơ điện tử",
        gpa: 3.1,
        discription: "Đảm bảo 4.0 cho học viên ở môn học: Vẽ kĩ thuật, Cơ học vật rắn",
        status: "Approved",
        daySubmit: "20/11/2025",
        dayRespond: "22/11/2025",
    },
    {
        name: "Đinh Quỳnh C",
        id: "2311486",
        email: "c.dinh@hcmut.edu.vn",
        phone: "0111111112",
        faculty: "Điện - Điện tử",
        major: "Điện tử Viễn thông",
        gpa: 3.2,
        discription: "Có khả năng giảng bài dễ hiểu, giúp học viên nắm vững kiến thức các môn Đại cương, như: Vật lý 1, Hóa Đại cương",
        status: "Rejected",
        daySubmit: "17/11/2025",
        dayRespond: "21/11/2025",
    },
];

const getData = async (req, res) => {
  try {
    const { email, status, daySubmit, dayRespond } = req.query;

    // Nếu không có query → trả về tất cả dữ liệu
    if (!email && !status && !daySubmit && !dayRespond) {
      return res.status(200).json({
        success: true,
        data: applicationList,
      });
    }

    // Lọc theo từng giá trị query (nếu có)
    const filtered = applicationList.filter(item => {
      return (
        (email ? item.email === email : true) &&
        (status ? item.status === status : true) &&
        (daySubmit ? item.daySubmit === daySubmit : true) &&
        (dayRespond ? item.dayRespond === dayRespond : true)
      );
    });

    // Không tìm thấy dữ liệu
    if (filtered.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy application phù hợp.",
      });
    }

    // Trả kết quả lọc
    return res.status(200).json({
      success: true,
      data: filtered,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

const updateStatus = (req, res) => {
    const { email, status } = req.body;

    // Kiểm tra thiếu dữ liệu
    if (!email || !status) {
        return res.status(400).json({
            success: false,
            message: "Thiếu email hoặc status trong body.",
        });
    }

    // Tìm application theo email
    const application = applicationList.find(app => app.email === email);

    if (!application) {
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy application có email này.",
        });
    }

    // Cập nhật status và ngày phản hồi
    application.status = status;
    application.dayRespond = new Date().toLocaleDateString("vi-VN");

    return res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái thành công.",
        data: application,
    });
};

module.exports = { getData, updateStatus };

