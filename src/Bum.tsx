export default function Bum() {
    return (
      
      <div
      className="h-45 flex justify-center items-center" 
>
        <button
          onClick={() => window.open("https://www.google.com", "_blank")}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}>
          request to join 
        </button>
      </div>
    );
  }