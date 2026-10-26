import { Toaster as Sonner, toast, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      {...props}
    />
  );
};

// `toast` is the imperative API — toast.success(msg), toast.error(msg) — re-exported so callers never import the vendor
export { Toaster, toast };
