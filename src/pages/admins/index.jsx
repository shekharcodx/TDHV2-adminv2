import { Box, Button, Menu, Portal, Span } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetAllAdminsQuery } from "@/app/api/adminApi";
import { useUpdateActiveStatusMutation } from "@/app/api/userApi";
import styles from "./Admins.module.css";
import { ACCOUNT_STATUS, ACCOUNT_STATUS_NUM } from "@/utils/constants";
import { MenuIcon } from "lucide-react";
import avatar from "@/assets/images/avatar.svg";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import FilterSelect from "@/components/FilterSelect";
import FilterInput from "@/components/FilterInput/input";
import FilterResetBtn from "@/components/FilterResetBtn";
import DataTable from "@/components/DataTable";
import { isActiveStatus } from "@/utils/helper";

const Admins = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedActiveStatus, setSelectedActiveStatus] = useState([]);
  const [searchString, setSearchString] = useState("");
  const {
    data: admins,
    isFetching,
    refetch,
  } = useGetAllAdminsQuery({
    page,
    isActive: selectedActiveStatus?.[0],
    search: searchString,
  });
  const [updateActiveStatus] = useUpdateActiveStatusMutation();

  useEffect(() => {
    refetch();
  }, [page, selectedActiveStatus]);

  const handleSearchInput = (string) => {
    setSelectedActiveStatus([]);
    setSearchString(string);
    refetch();
  };

  const handleActiveStatusChange = (adminId, isActive) => {
    if (
      !confirm(
        isActive
          ? "Do you want to activate the admin?"
          : "Do you want to deactivate the admin?"
      )
    ) {
      return;
    }
    toaster.promise(
      updateActiveStatus({ userId: adminId, isActive }).unwrap(),
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

  const columns = [
    {
      key: "profile",
      label: "Profile",
      render: (admin) => (
        <img
          src={admin?.profilePicture?.url || avatar}
          alt={admin.name}
          className={`${styles.avatar} mx-auto`}
        />
      ),
    },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "isActive",
      label: "Active",
      render: (admin) =>
        admin.isActive ? (
          <span className={styles.activeBadge}>Active</span>
        ) : (
          <span className={styles.inactiveBadge}>Deactivated</span>
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (admin) => (
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              mx="auto"
              display="block"
              variant="outline"
              color="#000"
              bgGradient="linear-gradient( 90deg, rgba(91, 120, 124, 1) 0%, rgba(137, 180, 188, 1) 35% );"
              size="sm"
            >
              <MenuIcon color="#fff" />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  onClick={() => navigate(`/admin-profile/${admin._id}`)}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  onClick={() => navigate(`/edit-admin-profile/${admin._id}`)}
                >
                  Edit
                </Menu.Item>

                {!admin.isActive && (
                  <Menu.Item
                    onClick={() => handleActiveStatusChange(admin._id, true)}
                  >
                    <Span
                      bg="green"
                      p="2px 8px"
                      borderRadius="12px"
                      color="#fff"
                    >
                      Activate
                    </Span>
                  </Menu.Item>
                )}
                {admin.isActive && (
                  <Menu.Item
                    onClick={() => handleActiveStatusChange(admin._id, false)}
                  >
                    <Span bg="red" p="2px 8px" borderRadius="12px" color="#fff">
                      Deactivate
                    </Span>
                  </Menu.Item>
                )}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Box mb="30px" borderBottom="1px solid #fff5">
        <p>Filters:</p>
        <Box
          display={{ base: "block", md: "flex" }}
          justifyContent={{ base: "center", md: "start" }}
          alignItems="end"
          gap={{ md: "20px" }}
          my="20px"
        >
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
            setSelectTwo={setSelectedActiveStatus}
            setSearch={setSearchString}
          />
        </Box>
      </Box>

      <DataTable
        columns={columns}
        data={admins?.data?.docs || []}
        pagination={true}
        paginationData={admins?.data}
        page={page}
        setPage={setPage}
        isFetching={isFetching}
        skeleton={<SkeletonRow />}
        getRowClass={(_, i) =>
          i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
        }
      />
    </div>
  );
};

const SkeletonRow = () => {
  return (
    <tr className={`${styles.tableRowEven} py-[10px]`}>
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
        <Skeleton height="15px" width="36px" variant="shine" mx="auto" />
      </td>
      <td className={`${styles.tableCell}`}>
        <Skeleton height="25px" width="36px" variant="shine" mx="auto" />
      </td>
    </tr>
  );
};

export default Admins;
