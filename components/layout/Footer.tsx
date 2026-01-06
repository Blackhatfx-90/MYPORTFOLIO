import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-8 bg-black border-t border-white/10">
            <div className="container px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Dev Portfolio. All rights reserved.
                </div>

                <div className="flex items-center gap-6">
                    <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                        <Twitter className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                        <Mail className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
