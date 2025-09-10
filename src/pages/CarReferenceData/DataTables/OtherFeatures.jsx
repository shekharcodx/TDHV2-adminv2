import styles from "./Table.module.css";
import {
  useGetOtherFeaturesQuery,
  useUpdateBrandActiveMutation,
} from "@/app/api/carMasterDataApi";
import { Button, Skeleton, Box } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import DataTableClient from "@/components/DataTableClientPagination";
// import CarBrandCreation from "./modals/CarBrandCreation";
import { useState } from "react";

const OtherFeatures = ({ tabValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: features, isFetching } = useGetOtherFeaturesQuery(undefined, {
    skip: tabValue !== "other-features",
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
    { key: "name", label: "Feature" },
    {
      key: "actions",
      label: "Actions",
      render: (feat) => (
        <Box
          cursor="pointer"
          onClick={() =>
            handleActiveStatusChange(feat._id, !feat.isActive ? true : false)
          }
        >
          <Button
            size="xs"
            bg="red"
            p="2px 8px"
            borderRadius="5px"
            color="#fff"
          >
            Delete
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
        Add Feature
      </Button>
      <DataTableClient
        columns={columns}
        data={features?.features || []}
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
        <Skeleton height="25px" width="36px" variant="shine" mx="auto" />
      </td>
    </tr>
  );
};

export default OtherFeatures;
