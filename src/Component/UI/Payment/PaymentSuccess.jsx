import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import "./Payment.css"; // Import the CSS file for styling

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const isService = searchParams.get("service") === "true"; // Check if service is true
    const [message, setMessage] = useState("Processing payment...");
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0); // Progress state for the progress bar
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        let requestSent = false; // Prevent multiple requests
    
        const updatePaymentStatus = async () => {
            if (!sessionId || requestSent) return;
            requestSent = true; // Mark request as sent
    
            console.log("Updating payment status...");
    
            const endpoint = isService ? "service" : "user";
            const apiUrl = `${import.meta.env.VITE_API_URL}${endpoint}/update-payment/${sessionId}`;
    
            try {
                // Simulate progress loading
                let progressValue = 0;
                const progressInterval = setInterval(() => {
                    progressValue += 10;
                    if (progressValue <= 90) {
                        setProgress(progressValue);
                    } else {
                        clearInterval(progressInterval);
                    }
                }, 300);

                const response = await fetch(apiUrl, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ payment_status: 1, status: 1 }),
                });

                clearInterval(progressInterval); // Stop progress updates once request is done

                if (response.ok && isMounted) {
                    setProgress(100);
                    setShowModal(true);
                    setMessage("Payment Successful! 🎉");
    
                    console.log("Downloading PDF...");
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "receipt.pdf";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                } else if (isMounted) {
                    const data = await response.json();
                    setShowModal(true);
                    setMessage(data.error || "Payment failed. Please try again.");
                }
            } catch (error) {
                if (isMounted) {
                    setShowModal(true);
                    setMessage("Error updating payment. Please check your connection.");
                }
            }
        };
    
        updatePaymentStatus();
    
        return () => {
            isMounted = false;
        };
    }, [sessionId, isService]);

    const handleNavigation = () => {
        navigate("/home");
    };

    return (
        <div className="payment-success-container">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="processing-message">{message}</p>
            <Modal message={message} show={showModal} onConfirm={handleNavigation} onCancel={handleNavigation} />
        </div>
    );
};

export default PaymentSuccess;
