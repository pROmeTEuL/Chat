import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

import { api } from "~/utils/api";

import { Button } from "~/components/ui/button";
import { Post } from "~/server/api/routers/post";
import { useState } from "react";
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter();
    return <main>
        <Button variant="default" onClick={() => router.push("/")}> Back </Button>
    </main>
}