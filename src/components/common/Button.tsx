import { ButtonHTMLAttributes } from "react";

const Button = ({ children }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="bg-primary-blue text-white px-[23px] py-3 rounded-lg text-[16px] font-semibold hover:bg-blue-500">
      {children}
    </button>
  );
};

export default Button;
