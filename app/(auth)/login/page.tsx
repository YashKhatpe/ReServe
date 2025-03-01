"use client";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Login successful!",
        description: "You are now logged in.",
      });

      // Check if user is donor or NGO and redirect accordingly
      const { data: donorData } = await supabase
        .from('donor')
        .select('id')
        .eq('email', data.email)
        .single();

      if (donorData) {
        router.push('/donor-dashboard');
      } else {
        const { data: ngoData } = await supabase
          .from('ngo')
          .select('id')
          .eq('email', data.email)
          .single();

        if (ngoData) {
          router.push('/ngo/dashboard');
        } else {
          router.push('/');
        }
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (

    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      {/* <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-emerald-600" />
            <span>Donation Hub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header> */}

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-4xl w-full">
          <div className="w-full md:w-1/2 hidden md:block">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="https://cdn.usegalileo.ai/sdxl10/3d290948-e8e2-4620-b69f-7e711ee6b381.png" 
                alt="Food donation" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h2 className="text-white text-2xl font-bold">Making a difference, one donation at a time</h2>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <Card className="border shadow-md">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your account to continue your mission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-emerald-600 font-medium hover:underline">
                      Register here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* <footer className="border-t py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-500">
            © 2025 Donation Hub. All rights reserved.
          </div>
        </div>
      </footer> */}
    </div>
  );
}