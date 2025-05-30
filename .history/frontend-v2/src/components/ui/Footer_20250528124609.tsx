import React from "react";
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-transparent text-white py-12 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-lg font-semibold text-white">About</h2>
          <p className="text-sm mt-4 text-gray-400">
            P.Y.T.H.I.A. is a predictive analytics platform focused on digital
            marketing campaign performance, built for marketers, analysts, and
            innovators.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">Resources</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition">Documentation</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">API Reference</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Support</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">Projects</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/gaswiz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition"
              >
                GitHub Profile
              </a>
            </li>
            <li><a href="#" className="hover:text-cyan-400 transition">Thesis Repository</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li className="flex items-center space-x-2">
              <IconMail className="w-4 h-4 text-cyan-400" />
              <span>konstantinos@pandectes.io</span>
            </li>
            <li className="flex items-center space-x-2">
              <IconBrandTwitter className="w-4 h-4 text-cyan-400" />
              <a
                href="https://twitter.com/gaswiz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                @gaswiz
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <IconBrandGithub className="w-4 h-4 text-cyan-400" />
              <a
                href="https://github.com/gaswiz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                github.com/gaswiz
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-white/10 pt-6">
        © {new Date().getFullYear()} P.Y.T.H.I.A. All rights reserved.
      </div>
    </footer>
  );
}
    