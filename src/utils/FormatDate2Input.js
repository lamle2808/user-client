function FormatDate2Input(dateString) {
  // Chuyển đổi chuỗi ngày thành đối tượng Date
  const dateObject = new Date(dateString);

  // Trích xuất ngày, tháng và năm từ đối tượng Date
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = dateObject.getDate().toString().padStart(2, "0");

  // Tạo chuỗi mới có định dạng "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
export default FormatDate2Input;
