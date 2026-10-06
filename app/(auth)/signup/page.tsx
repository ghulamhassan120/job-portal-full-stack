"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRound, Lock, Mail, Eye, EyeOff } from "lucide-react";
type Role = "applicant" | "employee";
interface SignupPageData {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "applicant" | "empolyee";
}
const SignupPage = () => {
  const [formData, setformData] = useState<SignupPageData>({
    name : "",
    userName : "",
    email : "",
    password : "",
    confirmPassword : "",
    role: "applicant",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange=(name:string,value:string)=>{
    setformData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  console.log(formData);
  
  return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md rounded-xl border border-gray-200 shadow-sm">
        <CardHeader className="text-center pb-5">
          {/* Icon */}
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
            <UserRound className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            Join Our Job Portal
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create your account to get started
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>

            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
                value={formData.name}
                className={`pl-9`}
                onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                  handleInputChange("name",e.target.value)
                }}
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username *</Label>

            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                required
                value={formData.userName}
                className="pl-9"
                 onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                  handleInputChange("userName",e.target.value)
                }}
              />
            </div>
          </div>

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
                value={formData.userName}
                className="pl-9"
                 onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                  handleInputChange("email",e.target.value)
                }}
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">I am a *</Label>

            <Select defaultValue="applicant" 
            value={formData.role}
          onValueChange={(value) => {
    handleInputChange("role", value as Role);
  }}
            >
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="applicant">
                  Job Applicant
                </SelectItem>

                <SelectItem value="employer">
                  Employer
                </SelectItem>
              </SelectContent>
            </Select>
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
                value={formData.password}
                placeholder="Create a strong password"
                className="pl-9 pr-10"
                   onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                  handleInputChange("password",e.target.value)
                }}
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
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                  required
                value={formData.confirmPassword}
                placeholder="Confirm your password"
                className="pl-9 pr-10"
                   onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                  handleInputChange("confirmPassword",e.target.value)
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
          >
            Create Account
          </Button>
        </CardContent>

        <CardFooter className="justify-center pt-0">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign in here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
};

export default SignupPage;
