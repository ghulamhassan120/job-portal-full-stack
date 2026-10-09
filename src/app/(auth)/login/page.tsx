"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { UserRound, Lock, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { loginUserAction } from "@/features/auth/server/auth.action";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserData, loginUserSchema } from "@/features/auth/server/auth.schema";
const LoginPage = () => {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm({
      resolver:zodResolver(loginUserSchema)
    })

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async(data:loginUserData) => {
  
    const result=await loginUserAction(data)
     if (result.status==="SUCCESS") {
      toast.success(result.message)
    }else{
      toast.error(result.message)
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md rounded-xl border border-gray-200 shadow-sm">
        <CardHeader className="text-center pb-5">
          {/* Icon */}
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-950">
            <UserRound className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            Join Our Job Portal
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create your account to get started
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  {...register("email")}
                  className={`pl-9 pr-10 ${errors.email?"border-destructive":""}`}
                
                />
              </div>
                 {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  {...register("password")}
                  placeholder="Create a strong password"
                  className={`pl-9 pr-10 ${errors.password?"border-destructive":""}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
                 {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="mt-2 w-full bg-gray-950 hover:bg-gray-950"
            >
              Create Account
            </Button>
          </CardContent>

          <CardFooter className="justify-center pt-0">
            <p className="text-sm text-gray-500">
              Create an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-gray-950 hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
