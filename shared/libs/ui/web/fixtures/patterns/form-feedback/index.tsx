import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@libs/web-components";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/**
 * Pattern: form feedback — where the message goes when a field is wrong.
 * The form glue (react-hook-form) is not UI; the label, description and
 * message placement is. Errors are set on mount so the feedback is visible.
 */
type Values = { name: string; email: string; agree: boolean };

export default function FormFeedbackFixture() {
  const form = useForm<Values>({ defaultValues: { name: "Daniel", email: "not-an-email", agree: false } });
  useEffect(() => {
    form.setError("email", { message: "Enter a valid email address" });
    form.setError("agree", { message: "You must accept the terms" });
  }, [form]);
  return (
    <FixtureBody>
      <FixtureContainer>
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(() => {})}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormDescription>As it appears on your documents.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input {...field} status="error" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="agree" render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} /></FormControl>
                  <FormLabel>I accept the terms</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <div className="flex gap-2">
              <Button type="submit" emphasis="primary">Save</Button>
              <Button type="button" emphasis="secondary">Cancel</Button>
            </div>
          </form>
        </Form>
      </FixtureContainer>
    </FixtureBody>
  );
}
