import styles from "./VendorTable.module.css";
import {
  useGetAllCarModelsQuery,
  useUpdateModelActiveMutation,
} from "@/app/api/carMasterDataApi";
import { Button, Skeleton, Box } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import DataTableClient from "@/components/DataTableClientPagination";

const CarModel = () => {
  const { data: carModels, isFetching } = useGetAllCarModelsQuery();
  const [updateActive] = useUpdateModelActiveMutation();

  const handleActiveStatusChange = (modelId, isActive) => {
    if (
      !confirm(
        isActive
          ? "Do you want to activate the model?"
          : "Do you want to deactivate the model?"
      )
    ) {
      return;
    }
    toaster.promise(updateActive(modelId).unwrap(), {
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
    { key: "name", label: "Name" },
    {
      key: "brand",
      label: "Brand Name",
      render: (model) => <span>{model.carBrand?.name || "NA"}</span>,
    },
    {
      key: "isActive",
      label: "Active",
      render: (model) =>
        model.isActive ? (
          <span className={styles.activeBadge}>Active</span>
        ) : (
          <span className={styles.inactiveBadge}>Deactivated</span>
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (model) => (
        <Box
          cursor="pointer"
          onClick={() =>
            handleActiveStatusChange(model._id, !model.isActive ? true : false)
          }
        >
          <Button
            size="xs"
            bg={!model.isActive ? "green" : "red"}
            p="2px 8px"
            borderRadius="5px"
            color="#fff"
          >
            {!model.isActive ? "Activate" : "Deactivate"}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box mt="20px" borderBottom="1px solid #fff5">
      <DataTableClient
        columns={columns}
        data={carModels?.models || []}
        isFetching={isFetching}
        skeleton={<SkeletonRow />}
        getRowClass={(_, i) =>
          i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
        }
      />
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
        <Skeleton height="25px" width="100%" variant="shine" />
      </td>
      <td className={`${styles.tableCell}`}>
        <Skeleton height="25px" width="36px" variant="shine" mx="auto" />
      </td>
    </tr>
  );
};

export default CarModel;
