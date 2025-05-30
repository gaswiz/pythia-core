"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">P.Y.T.H.I.A.</h2>
            <p className="max-w-xs mt-4 text-sm text-gray-400">
              Predict Your Trends, Harnessing Intelligent Analytics — an open initiative by Konstantinos Panagiotaropoulos.
            </p>
            <div className="flex mt-6 space-x-4">
              <a
                className="hover:opacity-75"
                href="https://github.com/gaswiz"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                      0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608
                      1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338
                      -2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65
                      0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337
                      1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688
                      0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747
                      0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                className="hover:opacity-75"
                href="https://twitter.com/gaswiz"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253..." />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3 lg:grid-cols-4">
            <div>
              <p className="font-medium text-white">Project</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-400">
                <a href="#">About</a>
                <a href="https://github.com/gaswiz/pythia">GitHub</a>
                <a href="#">Documentation</a>
              </nav>
            </div>
            <div>
              <p className="font-medium text-white">Resources</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-400">
                <a href="#">Research</a>
                <a href="#">Papers</a>
                <a href="#">Open Source</a>
              </nav>
            </div>
            <div>
              <p className="font-medium text-white">Contact</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-400">
                <a href="mailto:konstantinos@pandectes.io">Email</a>
                <a href="#">LinkedIn</a>
              </nav>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} Konstantinos Panagiotaropoulos — All rights reserved.
        </p>
      </div>
    </footer>