import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactMarkdown from "react-markdown"; // Import react-markdown

// AgroMaster React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

const PlanReport = () => {
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [reportData, setReportData] = useState("");

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nasa-space-app-backend.onrender.com/generate-plan-report"
      );
      const planReport = response.data.planReport;

      // Update chat messages with the generated report
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: "Generate farming plan report" },
        { sender: "assistant", text: planReport },
      ]);
      setReportData(planReport);
    } catch (error) {
      console.error("Error fetching plan report:", error);
      alert("Error generating plan report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("chat-box");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Farming-Plan-Report.pdf");
    });
  };

  return (
    <MKBox component="section" py={6} px={3}>
      <MKTypography variant="h4" mb={2} textAlign="center">
        Farming Assistant - Plan Report
      </MKTypography>

      <MKBox
        id="chat-box"
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 2,
          padding: "1.5rem",
          minHeight: "400px",
          overflowY: "auto",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
        }}
      >
        {chatMessages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.sender === "user" ? "right" : "left",
              marginBottom: "1rem",
            }}
          >
            <MKTypography
              variant="body1"
              sx={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: message.sender === "user" ? "#2196f3" : "#e0e0e0",
                color: message.sender === "user" ? "#fff" : "#000",
                borderRadius: "20px",
                maxWidth: "80%",
                wordWrap: "break-word",
              }}
            >
              {message.sender === "assistant" ? (
                <ReactMarkdown>{message.text}</ReactMarkdown> // Use react-markdown for assistant's message
              ) : (
                message.text
              )}
            </MKTypography>
          </div>
        ))}
      </MKBox>

      <MKBox textAlign="center">
        <MKButton
          onClick={handleGenerateReport}
          disabled={loading}
          color="info"
          sx={{ marginRight: "10px" }}
        >
          {loading ? "Loading..." : "Generate Report"}
        </MKButton>
        {reportData && (
          <MKButton onClick={handleDownloadPDF} color="success">
            Download PDF
          </MKButton>
        )}
      </MKBox>
    </MKBox>
  );
};

export default PlanReport;
