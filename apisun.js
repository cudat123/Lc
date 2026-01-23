const http = require("http");

const API_TX = "https://lc79hux.hacksieucap.pro/lc79hudd";
const API_MD5 = "https://lc79md5x.hacksieucap.pro/lc79md5_det";

// ===== HÀM CHUẨN HOÁ DATA =====
function normalize(data) {
  return {
    // ===== META =====
    id: "@tiendataox",

    // ===== PHIÊN =====
    phien_hien_tai: data.phiendudoan,
    phien: data.Phien,

    // ===== KẾT QUẢ =====
    ket_qua: data.Ket_qua,
    tong: data.Tong,

    // ===== XÚC XẮC =====
    xuc_xac_1: data.Xuc_xac_1,
    xuc_xac_2: data.Xuc_xac_2,
    xuc_xac_3: data.Xuc_xac_3,

    // ===== DỰ ĐOÁN =====
    du_doan: data.du_doan,
    ty_le_du_doan: data.ty_le_dd,

    // ===== CẦU =====
    dang_cau: data.dang_cau,

    // ===== PHÂN TÍCH =====
    phan_tich: data.analysis_summary || null,

    // ===== PATTERN =====
    pattern: data.pattern
  };
}

// ===== GỌI API =====
async function fetchAPI(url) {
  const res = await fetch(url);
  const data = await res.json();
  return normalize(data);
}

// ===== SERVER =====
const server = http.createServer(async (req, res) => {
  try {
    let data = null;

    if (req.url.startsWith("/api/tx")) {
      data = await fetchAPI(API_TX);
    } else if (req.url.startsWith("/api/md5")) {
      data = await fetchAPI(API_MD5);
    } else {
      res.writeHead(404);
      return res.end("Not Found");
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify(data, null, 2));
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: err.toString() }));
  }
});

// ===== START =====
const PORT = 3000;
server.listen(PORT, () => {
  console.log("✅ API chạy:");
  console.log("👉 /api/tx   (bàn thường)");
  console.log("👉 /api/md5  (bàn md5)");
});5)");
});