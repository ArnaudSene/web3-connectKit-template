"use client"

import { ConnectKitButton } from "connectkit";
import Helper from "@/components/Helper";

export default function Home() {
	return (
    	<div>
			<h1 className="text-3xl font-bold underline"></h1>
			<ConnectKitButton />
			<Helper />
		</div>
	);
}
