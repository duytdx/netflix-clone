import { useState } from "react";
import { Link } from "react-router-dom";

export default function Netflix404Page() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white py-12 px-4">
      {/* Netflix Logo */}
      <div className="mb-12">
        <img src="/images/logo.png" alt="logo" className="w-32 h-12" />
      </div>

      {/* Error Content */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-8xl font-bold text-red-600 mb-8">404</h1>
        <h2 className="text-4xl font-bold mb-4">Trang này không tồn tại</h2>
        <p className="text-lg text-gray-400 mb-12 px-4">
          Có vẻ như nội dung bạn đang tìm kiếm đã bị di chuyển hoặc không còn
          tồn tại. Hãy kiểm tra lại địa chỉ URL hoặc quay lại trang chủ để tiếp
          tục khám phá.
        </p>

        {/* Return Home Button */}
        <Link to="/" className="w-full flex justify-center">
          <button
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition-colors duration-300 ${
              isHovered ? "shadow-lg" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Quay lại trang chủ
          </button>
        </Link>
      </div>
    </div>
  );
}
