"use client"

import { ConnectKitButton } from "connectkit";
import Image from "next/image";

export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!

      <ConnectKitButton />
    </h1>
  );
}
