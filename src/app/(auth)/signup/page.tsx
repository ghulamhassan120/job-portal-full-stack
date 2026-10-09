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
import { toast } from "sonner";
import { registrationAction } from "@/features/auth/server/auth.action";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterUserWithConfirmData,
  registerUserWithConfirmSchema,
} from "@/features/auth/server/auth.schema";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserWithConfirmSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router=useRouter()

  const onSubmit = async (data: RegisterUserWithConfirmData) => {
    const result = await registrationAction(data);

    if(result.success==="SUCCESS"){
      if(data.role==="employee")  router.push('/employee-dashboard')
      else router.push('/dashboard/applicant')
    }
    if (result.success === "SUCCESS") {
      toast.success(result.message);
    } else {
      toast.error(result.message);
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
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>

              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Enter your full name"
                  required
                  className={`pl-9 ${errors.name ? "border-destructive" : ""}`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>

              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="username"
                  type="text"
                  {...register("userName")}
                  placeholder="Choose a username"
                  required
                  className={`pl-9 ${
                    errors.userName ? "border-destructive" : ""
                  }`}
                />
              </div>
              {errors.userName && (
                <p className="text-sm text-destructive">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  required
                  className={`pl-9 ${errors.email ? "border-destructive" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">I am a *</Label>
              <Controller
                name="role"
                control={control}
                render={({field}) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="role" className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="applicant">Job Applicant</SelectItem>

                      <SelectItem value="employee">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              ></Controller>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a strong password"
                  className={`pl-9 pr-10 ${
                    errors.password ? "border-destructive" : ""
                  }`}
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm your password"
                  className={`pl-9 pr-10 ${
                    errors.confirmPassword ? "border-destructive" : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
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
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-gray-950 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
