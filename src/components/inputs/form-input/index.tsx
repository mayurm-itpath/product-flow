import { Input } from "@/components/ui/input";

interface FormInputProps {
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

const FormInput = ({ type = "text", placeholder = "", onChange, ...rest }: FormInputProps) => {
  return (
    <>
      <Input type={type} placeholder={placeholder} onChange={onChange} {...rest} />
    </>
  );
};

export default FormInput;
