import { UseFormSetError } from "react-hook-form";
import { ValidationServerError } from "./server-validation.dto";

export function bindApiErrorToRHF(errors: ValidationServerError, setHookFormError: UseFormSetError<any>) {
    (errors ?? []).forEach((error) => {
        Object.keys(error.constraints ?? {}).forEach(constraint => {
            let message = error.constraints && error.constraints[constraint];
            console.debug("set error", error.property, message)
            setHookFormError(error.property, {
                message: message,
            })
        });
    })
}