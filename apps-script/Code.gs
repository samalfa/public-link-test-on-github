/**
 * วิธีใช้งาน
 * 1. เปิด Google Sheets ใหม่ (จะใช้เก็บผลสอบ)
 * 2. เมนู Extensions > Apps Script วางโค้ดนี้ทับของเดิม แล้วกด Save
 * 3. กด Deploy > New deployment > เลือกประเภท "Web app"
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. คัดลอก Web app URL ที่ได้ ไปวางแทนค่า GAS_URL ใน quiz-network-cisco.html
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Results")
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Results");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["เวลาที่บันทึก", "ชื่อ", "รหัส/หน่วยงาน", "คะแนน", "เต็ม", "เวลาที่ใช้ (วินาที)", "สลับหน้าจอ (ครั้ง)", "ชื่อชุดข้อสอบ", "เวลาส่งผล (ฝั่งผู้สอบ)"]);
  }

  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.code || "",
    data.score,
    data.total,
    data.usedSeconds,
    data.leaveCount,
    data.title || "",
    data.when || ""
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
