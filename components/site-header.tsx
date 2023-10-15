'use client'

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { signIn, signOut, useSession } from "next-auth/react"

export function SiteHeader(): JSX.Element {
  const session = useSession()
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
              {!session.data && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => signIn()}
                >
                  Sign in
                </button>
              )}
              {session.data && (
                <>
                  <Link href="/profile" className="bg-red-500 p-2 rounded-md">
                      <Icons.user className="h-5 w-5" />
                  </Link>
                  <button
                    className="text-white px-4 py-2 rounded-md"
                    onClick={() => signOut()}
                  >
                    <Icons.logout className="h-5 w-5" />
                  </button>
                </>
              )}

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
