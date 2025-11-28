tutorList = [
    {
        name: "Nguyễn Văn A",
        sex: "Nam",
        id: "24101101",
        email: "a.nguyen@hcmut.edu.vn",
        password: "123456",
        phone: "0111111111",
        faculty: "Khoa học và Kỹ thuật Máy tính",
        major: "Khoa học Máy tính",
        gpa: 3.5,
        description: "Có khả năng dạy tốt các môn Đại cương, đặc biệt là Giải tích 1 và Vật lý 1",
    },
    {
        name: "Nguyễn Thị B",
        sex: "Nữ",
        id: "2313137",
        email: "b.nguyen@hcmut.edu.vn",
        password: "123456",
        phone: "0111111112",
        faculty: "Cơ khí",
        major: "Cơ điện tử",
        gpa: 3.1,
        description: "Đảm bảo 4.0 cho học viên ở môn học: Vẽ kĩ thuật, Cơ học vật rắn",
    },
    {
        name: "Đinh Quỳnh C",
        sex: "Nữ",
        id: "2311486",
        email: "c.dinh@hcmut.edu.vn",
        password: "123456",
        phone: "0111111113",
        faculty: "Điện - Điện tử",
        major: "Điện tử Viễn thông",
        gpa: 3.2,
        description: "Có khả năng giảng bài dễ hiểu, giúp học viên nắm vững kiến thức các môn Đại cương, như: Vật lý 1, Hóa Đại cương",
    },
    {
        name: "Phạm Quang T",
        sex: "Nam",
        id: "2313138",
        email: "thanh.pham@hcmut.edu.vn",
        password: "123456",
        phone: "0121111113",
        faculty: "Khoa học và Kỹ thuật Máy tính",
        major: "Khoa học Máy tính",
        gpa: 3.8,
        description: "Hài hước, dễ gần, giúp học viên nắm vững kiến thức lập trình cơ bản như Nhập môn điện toán, Kỹ thuật lập trình, Cấu trúc dữ liệu và Giải thuật",
    }
];

// Xử lý logic API để lấy danh sách dữ liệu
const getData = async (req, res) => {
    try {
        const { email } = req.query;

        // Nếu có query email → trả về tutor tương ứng
        if (email) {
            const tutor = tutorList.find(s => s.email === email);

            if (!tutor) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy tutor với email này",
                });
            }

            return res.status(200).json({
                success: true,
                data: tutor,
            });
        }

        // Nếu không có email → trả về toàn bộ danh sách
        res.status(200).json({
            success: true,
            data: tutorList,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
};

module.exports = { getData };