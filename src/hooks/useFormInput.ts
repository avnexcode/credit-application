import {
  InputAvatar as BaseInputAvatar,
  InputCurrency as BaseInputCurrency,
  InputImage as BaseInputImage,
  InputPassword as BaseInputPassword,
  InputStringNumber as BaseInputStringNumber,
  InputText as BaseInputText,
} from "@/components/forms";
import { useFormContext, type FieldValues } from "react-hook-form";

export const useFormInput = <T extends FieldValues>() => {
  useFormContext<T>();

  return {
    InputText: BaseInputText<T>,
    InputPassword: BaseInputPassword<T>,
    InputCurrency: BaseInputCurrency<T>,
    InputImage: BaseInputImage<T>,
    InputAvatar: BaseInputAvatar<T>,
    InputStringNumber: BaseInputStringNumber<T>,
  };
};
