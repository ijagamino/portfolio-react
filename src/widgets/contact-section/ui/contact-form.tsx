import { cn } from "@/shared/lib/cn";
import Button from "@/shared/ui/button";
import Field from "@/shared/ui/field";
import Input from "@/shared/ui/input";
import Label from "@/shared/ui/label";
import Textarea from "@/shared/ui/textarea";
import { useForm, ValidationError } from "@formspree/react";
import type { ComponentProps } from "react";

export default function ContactForm({ ...props }: ComponentProps<"form">) {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID
  const [state, handleSubmit] = useForm(formId)
  const disabled = state.submitting || state.succeeded

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      {...props}
    >
      <Field className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" type="text" required />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
        />
      </Field>

      <Field className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea name="message" id="message" rows={8} required />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </Field>

      <Button className={cn("mx-auto", disabled && "pointer-events-none")} disabled={disabled}>
        {state.submitting ? "Sending message..." : state.succeeded ? "Message sent!" : "Send Message"}
      </Button>
    </form >
  )
}
