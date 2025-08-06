import { ReactNode } from "react";
import { useSmoothNavigate } from "@/hooks/useSmoothNavigate";

interface SmartLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const SmartLink = ({ to, children, className }: SmartLinkProps) => {
  const navigate = useSmoothNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SmartLink;
