"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { loginAction } from "@/app/action";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen flex-col gap-3">
      <Card className="p-3 w-[350px]">
        <CardHeader className="pb-1">
          <CardTitle className="text-xl">Admin Login</CardTitle>
          <CardDescription>
            Access your dashboard to manage users, settings, and analytics.
            Please log in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

// Define the validation schema with Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const payload = {
        email: data.email,
        pass: data.password,
      };
      const isValid = await loginAction(payload);

      if (isValid) {
        await signIn("credentials", { ...payload });
        return;
      }

      throw new Error("Admin credentials dose not match");
    } catch (error: any) {
      toast({ title: `${error}` });
    }
  };

  return (
    <div className="p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isSubmitting ? (
            <Button type="submit">Proceed to Admin</Button>
          ) : (
            <Loader2 className="animate-spin text-primary" />
          )}
        </form>
      </Form>
    </div>
  );
}
