import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { CheckSquareIcon, EyeIcon, EyeOffIcon, ChromeIcon } from "lucide-react";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in a real app, you'd validate against a backend
    if (email && password) {
      navigate("/home");
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login - in a real app, you'd integrate with Google OAuth
    const googleUser = {
      name: "Google User",
      email: "user@gmail.com",
      joinDate: new Date().toLocaleDateString()
    };
    localStorage.setItem('userData', JSON.stringify(googleUser));
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckSquareIcon className="w-8 h-8 text-[#df8e8f]" />
            <CardTitle className="text-2xl font-semibold text-gray-800">
              DoTask
            </CardTitle>
          </div>
          <p className="text-gray-600">Welcome back! Please sign in to continue.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-gray-200 focus:border-[#df8e8f] focus:ring-[#df8e8f]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12 border-gray-200 focus:border-[#df8e8f] focus:ring-[#df8e8f]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-[#df8e8f] hover:bg-[#c97a7b] text-white font-medium text-lg rounded-lg transition-colors"
            >
              Sign In
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-lg"
            >
              <ChromeIcon className="w-5 h-5 mr-2 text-blue-500" />
              Continue with Google
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/signup")}
                className="text-[#df8e8f] hover:text-[#c97a7b] font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};