import { useEffect, useState } from "react";
import { useGetAllVendorsQuery } from "../../../app/api/vendorApi";
import styles from "./VendorTable.module.css";
import { ACCOUNT_STATUS, ACCOUNT_STATUS_NUM } from "@/utils/constants";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  Pagination,
  Portal,
  Select,
  Span,
  Stack,
  createListCollection,
} from "@chakra-ui/react";
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { MenuIcon } from "lucide-react";
import avatar from "@/assets/images/avatar.svg";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";

const getKeyNames = (key) => {
  switch (key) {
    case "PENDING":
      return "Pending";
      break;
    case "APPROVED":
      return "Approved";
      break;
    case "ON_HOLD":
      return "On Hold";
      break;
    case "BLOCKED":
      return "Blocked";
      break;
  }
};

const statuses = createListCollection({
  items: [
    ...Object.entries(ACCOUNT_STATUS).map(([label, value]) => ({
      label,
      value: String(value),
    })),
  ],
});

const isActiveStatus = createListCollection({
  items: [
    { label: "Active", value: "true" },
    { label: "Inactive", value: "false" },
  ],
});

const AllVendors = () => {
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedActiveStatus, setSelectedActiveStatus] = useState([]);
  const {
    data: vendors,
    isFetching,
    refetch,
  } = useGetAllVendorsQuery({
    page,
    status: selectedStatus?.[0],
    isActive: selectedActiveStatus?.[0],
  });

  useEffect(() => {
    refetch();
  }, [page, selectedStatus, selectedActiveStatus]);

  return (
    <div className={styles.wrapper}>
      <Box mb="30px" borderBottom="1px solid #fff5">
        <p>Filters:</p>
        <Box
          display={{ base: "block", md: "flex" }}
          justifyContent={{ md: "start" }}
          alignItems="end"
          gap={{ md: "20px" }}
          my="20px"
        >
          <Stack gap="5" width="220px">
            <Select.Root
              variant="subtle"
              size="xs"
              collection={statuses}
              value={selectedStatus}
              onValueChange={(e) => setSelectedStatus(e.value)}
            >
              <Select.HiddenSelect />
              <Select.Label>Account Status</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select account status" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {statuses.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        {getKeyNames(item.label)}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Stack>

          <Stack gap="5" width="220px">
            <Select.Root
              variant="subtle"
              size="xs"
              collection={isActiveStatus}
              value={selectedActiveStatus}
              onValueChange={(e) => setSelectedActiveStatus(e.value)}
            >
              <Select.HiddenSelect />
              <Select.Label>Account Active Status</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select account status" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {isActiveStatus.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Stack>

          <Button
            size="xs"
            bgGradient="linear-gradient(
              90deg,
              rgba(91, 120, 124, 1) 0%,
              rgba(137, 180, 188, 1) 35%
            );"
            onClick={() => {
              setSelectedStatus([]);
              setSelectedActiveStatus([]);
            }}
          >
            Reset Filters
          </Button>
        </Box>
      </Box>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHead}>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <SkeletonRow />
            ) : vendors?.vendors?.docs?.length > 0 ? (
              vendors?.vendors?.docs?.map((vendor, index) => (
                <tr
                  key={vendor._id}
                  className={
                    index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                  }
                >
                  <td className={`${styles.tableCell} flex justify-center`}>
                    <img
                      src={vendor?.profilePicture?.url || avatar}
                      alt={vendor.name}
                      className={styles.avatar}
                    />
                  </td>
                  <td className={`${styles.tableCell} ${styles.cellName}`}>
                    {vendor.name}
                  </td>
                  <td className={`${styles.tableCell} ${styles.cellEmail}`}>
                    {vendor.email}
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.status} ${
                        vendor.status === 2
                          ? styles.statusGreen
                          : vendor.status === 1
                          ? styles.statusYellow
                          : styles.statusOrange
                      }`}
                    >
                      {ACCOUNT_STATUS_NUM[vendor.status]}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    {vendor.isActive ? (
                      <span className={styles.activeBadge}>Active</span>
                    ) : (
                      <span className={styles.inactiveBadge}>Inactive</span>
                    )}
                  </td>
                  <td className={styles.actions}>
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Button
                          mx="auto"
                          display="block"
                          variant="outline"
                          color="#000"
                          bgGradient="linear-gradient(
                          90deg,
                          rgba(91, 120, 124, 1) 0%,
                          rgba(137, 180, 188, 1) 35%
                        );"
                          size="sm"
                        >
                          <MenuIcon />
                        </Button>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            <Menu.Item cursor="pointer" value="view">
                              View
                            </Menu.Item>
                            <Menu.Item cursor="pointer" value="edit">
                              Edit
                            </Menu.Item>
                            {!vendor.isActive && (
                              <Menu.Item value="activate">
                                <Span
                                  bg="green"
                                  p="2px 8px"
                                  borderRadius="12px"
                                  className="bg-red"
                                  color="#fff"
                                  cursor="pointer"
                                >
                                  Activate
                                </Span>
                              </Menu.Item>
                            )}
                            {vendor.isActive && (
                              <Menu.Item value="deactivate">
                                <Span
                                  bg="red"
                                  p="2px 8px"
                                  borderRadius="12px"
                                  className="bg-red"
                                  color="#fff"
                                  cursor="pointer"
                                >
                                  Deactivate
                                </Span>
                              </Menu.Item>
                            )}
                            <Menu.Root
                              positioning={{
                                placement: "right-start",
                                gutter: 2,
                              }}
                            >
                              <Menu.TriggerItem>
                                Change Status <LuChevronRight />
                              </Menu.TriggerItem>
                              <Portal>
                                <Menu.Positioner>
                                  <Menu.Content>
                                    <Menu.Item
                                      cursor="pointer"
                                      value={ACCOUNT_STATUS.APPROVED}
                                    >
                                      Approved
                                    </Menu.Item>
                                    <Menu.Item
                                      cursor="pointer"
                                      value={ACCOUNT_STATUS.ON_HOLD}
                                    >
                                      On Hold
                                    </Menu.Item>
                                    <Menu.Item
                                      cursor="pointer"
                                      value={ACCOUNT_STATUS.BLOCKED}
                                    >
                                      Blocked
                                    </Menu.Item>
                                  </Menu.Content>
                                </Menu.Positioner>
                              </Portal>
                            </Menu.Root>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-[10px]" colSpan={6}>
                  No vendor found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination.Root
        count={vendors?.vendors?.totalPages}
        pageSize={2}
        defaultPage={1}
        page={page}
        onPageChange={(e) => setPage(e.page)}
      >
        <ButtonGroup
          gap="4"
          size="sm"
          variant="ghost"
          display="flex"
          justifyContent="end"
          my="20px"
        >
          {/* <p>{vendors?.vendors?.totalDocs} Results Total</p> */}
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.PageText />
          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </div>
  );
};

const SkeletonRow = () => {
  return (
    <tr className={styles.tableRowEven}>
      <td className={`${styles.tableCell}`}>
        <SkeletonCircle
          mx="auto"
          height="2.5rem"
          width="2.5rem"
          variant="shine"
        />
      </td>
      <td className={`${styles.tableCell}`}>
        <Skeleton height="25px" width="100%" variant="shine" />
      </td>
      <td className={`${styles.tableCell}`}>
        <Skeleton height="25px" width="100%" variant="shine" />
      </td>
      <td className={`${styles.tableCell}`}>
        <Skeleton height="25px" width="100%" variant="shine" />
      </td>
      <td className={`${styles.tableCell}`}>
        <Skeleton height="25px" width="100%" variant="shine" />
      </td>
      <td className={`${styles.tableCell}`}>
        <Skeleton height="25px" width="36px" variant="shine" mx="auto" />
      </td>
    </tr>
  );
};

export default AllVendors;
