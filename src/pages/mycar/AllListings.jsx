import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { useGetVendorListingsQuery } from "@/app/api/carListingApi"; // adjust path
import styles from "./mylist.module.css";

function AllListings() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetVendorListingsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  const listings = data?.listings?.docs || [];

  return (
    <div className={styles.wrapper}>
      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Rent / Day</th>
              <th>Rent / Week</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id}>
                {/* Image */}
                <td>
                  <img
                    src={listing?.car?.images?.[0]?.url}
                    alt={listing?.car?.carBrand?.name}
                    className={styles.image}
                  />
                </td>

                {/* Brand */}
                <td>{listing?.car?.carBrand?.name}</td>

                {/* Model */}
                <td>{listing?.car?.carModel?.name}</td>

                {/* Rent / Day */}
                <td>{`AED ${listing?.rentPerDay}`}</td>

                {/* Rent / Week */}
                <td>{`AED ${listing?.rentPerWeek}`}</td>

                {/* Status */}
                <td>
                  <span
                    className={`${styles.status} ${
                      listing?.status === 1
                        ? styles.approved
                        : listing?.status === 0
                        ? styles.pending
                        : styles.hold
                    }`}
                  >
                    {listing?.status === 1
                      ? "Approved"
                      : listing?.status === 0
                      ? "Pending"
                      : "Hold"}
                  </span>
                </td>

                {/* Action */}
                <td>
                  <button
                    className={styles.editBtn}
                    onClick={() =>
                      navigate("/edit", { state: { car: listing } })
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span>
            Showing {listings.length} of {data?.listings?.totalDocs}
          </span>
          <Flex gap="5px">
            <button
              className={styles.pageBtn}
              disabled={!data?.listings?.hasPrevPage}
            >
              Prev
            </button>
            <button
              className={styles.pageBtn}
              disabled={!data?.listings?.hasNextPage}
            >
              Next
            </button>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default AllListings;
