import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Menu,
  Portal,
  Skeleton,
  SkeletonCircle,
  Span,
} from "@chakra-ui/react";
import { useGetListingsQuery } from "@/app/api/carListingApi";
import { listingStatuses, isActiveStatus, getKeyNames } from "@/utils/helper";
import FilterSelect from "@/components/FilterSelect";
import FilterResetBtn from "@/components/FilterResetBtn";
import FilterInput from "@/components/FilterInput/input";
import styles from "./Listing.module.css";
import DataTable from "@/components/DataTable";
import { LISTING_STATUS, LISTING_STATUS_NUM } from "@/utils/constants";
import placeholderImg from "@/assets/images/placeholder_image.jpg";
import { MenuIcon } from "lucide-react";
import { LuChevronRight } from "react-icons/lu";

const Listings = () => {
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedActiveStatus, setSelectedActiveStatus] = useState([]);
  const [searchString, setSearchString] = useState("");

  const {
    data: listings,
    isFetching,
    refetch,
  } = useGetListingsQuery({
    page,
    status: selectedStatus?.[0],
    isActive: selectedActiveStatus?.[0],
    search: searchString,
  });

  const handleSearchInput = (string) => {
    setSelectedActiveStatus([]);
    setSelectedStatus([]);
    setSearchString(string);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [page, selectedActiveStatus, selectedStatus]);

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (listing) => (
        <img
          src={listing?.car?.images?.[0]?.url || placeholderImg}
          alt={
            listing?.car?.carBrand?.name + " " + listing?.car?.carModel?.name
          }
          className={`${styles.avatar} mx-auto`}
        />
      ),
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "rentPerDay",
      label: "Rent/Day",
    },
    { key: "rentPerWeek", label: "Rent/Week" },
    { key: "rentPerMonth", label: "Rent/Month" },
    {
      key: "status",
      label: "Status",
      render: (listing) => (
        <span
          className={`${styles.status} ${
            listing.status === 2
              ? styles.statusGreen
              : listing.status === 1
              ? styles.statusYellow
              : styles.statusOrange
          }`}
        >
          {LISTING_STATUS_NUM[listing.status]}
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Active",
      render: (listing) =>
        listing.isActive ? (
          <span className={styles.activeBadge}>Active</span>
        ) : (
          <span className={styles.inactiveBadge}>Deactivated</span>
        ),
    },
    {
      key: "action",
      label: "Action",
      render: (listing) => (
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
                  value="view"
                  cursor="pointer"
                  onClick={() => navigate(`#`)}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  value="edit"
                  cursor="pointer"
                  onClick={() => navigate(`#`)}
                >
                  Edit
                </Menu.Item>

                {!listing.isActive && (
                  <Menu.Item
                    value="activate"
                    cursor="pointer"
                    onClick={() => console.log("index:Active")}
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
                {listing.isActive && (
                  <Menu.Item
                    value="deactivate"
                    cursor="pointer"
                    onClick={() => console.log("index:Deactive")}
                  >
                    <Span bg="red" p="2px 8px" borderRadius="12px" color="#fff">
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
                        {listing.status !== LISTING_STATUS.APPROVED && (
                          <Menu.Item
                            value="approved"
                            cursor="pointer"
                            onClick={() => console.log("index:Approved")}
                          >
                            Approved
                          </Menu.Item>
                        )}
                        {listing.status !== LISTING_STATUS.ON_HOLD && (
                          <Menu.Item
                            value="onHold"
                            cursor="pointer"
                            onClick={() => console.log("index:OnHold")}
                          >
                            On Hold
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
    <Box p="1rem">
      <Heading fontSize="24px" fontWeight="600" mb="30px">
        Car Listings
      </Heading>
      <Box
        display={{ base: "block", md: "flex" }}
        justifyContent={{ base: "center", md: "start" }}
        alignItems="end"
        gap={{ md: "20px" }}
        my="20px"
      >
        <FilterSelect
          title="Listing Status"
          placeholder="Select listing status"
          collection={listingStatuses}
          value={selectedStatus}
          setValue={setSelectedStatus}
          helper={getKeyNames}
        />

        <FilterSelect
          title="Listing Active Status"
          placeholder="Select listing active status"
          collection={isActiveStatus}
          value={selectedActiveStatus}
          setValue={setSelectedActiveStatus}
        />

        <FilterInput
          label="Search Listing"
          placeholder="Search listing"
          value={searchString}
          setValue={handleSearchInput}
        />

        <FilterResetBtn
          setSelectOne={setSelectedStatus}
          setSelectTwo={setSelectedActiveStatus}
          setSearch={setSearchString}
        />
      </Box>

      <DataTable
        columns={columns}
        data={listings?.listings?.docs || []}
        isFetching={isFetching}
        pagination={true}
        paginationData={listings?.listings}
        page={page}
        setPage={setPage}
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
    <tr className={`${styles.tableRowEven} py-[10px]`}>
      <td className={`${styles.tableCell}`} colSpan={8}>
        <Skeleton height="25px" width="100%" variant="shine" />
      </td>
    </tr>
  );
};

export default Listings;
