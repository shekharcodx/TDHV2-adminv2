import { Box, Drawer, Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import {
  FaThLarge,
  FaUserFriends,
  FaStar,
  FaPlusCircle,
  FaCarAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Flex } from "@chakra-ui/react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import {
  FaCar,
  FaDatabase,
  FaEnvelope,
  FaGears,
  FaShop,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa6";
import { FaShopLock } from "react-icons/fa6";
import { User, X } from "lucide-react";
// import logo from "../../assets/logo.png";

const sideBarMenu = [
  {
    label: "DASHBOARD",
    route: "/",
    icon: <FaThLarge className={styles.icon} />,
    subMenu: null,
  },
  {
    label: "Vendors",
    route: "/vendors",
    icon: <FaShop className={styles.icon} />,
    subMenu: null,
  },
  {
    label: "Admins",
    route: "",
    icon: <FaUserShield className={styles.icon} />,
    subMenu: [
      {
        label: "Admins List",
        route: "/admins",
        icon: <FaUserShield className={styles.icon} />,
      },
      {
        label: "Create Admin",
        route: "/create-admin",
        icon: <FaUserPlus className={styles.icon} />,
      },
    ],
  },
  {
    label: "Car Listings",
    route: "/car-listings",
    icon: <FaCar className={styles.icon} />,
    subMenu: null,
  },
  {
    label: "Master Data",
    route: "/master-data",
    icon: <FaDatabase className={styles.icon} />,
    subMenu: [
      {
        label: "Car",
        route: "/car-data",
        icon: <FaCarAlt className={styles.icon} />,
      },
      {
        label: "Body Types",
        route: "/body-types",
        icon: <FaCarAlt className={styles.icon} />,
      },
      {
        label: "Regional Specs",
        route: "/regional-specs",
        icon: <FaCarAlt className={styles.icon} />,
      },
      {
        label: "Transmissions",
        route: "/transmissions",
        icon: <FaCarAlt className={styles.icon} />,
      },
      {
        label: "Fuel Types",
        route: "/fuel-types",
        icon: <FaCarAlt className={styles.icon} />,
      },
      {
        label: "Seating Capacities",
        route: "/seating-capacities",
        icon: <FaCarAlt className={styles.icon} />,
      },
      {
        label: "Doors",
        route: "/doors",
        icon: <FaCarAlt className={styles.icon} />,
      },
      {
        label: "Horse Powers",
        route: "/horse-powers",
        icon: <FaCarAlt className={styles.icon} />,
      },
      {
        label: "Tech Features",
        route: "/tech-features",
        icon: <FaCarAlt className={styles.icon} />,
      },
      {
        label: "Other Features",
        route: "/other-features",
        icon: <FaCarAlt className={styles.icon} />,
      },
    ],
  },
  {
    label: "Settings",
    route: "",
    icon: <FaGears className={styles.icon} />,
    subMenu: [
      {
        label: "Email Templates",
        route: "/email-templates",
        icon: <FaEnvelope className={styles.icon} />,
      },
    ],
  },
  // {
  //   label: "Listings",
  //   route: "",
  //   icon: <FaUserFriends className={styles.icon} />,
  //   subMenu: [
  //     {
  //       label: "My Listings",
  //       route: "/my-listings",
  //       icon: <FaPlusCircle className={styles.icon} />,
  //     },
  //     {
  //       label: "Create Listing",
  //       route: "/create-listing",
  //       icon: <FaPlusCircle className={styles.icon} />,
  //     },
  //   ],
  // },
  // {
  //   label: "REVIEWS",
  //   route: "/reviews",
  //   icon: <FaStar className={styles.icon} />,
  //   subMenu: null,
  // },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const currentPath = location.pathname;

  useEffect(() => {
    sideBarMenu.forEach((item, index) => {
      if (item.subMenu) {
        const hasMatch = item.subMenu.some((sub) =>
          currentPath.startsWith(sub.route)
        );
        if (hasMatch) {
          setOpenMenu(item.label); // keep this menu open
        }
      } else if (item.route === currentPath) {
        setOpenMenu(null); // no submenu, so close all
      }
    });
  }, []);

  const handleMenuClick = (item) => {
    if (item.subMenu) {
      // Accordion behavior: close others, toggle current
      setOpenMenu(openMenu === item.label ? null : item.label);
    } else if (item.route) {
      setOpenMenu(null); // close all submenus when navigating standalone route
      navigate(item.route);
      onClose(false);
    }
  };
  return (
    <>
      <Box
        className={styles.sidebar}
        display={{ base: "none", md: "block" }}
        pt="8px"
      >
        <div className={`py-[12px] border-b border-[#eeeaea]`}>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
        <nav
          className={`${styles.menu} 
          mt-[10px] max-h-[83vh] 
          overflow-y-auto 
          scrollbar
          scrollbar-thin 
          scrollbar-thumb-custom-light
          scrollbar-hover:scrollbar-thumb-custom
          scrollbar-track-gray-100`}
        >
          <ul>
            {sideBarMenu.map((item) => {
              const isActive =
                location.pathname === item.route ||
                (item.subMenu &&
                  item.subMenu.some((sub) => location.pathname === sub.route));

              return (
                <li key={item.label}>
                  {/* Parent Menu */}
                  <div
                    onClick={() => handleMenuClick(item)}
                    className={`${styles.menuHeader} ${
                      isActive ? styles.active : ""
                    }`}
                  >
                    <Flex justify="space-between" align="center">
                      <Flex align="center">
                        {item.icon}
                        <span>{item.label}</span>
                      </Flex>
                      {item.subMenu &&
                        (openMenu === item.label ? (
                          <FaChevronDown size={12} />
                        ) : (
                          <FaChevronRight size={12} />
                        ))}
                    </Flex>
                  </div>

                  {/* Submenu */}
                  {item.subMenu && (
                    <ul
                      className={`${styles.subMenu} ${
                        openMenu === item.label ? styles.open : ""
                      }`}
                    >
                      {item.subMenu.map((sub) => (
                        <li
                          key={sub.label}
                          onClick={() => navigate(sub.route)}
                          className={`${styles.subMenuItem} ${
                            location.pathname === sub.route ? styles.active : ""
                          }`}
                        >
                          <Flex alignItems="center" gap="5px" p="6px 25px">
                            {sub.icon}
                            {sub.label}
                          </Flex>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </Box>
      <Drawer.Root
        placement="start"
        open={isOpen}
        onOpenChange={(e) => onClose(e.open)}
        closeOnInteractOutside={false}
        zIndex={999}
      >
        <Portal pt="30px" zIndex={999}>
          <Drawer.Backdrop zIndex={999} />
          <Drawer.Positioner zIndex={999}>
            <Drawer.Content w="220px" zIndex={999}>
              <Drawer.Body p="0px" zIndex={999}>
                <aside className={styles.sidebar}>
                  <button
                    className="absolute right-[0px] bg-[linear-gradient(90deg,rgba(91,120,124,1)0%,rgba(137,180,188,1)35%)] rounded-full mr-[5px] mt-[5px]"
                    onClick={() => onClose(false)}
                  >
                    <X size="20px" color="#fff" />
                  </button>
                  <div className="py-[14px]">
                    <img src={logo} alt="logo" className={styles.logo} />
                  </div>
                  <nav className={styles.menu}>
                    <ul>
                      {sideBarMenu.map((item) => {
                        const isActive =
                          location.pathname === item.route ||
                          (item.subMenu &&
                            item.subMenu.some(
                              (sub) => location.pathname === sub.route
                            ));

                        return (
                          <li key={item.label}>
                            {/* Parent Menu */}
                            <div
                              onClick={() => handleMenuClick(item)}
                              className={`${styles.menuHeader} ${
                                isActive ? styles.active : ""
                              }`}
                            >
                              <Flex justify="space-between" align="center">
                                <Flex align="center">
                                  {item.icon}
                                  <span>{item.label}</span>
                                </Flex>
                                {item.subMenu &&
                                  (openMenu === item.label ? (
                                    <FaChevronDown size={12} />
                                  ) : (
                                    <FaChevronRight size={12} />
                                  ))}
                              </Flex>
                            </div>

                            {/* Submenu */}
                            {item.subMenu && (
                              <ul
                                className={`${styles.subMenu} ${
                                  openMenu === item.label ? styles.open : ""
                                }`}
                              >
                                {item.subMenu.map((sub) => (
                                  <li
                                    key={sub.label}
                                    onClick={() => {
                                      navigate(sub.route);
                                      onClose(false);
                                    }}
                                    className={`${styles.subMenuItem} ${
                                      location.pathname === sub.route
                                        ? styles.active
                                        : ""
                                    }`}
                                  >
                                    <Flex
                                      alignItems="center"
                                      gap="5px"
                                      p="6px 25px"
                                    >
                                      <FaPlusCircle />
                                      {sub.label}
                                    </Flex>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </aside>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};

export default Sidebar;
