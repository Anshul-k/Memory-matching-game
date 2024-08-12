import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto w-full text-center p-4 bg-gray-600 text-gray-200">
      <p className="font-sans text-lg">
        <a href="mailto:anshul.kasana98@gmail.com">anshul.kasana98@gmail.com</a>
        <span className="ml-1">&copy;</span>
        <span className="ml-1">{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;

