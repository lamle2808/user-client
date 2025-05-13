function FormatDate(dateStr) {
  if (!dateStr) {
    return ""; // Trả về chuỗi trống nếu không có dữ liệu
  }

  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
export default FormatDate;
