import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon } from "../icons";
import type { InputOTPProps } from "./types";

// OTPInputProps is a discriminated union (render vs children), which can't be
// extended by an interface. We pick the input-level props we forward and add ours.

function InputOTP({ position,
  emphasis,
  status,
  state,
  concept,
  className,
  containerClassName,
  length: lengthProp,
  maxLength: maxLengthProp,
  scale = "md",
  disabled = false,
  children,
  ...props
}: InputOTPProps) {
  const length = lengthProp ?? maxLengthProp ?? 6;
  return (
    <OTPInput
      element="field--otp"
      {...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position })}
      containerClassName={cn("flex items-center", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className, positionClasses(position))}
      maxLength={length}
      disabled={disabled}
      {...props}
    >
      {children ?? (
        <InputOTPGroup>
          {Array.from({ length }).map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      )}
    </OTPInput>
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center", className)} {...props} />;
}

function InputOTPSlot({ 
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      element="field--otp-slot"
      {...axisAttrs({ state: isActive ? "focus" : undefined })}
      data-active={isActive}
      className={cn(
        "relative flex items-center justify-center transition-all data-[active=true]:z-10",
        className,
      )}
      {...props}>
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div role="separator" element="surface--otp-separator" {...props}>
      <Icon name="remove" size="sm" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
