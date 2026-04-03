import os

import requests
from openpyxl import load_workbook
from openpyxl.styles import Font


class FetchData:
    def __init__(self, start_date, end_date, token, template_path):
        self.__API_URL = f"http://localhost:8080/api/req/ot-logs/export?start_date={start_date}&end_date={end_date}"
        self.start_date = start_date
        self.end_date = end_date
        self.token = token
        self.template_path = template_path
        self.data = None
        self.wb = load_workbook(template_path)
        self.template  = self.wb["OT"]
        self.font_size = 11
        self.initialine = 1
        self.relative_path = os.path.dirname(os.path.abspath(__file__))
        self.font_path = os.path.join(self.relative_path, "include", "font", "THSarabunNew.ttf")
        self._pil_font = None
        self._th_font = Font(name="TH Sarabun New", size=self.font_size)
        self.include_path = os.path.join(self.relative_path, "include")
        self._rect_delivery = None
        self._rect_request = None

    def _fetch_data(self):
        header = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.token}"
        }
        response = requests.get(self.__API_URL, headers=header)

        try:
            response_json = response.json()
        except ValueError:
            response_json = None

        if response.status_code == 200:
            self.data = response_json
        else:
            print(f"Error fetching data: {response.status_code} - {response.text}")
            self.data = None

        return self.data

    def _define_page_data(self):
        if self.data is None:
            raise ValueError("Data not fetched. Please call _fetch_data() first.")

        # รองรับทั้งกรณีที่ API ส่ง list ตรง ๆ หรือห่ออยู่ใน key 'data'
        if isinstance(self.data, dict):
            ot_data = self.data.get("data") or []
        else:
            ot_data = self.data

        sheet = self.template
        current_row = 2  # สมมติว่าแถวที่ 1 เป็น header

        for item in ot_data:
            sheet[f"A{current_row}"] = item.get("employee_code", "")
            sheet[f"B{current_row}"] = item.get("date", "")
            sheet[f"C{current_row}"] = item.get("shift_id", "")
            sheet[f"D{current_row}"] = item.get("type_ot", "")
            sheet[f"E{current_row}"] = item.get("type_ots", "")
            sheet[f"F{current_row}"] = item.get("approve", 0)

            hours_val = item.get("hours", 0)
            try:
                hours_val = float(hours_val)
            except (TypeError, ValueError):
                hours_val = 0
            sheet[f"G{current_row}"] = round(hours_val, 2)

            current_row += 1
        
class GenerateOT(FetchData):
    def __init__(self, start_date, end_date, token, template_path="ot-template.xlsx"):
        super().__init__(start_date, end_date, token, template_path)
        self.token = token
        self.start_date = start_date
        self.end_date = end_date

    def logging(self):
        # ดึงข้อมูลจาก API และเขียนลงชีท OT
        self._fetch_data()
        self._define_page_data()

        outputpath = os.path.join("output", "excel", f"OT_{self.start_date}_{self.end_date}.xlsx")
        os.makedirs(os.path.dirname(outputpath), exist_ok=True)

        self.wb.save(outputpath)
        return outputpath