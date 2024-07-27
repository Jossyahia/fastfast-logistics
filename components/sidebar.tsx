import Link from 'next/link'
//import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils' // Ensure you import `cn` from the appropriate file
import { Logo } from '@/components/logo'
import ModeToggle from './ModeToggle'
//import { useCurrentUser } from './useCurrentUser' // Adjust the import according to your project structure
import { sidebarPages, socials } from '@/components/constant' // Adjust the import according to your project structure

type SidebarProps = {
  closeSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {

  const Logout = () => {
    logo()
  }

  return (
    <div className="flex flex-col justify-between pl-2">
      <Link href="/" onClick={closeSidebar}>
        <Logo />
      </Link>
      <div className="flex pt-4">
        <ModeToggle />
      </div>
      <div className="pt-3">
        <div className="space-y-4">
          <div className="ml-2">
            <h1 className="text-xl font-semibold">Main</h1>
            {sidebarPages.map((page) => (
              <Link
                key={page.link}
                href={page.link}
                className={cn(
                  'group flex py-1.5 w-full justify-start font-light cursor-pointer'
                )}
                onClick={closeSidebar}
              >
                <div className="flex w-full">
                  <p className="font-normal text-foreground/75">{page.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="ml-2">
            <h1 className="text-xl font-semibold">Socials</h1>
            {socials.map((page) => (
              <Link
                key={page.link}
                href={page.link}
                className={cn(
                  'group flex w-full justify-start font-light cursor-pointer py-1.5'
                )}
                onClick={closeSidebar}
              >
                <div className="flex w-full">
                  <p className="font-normal text-foreground/75">{page.title}</p>
                </div>
              </Link>
            ))}
          </div>
          {session ? (
            <Link
              href="/login"
              className="group flex py-2 w-full justify-start cursor-pointer rounded ml-2 font-bold text-xl"
              onClick={() => {
                Logout()
                closeSidebar && closeSidebar()
              }}
            >
              Logout
            </Link>
          ) : (
            <Link
              href="/login"
              className="group flex pt-2 w-full justify-start font-light cursor-pointer"
              onClick={closeSidebar}
            >
              <div className="flex w-full ml-2 pb-3">
                <p className="font-semibold ">Sign Up</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
