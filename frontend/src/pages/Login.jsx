// UTENMNZOegIow1rr

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

const Login = () => {

    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" })
    const [loginInput, setLoginInput] = useState({ email: "", password: "" })

    const changeInputHandler = (e, type) => {
        const name = e.target.name
        const value = e.target.value

        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value })
        }
        else {
            setLoginInput({ ...loginInput, [name]: value })
        }
    }

    const handleRagistration = (type) => {
        const inputData = type === "signup" ? signupInput : loginInput
        console.log(inputData)
    }

    return (
        <div className="flex items-center w-full justify-center">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Fill all the informations and click on the signup button to create a new account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">

                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text" id="name"
                                    name="name"
                                    value={signupInput.name}
                                    placeholder="Sourav Roy" required
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="username">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={signupInput.email}
                                    placeholder="destroyer@gmail.com" required
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="username">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={signupInput.password}
                                    placeholder=""
                                    required
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                />
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button onClick={()=>handleRagistration("signup")}>Signup</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Fill in all the fields to log in. After signing up, you will automatically be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="username">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={loginInput.email}
                                    placeholder="destroyer@gmail.com"
                                    required
                                    onChange={(e) => changeInputHandler(e, "login")}
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="username">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={loginInput.password}
                                    placeholder=""
                                    required
                                    onChange={(e) => changeInputHandler(e, "login")}
                                />
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button onClick={()=>handleRagistration("login")}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login