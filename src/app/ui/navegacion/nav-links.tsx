import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    EyeIcon,
    BoltIcon
    
  } from '@heroicons/react/24/outline';
  
  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  const links = [
    { name: 'Home', href: '/', icon: HomeIcon },
    {
      name: 'Data',
      href: '/data',
      icon: DocumentDuplicateIcon,
    },
    { name: 'Simulation', href: '/simulation', icon: EyeIcon }, 
    { name: 'Impact', href: '/impact', icon: UserGroupIcon }, 
    { name: 'Geomagnetic Storm', href: '/storm', icon: BoltIcon },
    { name: 'Team', href: '/team', icon: UserGroupIcon },
    { name: 'Users', href: '/users', icon: UserGroupIcon },
  ];
  
  export default function NavLinks() {
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <LinkIcon className="w-4 h-4" /> {/* Ajusté el tamaño del ícono aquí */}
              <p className="hidden md:block">{link.name}</p>
            </a>
          );
        })}
      </>
    );
  }
  