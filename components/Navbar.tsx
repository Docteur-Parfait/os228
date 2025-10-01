"use client";

import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
	const { theme, toggleTheme } = useTheme();

	return (
		<nav className="sticky md:top-4 top-0 z-50 w-full ">
			<div className=" max-w-6xl backdrop-blur border border-border md:rounded-2xl px-4 mx-auto flex h-16 items-center justify-between">
				{/* Logo et nom */}
				<div className="flex items-center">
					<Image
						src="/tg.png"
						alt="Drapeau du Togo"
						width={24}
						height={24}
						className=" object-contain h-full w-auto mr-2"
					/>
					<h1 className="text-xl font-bold text-foreground">OS
						<span className="text-[#FB2C36]">2</span>
						<span className="text-[#16A34A]">2</span>
						<span className="text-[#F0B100]">8</span></h1>
				</div>

				{/* Navigation items */}
				<div className="flex items-center space-x-4">
					{/* Bouton Contribute avec logo GitHub */}
					<a
						href="https://github.com/Docteur-Parfait/os228"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
					>
						<svg
							className="w-4 h-4"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clipRule="evenodd"
							/>
						</svg>
						Contribuer
					</a>

					{/* Switch de thème */}
					<button
						onClick={toggleTheme}
						className="relative inline-flex h-6 w-11 items-center rounded-full bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
					>
						<span
							className={`${theme === "dark" ? "translate-x-6" : "translate-x-1"
								} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
						/>
					</button>
				</div>
			</div>
		</nav>
	);
}
