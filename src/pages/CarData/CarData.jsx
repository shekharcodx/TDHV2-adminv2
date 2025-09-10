import { Box, Heading, Tabs } from "@chakra-ui/react";
import CarBrand from "./CarBrand";
import CarModel from "./CarModel";
import CarTrim from "./CarTrim";

const CarData = () => {
  return (
    <>
      <Box mb="10px" borderBottom="1px solid #fff5">
        <Heading fontSize="24px" fontWeight="600" mb="30px">
          Car Data
        </Heading>
        <Tabs.Root
          colorPalette="teal"
          variant="enclosed"
          fitted
          defaultValue={"brands"}
        >
          <Tabs.List>
            <Tabs.Trigger value="brands">Car Brands</Tabs.Trigger>
            <Tabs.Trigger value="models">Car Models</Tabs.Trigger>
            <Tabs.Trigger value="trims">Car Trims</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="brands">
            <CarBrand />
          </Tabs.Content>
          <Tabs.Content value="models">
            <CarModel />
          </Tabs.Content>
          <Tabs.Content value="trims">
            <CarTrim />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </>
  );
};

export default CarData;
