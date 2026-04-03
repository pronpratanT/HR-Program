import moduleOT
import os
import time
from flask import Flask, request, send_file
from flask_cors import CORS

template_path = os.path.join("include", "template", "ot-template.xlsx")
app = Flask(__name__)
cors = CORS(app, resource={r"/*": {"origins": "*"}})

@app.route("/generate-ot/<start_date>/<end_date>", methods=['GET'])
def generate_ot(start_date, end_date):
    token = request.headers.get('Authorization')
    token = token.replace("Bearer ", "")
    gen_ot = moduleOT.GenerateOT(start_date=start_date, end_date=end_date, token=token, template_path=template_path)
    pdf_path = gen_ot.logging()
    return send_file(pdf_path, as_attachment=True, download_name=f"OT_{start_date}_{end_date}.xlsx")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)