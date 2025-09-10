import styles from "./Table.module.css";
import {
  useGetDoorsQuery,
  useUpdateBrandActiveMutation,
} from "@/app/api/carMasterDataApi";
import { Button, Skeleton, Box } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import DataTableClient from "@/components/DataTableClientPagination";
// import CarBrandCreation from "./modals/CarBrandCreation";
import { useState } from "react";

const Doors = ({ tabValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: doors, isFetching } = useGetDoorsQuery(true, {
    skip: tabValue !== "doors",
  });
  const [updateActive] = useUpdateBrandActiveMutation();

  const handleActiveStatusChange = (brandId, isActive) => {
    if (
      !confirm(
        isActive
          ? "Do you want to activate the brand?"
          : "Do you want to deactivate the brand?"
      )
    ) {
      return;
    }
    toaster.promise(updateActive(brandId).unwrap(), {
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
    });
  };

  const columns = [
    { key: "doors", label: "Doors" },
    {
      key: "isActive",
      label: "Active",
      render: (door) =>
        door.isActive ? (
          <span className={styles.activeBadge}>Active</span>
        ) : (
          <span className={styles.inactiveBadge}>Deactivated</span>
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (door) => (
        <Box
          cursor="pointer"
          onClick={() =>
            handleActiveStatusChange(door._id, !door.isActive ? true : false)
          }
        >
          <Button
            size="xs"
            bg={!door.isActive ? "green" : "red"}
            p="2px 8px"
            borderRadius="5px"
            color="#fff"
          >
            {!door.isActive ? "Activate" : "Deactivate"}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box mt="20px" borderBottom="1px solid #fff5">
      <Button
        bg="var(--gradient-background)"
        mb="20px"
        ml="auto"
        display="block"
        onClick={() => setIsOpen(true)}
      >
        Add Doors
      </Button>
      <DataTableClient
        columns={columns}
        data={doors?.doors || []}
        isFetching={isFetching}
        skeleton={<SkeletonRow />}
        getRowClass={(_, i) =>
          i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
        }
      />
      {/* <CarBrandCreation isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </Box>
  );
};

const SkeletonRow = () => {
  return (
    <tr className={styles.tableRowEven}>
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

export default Doors;
