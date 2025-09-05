import { useEffect } from "react";
import styles from "./VendorProfile.module.css";
import DocumentCard from "./DocumentCard";
import { Box, Breadcrumb, Button, Flex } from "@chakra-ui/react";
import profilePicPlaceholder from "@/assets/images/avatar.svg";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import DocumentCardSkeleton from "./DocumentCardSkeleton ";
import { useParams, useNavigate } from "react-router-dom";
import { useLazyGetUserQuery } from "@/app/api/userApi";

const VendorProfile = () => {
  const navigate = useNavigate();
  const { id: vendorId } = useParams();
  const [
    fetchVendorProfile,
    { data: vendorProfile, isFetching: vendorFetching },
  ] = useLazyGetUserQuery();

  useEffect(() => {
    console.log("VendorProfile:params", vendorId);

    if (vendorId) {
      fetchVendorProfile(vendorId);
    }
  }, [vendorId, location.search]);

  return (
    <>
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link
              cursor="pointer"
              onClick={() => navigate("/vendors")}
            >
              Vendors
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Vendor Profile</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <div className={`${styles.page} mt-[30px]`}>
        <div
          className={`${styles.card} ${styles.viewMode} max-w-[750px] md:min-w-[750px]`}
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={`relative group overflow-hidden ${styles.avatar}`}>
              {vendorFetching ? (
                <SkeletonCircle height="100%" width="100%" variant="shine" />
              ) : (
                <img
                  src={
                    vendorProfile?.data?.profilePicture
                      ? `${
                          vendorProfile.data.profilePicture?.url
                        }?t=${Date.now()}`
                      : profilePicPlaceholder
                  }
                  alt="Profile"
                  className={`h-full w-full ${styles.avatarPhoto}`}
                />
              )}
            </div>

            <div className={`styles.headerText`}>
              <>
                {vendorFetching ? (
                  <Skeleton variant="shine" width="200px" height="15px" />
                ) : (
                  <h2 className={styles.name}>{vendorProfile?.data?.name}</h2>
                )}
                {vendorFetching ? (
                  <Skeleton
                    variant="shine"
                    width="200px"
                    height="15px"
                    mt="10px"
                  />
                ) : (
                  <p className={styles.infoItem}>
                    {vendorProfile?.data?.email}
                  </p>
                )}
              </>
            </div>
          </div>

          {/* Basic Information */}
          <div className={styles.section}>
            <h3>Basic Information</h3>
            <Box
              display={{ base: "block", md: "flex" }}
              className={`${styles.infoRow}`}
            >
              <Box marginBottom={{ base: "20px" }} className={styles.infoItem}>
                <strong>Business Name</strong>
                {vendorFetching ? (
                  <Skeleton
                    variant="shine"
                    width="200px"
                    height="15px"
                    mt="10px"
                  />
                ) : (
                  vendorProfile?.data?.businessName
                )}
              </Box>

              <Box marginBottom={{ base: "20px" }} className={styles.infoItem}>
                <strong>Fleet Size</strong>
                {vendorFetching ? (
                  <Skeleton
                    variant="shine"
                    width="200px"
                    height="15px"
                    mt="10px"
                  />
                ) : (
                  vendorProfile?.data?.vendorInformation?.fleetSize
                )}
              </Box>

              <Box marginBottom={{ base: "20px" }} className={styles.infoItem}>
                <strong>Mobile Number</strong>
                {vendorFetching ? (
                  <Skeleton
                    variant="shine"
                    width="200px"
                    height="15px"
                    mt="10px"
                  />
                ) : (
                  vendorProfile?.data?.contact?.mobileNum
                )}
              </Box>

              <Box marginBottom={{ base: "20px" }} className={styles.infoItem}>
                <strong>WhatsApp</strong>
                {vendorFetching ? (
                  <Skeleton
                    variant="shine"
                    width="200px"
                    height="15px"
                    mt="10px"
                  />
                ) : (
                  vendorProfile?.data?.contact?.whatsappNum
                )}
              </Box>

              <Box marginBottom={{ base: "20px" }} className={styles.infoItem}>
                <strong>Landline</strong>
                {vendorFetching ? (
                  <Skeleton
                    variant="shine"
                    width="200px"
                    height="15px"
                    mt="10px"
                  />
                ) : (
                  vendorProfile?.data?.contact?.landlineNum
                )}
              </Box>
            </Box>
          </div>

          {/* Address */}
          <div className={styles.section}>
            <h3>Address</h3>
            <Box
              display={{ base: "block", md: "flex" }}
              className={styles.infoRow}
            >
              {Object.entries(vendorProfile?.data?.address ?? {}).map(
                ([field, value]) => {
                  if (["mapUrl", "street"].includes(field)) {
                    return (
                      <Box
                        marginBottom={{ base: "20px" }}
                        className={styles.infoItem}
                        key={field}
                      >
                        <strong>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </strong>
                        {field === "mapUrl" ? (
                          <a
                            href={`https://${value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Map
                          </a>
                        ) : vendorFetching ? (
                          <Skeleton
                            variant="shine"
                            width="200px"
                            height="15px"
                            mt="10px"
                          />
                        ) : (
                          value
                        )}
                      </Box>
                    );
                  }
                  return null;
                }
              )}
            </Box>
          </div>

          {/* Documents */}
          <div className={styles.section}>
            <h3>Vendor Documents</h3>
            <Flex
              className={`${styles.infoRow}`}
              justify={{ base: "center", md: "space-between" }}
              flexWrap="wrap"
              gap="20px"
              mt="30px"
            >
              {vendorFetching
                ? Array.from({ length: 6 }).map((_, i) => (
                    <DocumentCardSkeleton key={i} />
                  ))
                : Object.entries(
                    vendorProfile?.data?.vendorInformation?.documents ?? {}
                  ).map(([key, value], index) => (
                    <DocumentCard key={index} doc={{ key, value }} />
                  ))}
            </Flex>
          </div>

          <Flex
            justifyContent={{ base: "center", md: "space-between" }}
            gap="20px"
            mt="20px"
          >
            <div
              className={`${styles.backBtn} cursor-pointer text-center sm:!w-full md:!w-auto`}
              onClick={() => navigate(-1)}
            >
              Back
            </div>
            <div
              className={`${styles.editBtn} ${styles.editModeBtn} cursor-pointer text-center sm:!w-full md:!w-auto`}
              onClick={() => navigate(`/vendors/edit/${vendorId}`)}
            >
              Edit Profile
            </div>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default VendorProfile;
