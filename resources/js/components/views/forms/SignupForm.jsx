import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/components/services/authService";

export function SignupForm({ className, ...props }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError({ message: "Passwords Do Not Match!" });
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            navigate("/login");
        } catch (err) {
            setError(
                err.response?.data.errors || {
                    message: err.response?.data.message,
                }
            );
        }
    };
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>
                        Enter your personal information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Name</Label>
                                <Input
                                    name="name"
                                    type="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="confirm_password">
                                        Confirm Password
                                    </Label>
                                </div>

                                <Input
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    type="password"
                                    required
                                />
                                {error && (
                                    <p className="text-red-500 text-sm">
                                        {error.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Signup
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a
                                href="/login"
                                className="underline underline-offset-4"
                            >
                                Login
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
