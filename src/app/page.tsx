"use client"
import checkLogin from "./lib/checklogin";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    checkLogin()
  }, [])
  
  return (
    <></>
  );
}
