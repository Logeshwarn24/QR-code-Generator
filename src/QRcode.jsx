import { useState } from "react"

const QRcode = () => {
    const [img,  setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("https://youtube.com.in/");
    const [qrSize, setQrSize] = useState([])
    async function generateQR() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url)
        } catch (error) {
            console.error("Error finding some problem", error)
        } finally{
            setLoading(false)
        }
    }
    function downloadQR() {
        fetch(img)
        .then((response) => response.blob())
        .then((blob)=> {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "YourQrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }) .catch((error) => {
            console.log("Error generation QR code", error)
        });
    }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>please wait...</p>}
        {img && <img src={img} className="qr-code-image" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
            Data for QR code:
        </label>
        <input type="text" id="dataInput" value={qrData} placeholder="Enter data for Qr code"
        onChange={(e)=> setQrData(e.target.value)}/>
         <label htmlFor="sizeInput" className="input-label">
            Image size (e.g., 150):
        </label>
        <input type="text" id="sizeInput" value={qrSize} placeholder="Enter Image size"
        onChange={(e) => setQrSize(e.target.value)}/>
        <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className="download-button" onClick={downloadQR}>Download QR Code</button>
        <p className="footer">Designed By LogeshWaran</p>
      </div>
    </div>
  )
}

export default QRcode
