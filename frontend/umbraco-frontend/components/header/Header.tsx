import React from "react";
import { Navigation } from "@/components/navigation/Navigation";

export function Header() {
    return (
        <header>
            <div className="logo">My Site Logo</div>
            <Navigation />
        </header>
    );
}