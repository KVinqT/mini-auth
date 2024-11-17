import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return new Response("Hello World");
}

export async function POST(req: NextRequest) {
  console.log("Inside a request handler");

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Only POST request is allowed" }),
      {
        status: 405,
      }
    );
  }
  const { token } = await req.json();
  const secretKey: string | undefined =
    "6LdY5oAqAAAAAOVc3zXHzzMaRLTcb7nJ_8O8Cvx4";

  if (!token) {
    return new Response(JSON.stringify({ message: "Token is not found" }), {
      status: 405,
    });
  }
  try {
    console.log("Token", token);
    console.log("Secret Key", secretKey);

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );
    const data = await response.json();
    console.log("data from server", data);
    return new Response(JSON.stringify(data), {
      status: 200,
    });
    // if (response.data.success) {
    //   return new Response(JSON.stringify({ message: "Success" }), {
    //     status: 200,
    //   });
    // } else {
    //   return new Response(JSON.stringify({ message: "Failed to verify" }), {
    //     status: 405,
    //   });
    // }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
