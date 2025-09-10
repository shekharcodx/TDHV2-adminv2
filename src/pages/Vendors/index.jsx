import { Box, Button, Heading, Menu, Portal, Span } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetAllVendorsQuery } from "@/app/api/vendorApi";
import {
  useUpdateActiveStatusMutation,
  useUpdateAccountStatusMutation,
} from "@/app/api/userApi";
import styles from "./VendorTable.module.css";
import { ACCOUNT_STATUS, ACCOUNT_STATUS_NUM } from "@/utils/constants";
import { LuChevronRight } from "react-icons/lu";
import { MenuIcon } from "lucide-react";
import avatar from "@/assets/images/avatar.svg";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import FilterSelect from "@/components/FilterSelect";
import FilterInput from "@/components/FilterInput/input";
import FilterResetBtn from "@/components/FilterResetBtn";
import DataTable from "@/components/DataTable";
import {
  getKeyNames,
  getConfirmMsg,
  statuses,
  isActiveStatus,
} from "@/utils/helper";

const AllVendors = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedActiveStatus, setSelectedActiveStatus] = useState([]);
  const [searchString, setSearchString] = useState("");
  const {
    data: vendors,
    isFetching,
    refetch,
  } = useGetAllVendorsQuery({
    page,
    status: selectedStatus?.[0],
    isActive: selectedActiveStatus?.[0],
    search: searchString,
  });
  const [updateActiveStatus] = useUpdateActiveStatusMutation();
  const [updateVendorAccountStatus] = useUpdateAccountStatusMutation();

  useEffect(() => {
    refetch();
  }, [page, selectedStatus, selectedActiveStatus]);

  const handleSearchInput = (string) => {
    setSelectedStatus([]);
    setSelectedActiveStatus([]);
    setSearchString(string);
    refetch();
  };

  const handleActiveStatusChange = (vendorId, isActive) => {
    if (
      !confirm(
        isActive
          ? "Do you want to activate the vendor?"
          : "Do you want to deactivate the vendor?"
      )
    ) {
      return;
    }
    toaster.promise(
      updateActiveStatus({ userId: vendorId, isActive }).unwrap(),
      {
        loading: { title: "Updating", description: "Please wait..." },
        success: (res) => {
          return {
            title: res?.message || "IsActive status updated successfully",
            description: "",
          };
        },
        error: (err) => {
          return {
            title: err?.data?.message || "Error updating isActive status",
            description: "Please try again",
          };
        },
      }
    );
  };

  const handleAccountStatusChange = (id, status) => {
    if (!confirm(getConfirmMsg(status))) {
      return;
    }
    toaster.promise(updateVendorAccountStatus({ id, status }).unwrap(), {
      loading: { title: "Updating", description: "Please wait..." },
      success: (res) => {
        return {
          title: res?.message || "Account status updated successfully",
          description: "",
        };
      },
      error: (err) => {
        return {
          title: err?.data?.message || "Error updating account status",
          description: "Please try again",
        };
      },
    });
  };

  const columns = [
    {
      key: "profile",
      label: "Profile",
      render: (vendor) => (
        <img
          src={vendor?.profilePicture?.url || avatar}
          alt={vendor.name}
          className={`${styles.avatar} mx-auto`}
        />
      ),
    },
    { key: "businessName", label: "Business Name" },
    { key: "email", label: "Email" },
    {
      key: "status",
      label: "Status",
      render: (vendor) => (
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
      ),
    },
    {
      key: "isActive",
      label: "Active",
      render: (vendor) =>
        vendor.isActive ? (
          <span className={styles.activeBadge}>Active</span>
        ) : (
          <span className={styles.inactiveBadge}>Deactivated</span>
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (vendor) => (
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              mx="auto"
              display="block"
              variant="outline"
              color="#000"
              outline="none"
              border="none"
              // bgGradient="linear-gradient( 90deg, rgba(91, 120, 124, 1) 0%, rgba(137, 180, 188, 1) 35% );"
              size="sm"
            >
              <MenuIcon color="rgba(91, 120, 124, 1)" />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  value="view"
                  cursor="pointer"
                  onClick={() => navigate(`/vendors/view/${vendor._id}`)}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  value="edit"
                  cursor="pointer"
                  onClick={() => navigate(`/vendors/edit/${vendor._id}`)}
                >
                  Edit
                </Menu.Item>

                {!vendor.isActive && (
                  <Menu.Item
                    value="activate"
                    cursor="pointer"
                    onClick={() => handleActiveStatusChange(vendor._id, true)}
                  >
                    <Span borderRadius="12px" color="green">
                      Activate
                    </Span>
                  </Menu.Item>
                )}
                {vendor.isActive && (
                  <Menu.Item
                    value="deactivate"
                    cursor="pointer"
                    onClick={() => handleActiveStatusChange(vendor._id, false)}
                  >
                    <Span borderRadius="12px" color="red">
                      Deactivate
                    </Span>
                  </Menu.Item>
                )}

                <Menu.Root
                  positioning={{ placement: "right-start", gutter: 2 }}
                >
                  <Menu.TriggerItem cursor="pointer">
                    Change Status <LuChevronRight />
                  </Menu.TriggerItem>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        {vendor.status !== ACCOUNT_STATUS.APPROVED && (
                          <Menu.Item
                            value="approved"
                            cursor="pointer"
                            onClick={() =>
                              handleAccountStatusChange(
                                vendor._id,
                                ACCOUNT_STATUS.APPROVED
                              )
                            }
                          >
                            Approved
                          </Menu.Item>
                        )}
                        {vendor.status !== ACCOUNT_STATUS.ON_HOLD && (
                          <Menu.Item
                            value="onHold"
                            cursor="pointer"
                            onClick={() =>
                              handleAccountStatusChange(
                                vendor._id,
                                ACCOUNT_STATUS.ON_HOLD
                              )
                            }
                          >
                            On Hold
                          </Menu.Item>
                        )}
                        {vendor.status !== ACCOUNT_STATUS.BLOCKED && (
                          <Menu.Item
                            value="blocked"
                            cursor="pointer"
                            onClick={() =>
                              handleAccountStatusChange(
                                vendor._id,
                                ACCOUNT_STATUS.BLOCKED
                              )
                            }
                          >
                            Blocked
                          </Menu.Item>
                        )}
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ),
    },
  ];

  return (
    <>
      <Box mb="10px" borderBottom="1px solid #fff5">
        <Heading fontSize="24px" fontWeight="600" mb="30px">
          VENDORS
        </Heading>
        <Box
          display={{ base: "block", md: "flex" }}
          justifyContent={{ base: "center", md: "start" }}
          alignItems="end"
          gap={{ md: "20px" }}
          my="20px"
        >
          <FilterSelect
            title="Account Status"
            placeholder="Select account status"
            collection={statuses}
            value={selectedStatus}
            setValue={setSelectedStatus}
            helper={getKeyNames}
          />

          <FilterSelect
            title="Account Active Status"
            placeholder="Select account status"
            collection={isActiveStatus}
            value={selectedActiveStatus}
            setValue={setSelectedActiveStatus}
          />

          <FilterInput
            label="Search Vendor"
            placeholder="Search vendor"
            value={searchString}
            setValue={handleSearchInput}
          />

          <FilterResetBtn
            setSelectOne={setSelectedStatus}
            setSelectTwo={setSelectedActiveStatus}
            setSearch={setSearchString}
          />
        </Box>
      </Box>

      <DataTable
        columns={columns}
        data={vendors?.vendors?.docs || []}
        pagination={true}
        paginationData={vendors?.vendors}
        page={page}
        setPage={setPage}
        isFetching={isFetching}
        skeleton={<SkeletonRow />}
        getRowClass={(_, i) =>
          i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
        }
      />
    </>
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
