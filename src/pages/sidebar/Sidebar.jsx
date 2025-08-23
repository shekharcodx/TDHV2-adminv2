import { Box, Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { FaThLarge, FaUserFriends, FaStar, FaPlusCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Flex } from "@chakra-ui/react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const sideBarMenu = [
  {
    label: "DASHBOARD",
    route: "/",
    icon: <FaThLarge className={styles.icon} />,
    subMenu: null,
  },
  {
    label: "VENDOR PROFILE",
    route: "/profile",
    icon: <FaUserFriends className={styles.icon} />,
    subMenu: null,
  },
  {
    label: "Listings",
    route: "",
    icon: <FaUserFriends className={styles.icon} />,
    subMenu: [
      { label: "My Listings", route: "/my-listings" },
      { label: "Create Listing", route: "/create-listing" },
    ],
  },
  {
    label: "REVIEWS",
    route: "/reviews",
    icon: <FaStar className={styles.icon} />,
    subMenu: null,
  },
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
        pt="80px"
      >
        <nav className={styles.menu}>
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
      </Box>
      <Drawer.Root
        mt="64px"
        placement="start"
        open={isOpen}
        onOpenChange={(e) => onClose(e.open)}
        closeOnInteractOutside={false}
        zIndex={1}
      >
        <Portal mt="64px" pt="30px" zIndex={1}>
          <Drawer.Backdrop mt="64px" zIndex={1} />
          <Drawer.Positioner mt="64px" zIndex={1}>
            <Drawer.Content w="220px" zIndex={1}>
              <Drawer.Body zIndex={1}>
                <aside className={styles.sidebar}>
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
