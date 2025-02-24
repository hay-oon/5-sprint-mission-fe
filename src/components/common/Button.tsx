import { ButtonHTMLAttributes } from "react";

const Button = ({ children }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="bg-[#3692FF] text-white px-[23px] py-3 rounded-lg text-sm font-semibold hover:bg-[#3692FF]/80">
      {children}
    </button>
  );
};

export default Button;
