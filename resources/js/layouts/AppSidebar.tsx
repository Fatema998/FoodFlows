import { Link, usePage } from '@inertiajs/react'; // ✅ usePage imported
import {
    BoxesIcon,
    CalendarHeartIcon,
    ChevronDownIcon,
    FlipHorizontal2,
    FlipHorizontal2Icon,
    GridIcon,
    ListIcon,
    PackageIcon,
    PieChartIcon,
    Plug2Icon,
    TableIcon,
    UserCircle2Icon,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSidebar } from '../context/SidebarContext';
import SidebarWidget from './SidebarWidget';

import { index as brandIndex } from '@/routes/admin/brand';
import { index as categoryIndex } from '@/routes/admin/category';
import { index as colorIndex } from '@/routes/admin/color';
import { index as productIndex } from '@/routes/admin/product';

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
    {
        icon: <GridIcon />,
        name: 'Dashboard',
        subItems: [{ name: 'Ecommerce', path: '/dashboard', pro: false }],
    },
    {
        icon: <GridIcon />,
        name: 'Brand',
        subItems: [
            { name: 'All Brand', path: brandIndex().url, pro: false },
            { name: 'Add Brand', path: brandIndex().url, pro: false },
        ],
    },
    {
        icon: <GridIcon />,
        name: 'Category',
        subItems: [
            { name: 'All Category', path: categoryIndex().url, pro: false },
            { name: 'Add Category', path: categoryIndex().url, pro: false },
            { name: 'Add Sub Category', path: categoryIndex().url, pro: false },
        ],
    },
    {
        icon: <GridIcon />,
        name: 'Color',
        subItems: [
            { name: 'All Color', path: colorIndex().url, pro: false },
            { name: 'Add Color', path: colorIndex().url, pro: false },
        ],
    },
    {
        icon: <GridIcon />,
        name: 'Product',
        subItems: [
            { name: 'All Product', path: productIndex().url, pro: false },
            { name: 'Add Product', path: productIndex().url, pro: false },
        ],
    },
    {
        icon: <CalendarHeartIcon />,
        name: 'Calendar',
        path: '/calendar',
    },
    {
        icon: <UserCircle2Icon />,
        name: 'User Profile',
        path: '/profile',
    },
    {
        name: 'Forms',
        icon: <ListIcon />,
        subItems: [
            { name: 'Form Elements', path: '/form-elements', pro: false },
        ],
    },
    {
        name: 'Tables',
        icon: <TableIcon />,
        subItems: [{ name: 'Basic Tables', path: '/basic-tables', pro: false }],
    },
    {
        name: 'Pages',
        icon: <PackageIcon />,
        subItems: [
            { name: 'Blank Page', path: '/blank', pro: false },
            { name: '404 Error', path: '/error-404', pro: false },
        ],
    },
];

const othersItems: NavItem[] = [
    {
        icon: <PieChartIcon />,
        name: 'Charts',
        subItems: [
            { name: 'Line Chart', path: '/line-chart', pro: false },
            { name: 'Bar Chart', path: '/bar-chart', pro: false },
        ],
    },
    {
        icon: <BoxesIcon />,
        name: 'UI Elements',
        subItems: [
            { name: 'Alerts', path: '/alerts', pro: false },
            { name: 'Avatar', path: '/avatars', pro: false },
            { name: 'Badge', path: '/badge', pro: false },
            { name: 'Buttons', path: '/buttons', pro: false },
            { name: 'Images', path: '/images', pro: false },
            { name: 'Videos', path: '/videos', pro: false },
        ],
    },
    {
        icon: <Plug2Icon />,
        name: 'Authentication',
        subItems: [
            { name: 'Sign In', path: '/signin', pro: false },
            { name: 'Sign Up', path: '/signup', pro: false },
        ],
    },
];

const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const { url } = usePage(); // ✅ Inertia current URL

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: 'main' | 'others';
        index: number;
    } | null>(null);

    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {},
    );
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // ✅ Active route check using Inertia URL
    const isActive = useCallback((path: string) => url === path, [url]);

    useEffect(() => {
        let submenuMatched = false;
        ['main', 'others'].forEach((menuType) => {
            const items = menuType === 'main' ? navItems : othersItems;
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: menuType as 'main' | 'others',
                                index,
                            });
                            submenuMatched = true;
                        }
                    });
                }
            });
        });

        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [url, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (
        index: number,
        menuType: 'main' | 'others',
    ) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.type === menuType &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { type: menuType, index };
        });
    };

    const renderMenuItems = (items: NavItem[], menuType: 'main' | 'others') => (
        <ul className="flex flex-col gap-4">
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`group menu-item ${
                                openSubmenu?.type === menuType &&
                                openSubmenu?.index === index
                                    ? 'menu-item-active'
                                    : 'menu-item-inactive'
                            } cursor-pointer ${
                                !isExpanded && !isHovered
                                    ? 'lg:justify-center'
                                    : 'lg:justify-start'
                            }`}
                        >
                            <span
                                className={`menu-item-icon-size ${
                                    openSubmenu?.type === menuType &&
                                    openSubmenu?.index === index
                                        ? 'menu-item-icon-active'
                                        : 'menu-item-icon-inactive'
                                }`}
                            >
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className="menu-item-text">
                                    {nav.name}
                                </span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                                        openSubmenu?.type === menuType &&
                                        openSubmenu?.index === index
                                            ? 'rotate-180 text-brand-500'
                                            : ''
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                href={nav.path} // ✅ use href instead of to
                                className={`group menu-item ${
                                    isActive(nav.path)
                                        ? 'menu-item-active'
                                        : 'menu-item-inactive'
                                }`}
                            >
                                <span
                                    className={`menu-item-icon-size ${
                                        isActive(nav.path)
                                            ? 'menu-item-icon-active'
                                            : 'menu-item-icon-inactive'
                                    }`}
                                >
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="menu-item-text">
                                        {nav.name}
                                    </span>
                                )}
                            </Link>
                        )
                    )}
                    {nav.subItems &&
                        (isExpanded || isHovered || isMobileOpen) && (
                            <div
                                ref={(el) => {
                                    subMenuRefs.current[
                                        `${menuType}-${index}`
                                    ] = el;
                                }}
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                    height:
                                        openSubmenu?.type === menuType &&
                                        openSubmenu?.index === index
                                            ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                            : '0px',
                                }}
                            >
                                <ul className="mt-2 ml-9 space-y-1">
                                    {nav.subItems.map((subItem) => (
                                        <li key={subItem.name}>
                                            <Link
                                                href={subItem.path}
                                                className={`menu-dropdown-item ${
                                                    isActive(subItem.path)
                                                        ? 'menu-dropdown-item-active'
                                                        : 'menu-dropdown-item-inactive'
                                                }`}
                                            >
                                                {subItem.name}
                                                <span className="ml-auto flex items-center gap-1">
                                                    {subItem.new && (
                                                        <span
                                                            className={`ml-auto ${
                                                                isActive(
                                                                    subItem.path,
                                                                )
                                                                    ? 'menu-dropdown-badge-active'
                                                                    : 'menu-dropdown-badge-inactive'
                                                            } menu-dropdown-badge`}
                                                        >
                                                            new
                                                        </span>
                                                    )}
                                                    {subItem.pro && (
                                                        <span
                                                            className={`ml-auto ${
                                                                isActive(
                                                                    subItem.path,
                                                                )
                                                                    ? 'menu-dropdown-badge-active'
                                                                    : 'menu-dropdown-badge-inactive'
                                                            } menu-dropdown-badge`}
                                                        >
                                                            pro
                                                        </span>
                                                    )}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                </li>
            ))}
        </ul>
    );

    return (
        <aside
            className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 dark:border-gray-800 dark:bg-gray-900 ${
                isExpanded || isMobileOpen
                    ? 'w-[290px]'
                    : isHovered
                      ? 'w-[290px]'
                      : 'w-[90px]'
            } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`flex py-8 ${
                    !isExpanded && !isHovered
                        ? 'lg:justify-center'
                        : 'justify-start'
                }`}
            >
                <Link href="/">
                    {' '}
                    {/* ✅ fixed to use href */}
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
                            <img
                                className="dark:hidden"
                                src="/images/logo/logo.svg"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                            <img
                                className="hidden dark:block"
                                src="/images/logo/logo-dark.svg"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                        </>
                    ) : (
                        <img
                            src="/images/logo/logo-icon.svg"
                            alt="Logo"
                            width={32}
                            height={32}
                        />
                    )}
                </Link>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2
                                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                                    !isExpanded && !isHovered
                                        ? 'lg:justify-center'
                                        : 'justify-start'
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    'Menu'
                                ) : (
                                    <FlipHorizontal2 className="size-6" />
                                )}
                            </h2>
                            {renderMenuItems(navItems, 'main')}
                        </div>
                        <div className="">
                            <h2
                                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                                    !isExpanded && !isHovered
                                        ? 'lg:justify-center'
                                        : 'justify-start'
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    'Others'
                                ) : (
                                    <FlipHorizontal2Icon />
                                )}
                            </h2>
                            {renderMenuItems(othersItems, 'others')}
                        </div>
                    </div>
                </nav>
                {isExpanded || isHovered || isMobileOpen ? (
                    <SidebarWidget />
                ) : null}
            </div>
        </aside>
    );
};

export default AppSidebar;
