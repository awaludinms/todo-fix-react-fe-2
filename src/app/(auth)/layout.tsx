import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <div className="flex justify-center pt-15 bg-base-200 h-screen">
                {children}
            </div>
        </section>
    )
}