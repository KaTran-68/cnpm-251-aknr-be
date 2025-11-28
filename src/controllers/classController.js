classList = [
    {
        tutor: "Nguyễn Văn A",
        tutorId: "24101101",
        tutorEmail: "a.nguyen@hcmut.edu.vn",
        tutorPhone: "0111111111",
        student: "Nguyễn Văn A1",
        studentMssv: "24101100",
        subject: "Giải tích 1",
        date: "17/11/2025",
        time: "18:00-20:00",
        location: "Khu tự học KMS BK.B6, cơ sở 2",
        status: "Đã hoàn thành",
        descriptionClass: "Chương 2: Ứng dụng đạo hàm trong khảo sát và vẽ đồ thị hàm số",
    },
    {
        tutor: "Nguyễn Thị B",
        tutorId: "2313137",
        tutorEmail: "b.nguyen@hcmut.edu.vn",
        tutorPhone: "0111111112",
        student: "Nguyễn Thị B1",
        studentMssv: "2313136",
        subject: "Vẽ kỹ thuật",
        date: "29/11/2025",
        time: "15:00-17:00",
        location: "Khu tự học KMS BK.B6, cơ sở 2",
        status: "Sắp diễn ra",
        descriptionClass: "Chương 2: Ứng dụng đạo hàm trong khảo sát và vẽ đồ thị hàm số",
    },
    {
        tutor: "Nguyễn Văn A",
        tutorId: "24101101",
        tutorEmail: "a.nguyen@hcmut.edu.vn",
        tutorPhone: "0111111111",
        student: "Nguyễn Văn A1",
        studentMssv: "24101100",
        subject: "Giải tích 1",
        date: "17/11/2025",
        time: "15:00-17:00",
        location: "Khu tự học KMS BK.B6, cơ sở 2",
        status: "Đã hoàn thành",
        descriptionClass: "Chương 2: Ứng dụng đạo hàm trong khảo sát và vẽ đồ thị hàm số",
    },
];

const getData = async (req, res) => {
  try {
    const { tutorId, tutorEmail, studentMssv, date, time } = req.query;

    // Nếu không có bất kỳ query nào → trả all
    if (!tutorId && !tutorEmail && !studentMssv && !date && !time) {
      return res.status(200).json({
        success: true,
        data: classList,
      });
    }

    // Lọc theo dữ liệu được query
    const filteredData = classList.filter(item => {
      return (
        (tutorId ? item.tutorId === tutorId : true) &&
        (tutorEmail ? item.tutorEmail === tutorEmail : true) &&
        (studentMssv ? item.studentMssv === studentMssv : true) &&
        (date ? item.date === date : true) &&
        (time ? item.time === time : true)
      );
    });

    if (filteredData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lớp học phù hợp.",
      });
    }

    res.status(200).json({
      success: true,
      data: filteredData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

module.exports = { getData };